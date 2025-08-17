import { REGEX } from "@/constants/regex";
import { LoginRequest, SignupRequest } from "@/types/request/auth";
import { z } from "zod";

export const loginValidator = z.object({
  email: z.email("Invalid Email").nonempty("Email is Required"),
  password: z
    .string()
    .nonempty("Password is Required")
    .regex(REGEX.PASSWORD_LETTERS, "Password must include at least one letter")
    .regex(REGEX.PASSWORD_NUMBERS, "Password must include at least one number")
    .regex(
      REGEX.PASSWORD_SPECIAL_CHARACTERS,
      "Password must include at least one special character",
    )
    .regex(
      REGEX.PASSWORD,
      "Password must be at least 8 characters, include letters and numbers",
    ),
}) satisfies z.ZodType<LoginRequest>;

export const signupValidator = z
  .object({
    email: z.email("Invalid Email").nonempty("Email is Required"),
    password: z
      .string()
      .nonempty("Password is Required")
      .regex(
        REGEX.PASSWORD_LETTERS,
        "Password must include at least one letter",
      )
      .regex(
        REGEX.PASSWORD_NUMBERS,
        "Password must include at least one number",
      )
      .regex(
        REGEX.PASSWORD_SPECIAL_CHARACTERS,
        "Password must include at least one special character",
      )
      .regex(
        REGEX.PASSWORD,
        "Password must be at least 8 characters, include letters and numbers",
      ),
    confirmPassword: z.string().nonempty("Confirm Password is Required"),
    name: z.string().optional().nullable().default(null),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }) satisfies z.ZodType<SignupRequest>;
