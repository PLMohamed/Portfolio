import { FilterRequest } from "@/types/request";
import { FormRequest } from "@/types/request/form";
import z from "zod";
import { FormFilter } from "../server/actions/form/read";

export const formValidator = z.object({
  fullName: z
    .string()
    .nonempty("Full name is required")
    .trim()
    .min(3, "Full name must be at least 3 characters long")
    .max(255, "Full name must not exceed 255 characters"),
  email: z
    .email()
    .nonempty("Email is required")
    .trim()
    .max(255, "Email must not exceed 255 characters"),
  subject: z
    .string()
    .nonempty("Subject is required")
    .trim()
    .min(3, "Subject must be at least 3 characters long")
    .max(255, "Subject must not exceed 255 characters"),
  message: z
    .string()
    .nonempty("Message is required")
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message must not exceed 1000 characters"),
}) satisfies z.ZodType<FormRequest>;

export const formFilterValidator = z.object({
  page: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().optional().default(1),
  ),
  limit: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(1).max(100).optional().default(10),
  ),
  sortBy: z
    .enum(["fullName", "email", "subject", "message", "createdAt"])
    .optional(),
  order: z.enum(["asc", "desc"]).optional(),
  q: z.string().trim().optional(),
}) satisfies z.ZodType<FilterRequest<FormFilter>>;
