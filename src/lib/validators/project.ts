import { z } from "zod";
import { ProjectFilter } from "../server/actions/projects/read";
import { FilterRequest } from "@/types/request";

export const projectFilterValidator = z.object({
  page: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().optional().default(1),
  ),
  limit: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(1).max(100).optional().default(10),
  ),
  sortBy: z
    .enum(["title", "description", "is_visible", "createdAt", "updatedAt"])
    .optional(),
  order: z.enum(["asc", "desc"]).optional(),
}) satisfies z.ZodType<FilterRequest<ProjectFilter>>;
