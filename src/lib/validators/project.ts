import { z } from "zod";
import { ProjectFilter } from "../server/actions/projects/read";
import { FilterRequest } from "@/types/request";
import { ProjectRequest } from "@/types/request/project";

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
  q: z.string().trim().optional(),
}) satisfies z.ZodType<FilterRequest<ProjectFilter>>;

export const projectCreateValidator = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Title is required")
    .min(1, "Title is too short")
    .max(255, "Maximum title length is 255 characters"),
  description: z
    .string()
    .nonempty("Description is required")
    .trim()
    .max(5000, "Maximum description length is 5000 characters"),
  downloadLink: z
    .url()
    .max(255, "Maximum download link length is 255 characters")
    .nullable()
    .default(null)
    .nonoptional(),
  previewLink: z
    .url()
    .max(255, "Maximum preview link length is 255 characters")
    .nullable()
    .default(null)
    .nonoptional(),
  sourceLink: z
    .url()
    .max(255, "Maximum source link length is 255 characters")
    .nullable()
    .default(null)
    .nonoptional(),
  image: z
    .file()
    .max(5 * 1024 * 1024) // 5MB
    .mime("image/*")
    .nullable()
    .default(null)
    .nonoptional(),
}) satisfies z.ZodType<ProjectRequest>;
