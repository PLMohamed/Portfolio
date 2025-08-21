"use server";

import { getProjectById, getProjects } from "@/db/queries";
import { PROJECT_SCHEMA, ProjectType } from "@/db/schema";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import { paginationsValidator, projectFilterValidator } from "@/lib/validators";
import { eq, like, or, SQL } from "drizzle-orm";
import z from "zod";
import { ClientError, createServerAction } from "../..";

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
  let condition: SQL | undefined;

  if (request.q) {
    condition = or(
      like(PROJECT_SCHEMA.title, `%${request.q}%`),
      like(PROJECT_SCHEMA.description, `%${request.q}%`),
    );
  }

  const projects = await getProjects(
    {
      id: PROJECT_SCHEMA.id,
      title: PROJECT_SCHEMA.title,
      description: PROJECT_SCHEMA.description,
      is_visible: PROJECT_SCHEMA.is_visible,
      createdAt: PROJECT_SCHEMA.createdAt,
      updatedAt: PROJECT_SCHEMA.updatedAt,
    },
    condition,
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

const getProjectByIdActionSchema = z.tuple([
  z.uuid().nonempty("Id is required"),
  z.object({
    session: z.any(),
  }),
]);

const baseActionGetProjectById = async (
  id: z.infer<typeof getProjectByIdActionSchema>[0],
  _sessionObject: unknown,
) => {
  const project = await getProjectById(id);

  if (!project) {
    throw new ClientError("Project not found");
  }

  return project;
};

const validatedGetProjectById = withActionValidator(
  baseActionGetProjectById,
  getProjectByIdActionSchema,
);

export const ActionGetProjectById = createServerAction(
  withAuthAction(validatedGetProjectById),
);

const getPublicProjectActionSchema = z.tuple([paginationsValidator]);

const baseActionGetPublicProject = async (
  request: z.infer<typeof paginationsValidator>,
) => {
  const projects = await getProjects(
    {
      id: PROJECT_SCHEMA.id,
      title: PROJECT_SCHEMA.title,
      description: PROJECT_SCHEMA.description,
      download_link: PROJECT_SCHEMA.download_link,
      image_url: PROJECT_SCHEMA.image_url,
      preview_link: PROJECT_SCHEMA.preview_link,
      source_link: PROJECT_SCHEMA.source_link,
    },
    eq(PROJECT_SCHEMA.is_visible, true),
    {
      offset: (request.page - 1) * request.limit,
      limit: request.limit,
    },
  );

  return projects;
};

const validatedGetPublicProjects = withActionValidator(
  baseActionGetPublicProject,
  getPublicProjectActionSchema,
);

export const ActionGetPublicProjects = createServerAction(
  validatedGetPublicProjects,
);
