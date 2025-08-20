"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormImageUploader } from "@/components/ui/form/image-uploader";
import { FormInput } from "@/components/ui/form/input";
import { FormTextarea } from "@/components/ui/form/textarea";
import { useCreateProject, useUpdateProject } from "@/hooks/api/useProjects";
import { ActionResponseError } from "@/lib/server/actions";
import { ActionGetProjectById } from "@/lib/server/actions/projects/read";
import { projectCreateValidator } from "@/lib/validators/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { IterationCcwIcon, LoaderIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ProjectResponse = Exclude<
  Awaited<ReturnType<typeof ActionGetProjectById>>,
  ActionResponseError
>["data"];

interface ProjectFormProps {
  project?: ProjectResponse;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const { push } = useRouter();

  const { mutate: createProject, isPending: isPendingCreate } =
    useCreateProject();
  const { mutate: updateProject, isPending: isPendingUpdate } =
    useUpdateProject();

  const form = useForm<z.infer<typeof projectCreateValidator>>({
    resolver: zodResolver(projectCreateValidator),
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      downloadLink: project?.download_link ?? null,
      previewLink: project?.preview_link ?? null,
      sourceLink: project?.source_link ?? null,
      image: null,
    },
  });

  const formRef = useRef(form);

  const isUpdate = !!project;
  const isPending = isPendingCreate || isPendingUpdate;

  async function onSubmit(data: z.infer<typeof projectCreateValidator>) {
    if (isUpdate) {
      updateProject(
        { id: project.id, values: data },
        {
          onSuccess: () => {
            toast.success("Project updated successfully!");
            push("/admin/projects");
          },
        },
      );
      return;
    }

    createProject(data, {
      onSuccess: () => {
        toast.success("Project created successfully!");
        push("/admin/projects");
      },
    });
  }

  useEffect(() => {
    async function fetchImage() {
      if (!project?.image_url) return;

      const response = await fetch(project.image_url);

      if (!response.ok) {
        toast.error("Failed to fetch project image.");
        return;
      }

      const blob = await response.blob();
      const file = new File([blob], "project-image", {
        type: blob.type,
      });

      formRef.current.setValue("image", file);
    }
    fetchImage();
  }, [project?.image_url]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <section className="grid grid-cols-1 items-start gap-x-8 gap-y-4 md:grid-cols-2">
          <FormInput
            control={form.control}
            name="title"
            label="Project Title"
            placeholder="Enter project title"
            containerClassName="md:col-span-2"
            required
          />
          <FormInput
            control={form.control}
            name="downloadLink"
            label="Download Link"
            placeholder="Enter download link"
            type="url"
          />
          <FormInput
            control={form.control}
            name="previewLink"
            label="Preview Link"
            placeholder="Enter preview link"
            type="url"
          />
          <FormInput
            control={form.control}
            name="sourceLink"
            label="Source Link"
            placeholder="Enter source link"
            type="url"
            containerClassName="md:col-span-2"
          />
          <FormTextarea
            control={form.control}
            name="description"
            label="Project Description"
            placeholder="Enter project description"
            containerClassName="md:col-span-2"
            className="min-h-40 resize-none"
            required
          />

          <FormImageUploader
            control={form.control}
            name="image"
            label="Project Image"
            description="Image must be in PNG, JPG, JPEG, or WEBP format and less than 5MB"
            containerClassName="md:col-span-2"
            className="min-h-40"
          />
        </section>

        <section className="flex flex-wrap items-center justify-end gap-4 max-sm:flex-col-reverse">
          <Button
            variant="outline"
            type="button"
            className="max-sm:w-full"
            disabled={isPending}
            onClick={() => {
              push("/admin/projects");
            }}
          >
            <span>Reset</span>
            <IterationCcwIcon />
          </Button>
          <Button type="submit" className="max-sm:w-full" disabled={isPending}>
            <span>{isUpdate ? "Update Project" : "Create Project"}</span>
            {isPending ? <LoaderIcon className="animate-spin" /> : <SaveIcon />}
          </Button>
        </section>
      </form>
    </Form>
  );
}
