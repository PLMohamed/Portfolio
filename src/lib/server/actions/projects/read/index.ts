"use server";

import { getProjects } from "@/db/queries";
import { PROJECT_SCHEMA, ProjectType } from "@/db/schema";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import { projectFilterValidator } from "@/lib/validators/project";
import z from "zod";
import { createServerAction } from "../..";

export type ProjectFilter = Partial<
  Omit<
    ProjectType,
    "id" | "image_url" | "preview_link" | "source_link" | "download_link"
  >
>;

const getProjectActionSchema = z.tuple([
  projectFilterValidator,
  z.object({
    session: z.any(),
  }),
]);

const baseActionGetProject = async (
  request: z.infer<typeof projectFilterValidator>,
  _sessionObject: unknown,
) => {
  const projects = await getProjects(
    {
      id: PROJECT_SCHEMA.id,
      title: PROJECT_SCHEMA.title,
      description: PROJECT_SCHEMA.description,
      is_visible: PROJECT_SCHEMA.is_visible,
      createdAt: PROJECT_SCHEMA.createdAt,
      updatedAt: PROJECT_SCHEMA.updatedAt,
    },
    undefined,
    {
      offset: (request.page - 1) * request.limit,
      limit: request.limit,
      orderBy: request.sortBy
        ? {
            column: PROJECT_SCHEMA[request.sortBy],
            direction: request.order,
          }
        : undefined,
    },
  );

  return projects;
};

const validatedGetProjects = withActionValidator(
  baseActionGetProject,
  getProjectActionSchema,
);

export const ActionGetProjects = createServerAction(
  withAuthAction(validatedGetProjects),
);
