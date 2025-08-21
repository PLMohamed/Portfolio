import z from "zod";

export const paginationsValidator = z.object({
  page: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().optional().default(1),
  ),
  limit: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(1).max(100).optional().default(10),
  ),
});
