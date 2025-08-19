"use client";

import { ActionResponseError } from "@/lib/server/actions";
import { ActionGetProjectById } from "@/lib/server/actions/projects/read";
import { projectCreateValidator } from "@/lib/validators/project";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form/input";
import { FormTextarea } from "@/components/ui/form/textarea";
import { Button } from "@/components/ui/button";
import { IterationCcwIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Link } from "@/components/ui/link";
import { FormImageUploader } from "@/components/ui/form/image-uploader";

type ProjectResponse = Exclude<
  Awaited<ReturnType<typeof ActionGetProjectById>>,
  ActionResponseError
>["data"];

interface ProjectFormProps {
  project?: ProjectResponse;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const { push } = useRouter();

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

  const isUpdate = !!project;

  async function onSubmit(data: z.infer<typeof projectCreateValidator>) {}

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
          <Link
            href="/admin/projects"
            variant="outline"
            className="max-sm:w-full"
          >
            <span>Reset</span>
            <IterationCcwIcon />
          </Link>
          <Button type="submit" className="max-sm:w-full">
            <span>{isUpdate ? "Update Project" : "Create Project"}</span>
            <SaveIcon />
          </Button>
        </section>
      </form>
    </Form>
  );
}
