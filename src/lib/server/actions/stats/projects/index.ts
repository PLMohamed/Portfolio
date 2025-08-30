"use server";

import { getProjectCount } from "@/db/queries";
import { PROJECT_SCHEMA } from "@/db/schema";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import { gt } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "../..";

const getProjectsStatsSchema = z.tuple([
  z.object({
    session: z.any(),
  }),
]);

const baseActionGetProjectsStats = async (
  _sessionsObject: z.infer<typeof getProjectsStatsSchema>[0],
) => {
  const month = new Date();
  month.setMonth(month.getMonth() - 1);

  const [totalProjects, projectsThisMonth] = await Promise.all([
    getProjectCount(),
    getProjectCount(gt(PROJECT_SCHEMA.createdAt, month)),
  ]);

  return {
    totalProjects,
    projectsThisMonth,
  };
};

const validatedGetProjectsStats = withActionValidator(
  baseActionGetProjectsStats,
  getProjectsStatsSchema,
);

export const ActionGetProjectsStats = createServerAction(
  withAuthAction(validatedGetProjectsStats),
);
