import z, { ZodError } from "zod";

/**
 * Validates input against a Zod schema. and return always a valid input
 * @param zodSchema The Zod schema to validate against.
 * @param input The input to validate.
 */
export function validateSchema<T extends unknown[]>(
  zodSchema: z.ZodType<T>,
  input: unknown,
): z.infer<typeof zodSchema> {
  try {
    // Try to parse with safeParse (returns { success, data/error })
    const result = zodSchema.safeParse(input);
    console.log("Validation Result:", result);
    if (result.success) {
      return result.data;
    }

    // If error: try again with empty object → applies defaults/catch
    return zodSchema.parse([{}]);
  } catch (e) {
    if (e instanceof ZodError) {
      // as last resort → give zodSchema's defaults
      return zodSchema.parse([{}]);
    }
    throw e;
  }
}
