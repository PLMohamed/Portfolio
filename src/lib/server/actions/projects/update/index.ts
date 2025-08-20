"use server";

import { updateProject } from "@/db/queries";
import { ProjectInsert } from "@/db/schema";
import { deleteImage, uploadImage } from "@/lib/server/services";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import { projectCreateValidator } from "@/lib/validators/project";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createServerAction } from "../..";
import { ActionGetProjectById } from "../read";

const updateProjectActionSchema = z.tuple([
  z.uuid().nonempty("Id is required"),
  projectCreateValidator,
  z.object({
    session: z.any(),
  }),
]);

const baseActionUpdateProject = async (
  id: z.infer<typeof updateProjectActionSchema>[0],
  request: z.infer<typeof projectCreateValidator>,
  _sessionObject: unknown,
) => {
  const { data, error } = await ActionGetProjectById(id);

  if (error) {
    throw error;
  }

  if (data.image_url) await deleteImage(data.image_url);

  const values: ProjectInsert = {
    title: request.title,
    description: request.description,
    download_link: request.downloadLink,
    preview_link: request.previewLink,
    source_link: request.sourceLink,
    image_url: request.image ? await uploadImage(request.image) : null,
  };

  await updateProject(id, values);

  revalidatePath("/admin/projects");
  revalidatePath("/");

  return;
};

const validatedUpdateProject = withActionValidator(
  baseActionUpdateProject,
  updateProjectActionSchema,
);

export const ActionUpdateProject = createServerAction(
  withAuthAction(validatedUpdateProject),
);

const updateStatusProjectActionSchema = z.tuple([
  z.uuid().nonempty("Id is required"),
  z.boolean().nonoptional("Status is required"),
  z.object({
    session: z.any(),
  }),
]);

const baseActionUpdateStatusProject = async (
  id: z.infer<typeof updateStatusProjectActionSchema>[0],
  status: z.infer<typeof updateStatusProjectActionSchema>[1],
  _sessionObject: unknown,
) => {
  const { error } = await ActionGetProjectById(id);

  if (error) {
    throw error;
  }

  await updateProject(id, { is_visible: status });

  revalidatePath("/admin/projects");
  revalidatePath("/");

  return;
};

const validatedUpdateStatusProject = withActionValidator(
  baseActionUpdateStatusProject,
  updateStatusProjectActionSchema,
);

export const ActionUpdateStatusProject = createServerAction(
  withAuthAction(validatedUpdateStatusProject),
);
