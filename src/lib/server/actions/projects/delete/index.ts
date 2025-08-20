"use server";

import { deleteProjectById } from "@/db/queries";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import z from "zod";
import { ClientError, createServerAction } from "../..";
import { revalidatePath } from "next/cache";
import { deleteImage } from "@/lib/server/services";

const deleteProjectActionSchema = z.tuple([
  z.uuid().nonempty("Id is required"),
  z.object({
    session: z.any(),
  }),
]);

const baseActionDeleteProject = async (
  id: z.infer<typeof deleteProjectActionSchema>[0],
  _sessionObject: unknown,
) => {
  const project = await deleteProjectById(id);

  if (!project) {
    throw new ClientError("Project not found");
  }

  if (project.imageUrl) {
    await deleteImage(project.imageUrl);
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");

  return project;
};

const validatedDeleteProject = withActionValidator(
  baseActionDeleteProject,
  deleteProjectActionSchema,
);

export const ActionDeleteProject = createServerAction(
  withAuthAction(validatedDeleteProject),
);
