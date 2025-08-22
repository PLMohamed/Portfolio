"use server";

import { createProject } from "@/db/queries";
import { ProjectInsert } from "@/db/schema";
import { uploadImage } from "@/lib/server/services";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import { projectCreateValidator } from "@/lib/validators/project";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createServerAction } from "../..";

const createProjectActionSchema = z.tuple([
  projectCreateValidator,
  z.object({
    session: z.any(),
  }),
]);

const baseActionCreateProject = async (
  request: z.infer<typeof projectCreateValidator>,
  _sessionObject: unknown,
) => {
  const values: ProjectInsert = {
    title: request.title,
    description: request.description,
    download_link: request.downloadLink,
    preview_link: request.previewLink,
    source_link: request.sourceLink,
    image_url: request.image ? await uploadImage(request.image) : null,
  };

  await createProject(values);

  revalidatePath("/admin/projects");
  revalidatePath("/");

  return;
};

const validatedCreateProject = withActionValidator(
  baseActionCreateProject,
  createProjectActionSchema,
);

export const ActionCreateProject = createServerAction(
  withAuthAction(validatedCreateProject),
);
