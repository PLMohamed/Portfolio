"use server";

import { getFormsCount } from "@/db/queries";
import { FORM_SCHEMA } from "@/db/schema";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import { eq, gt } from "drizzle-orm";
import z from "zod";
import { createServerAction } from "../..";

const getFormsStatsSchema = z.tuple([
  z.object({
    session: z.any(),
  }),
]);

const baseActionGetFormsStats = async (
  _sessionsObject: z.infer<typeof getFormsStatsSchema>[0],
) => {
  const week = new Date();
  week.setDate(week.getDate() - 7);

  const [totalForms, formsThisWeek, unreadForms] = await Promise.all([
    getFormsCount(),
    getFormsCount(gt(FORM_SCHEMA.createdAt, week)),
    getFormsCount(eq(FORM_SCHEMA.is_read, false)),
  ]);

  return {
    totalForms,
    formsThisWeek,
    unreadForms,
  };
};

const validatedGetFormsStats = withActionValidator(
  baseActionGetFormsStats,
  getFormsStatsSchema,
);

export const ActionGetFormsStats = createServerAction(
  withAuthAction(validatedGetFormsStats),
);
