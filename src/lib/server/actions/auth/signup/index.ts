"use server";

import { withActionValidator } from "@/lib/server/wrappers";
import { z } from "zod";
import { ClientError, createServerAction } from "../..";
import { hash } from "bcrypt";
import { signupValidator } from "@/lib/validators";
import { createUser, doesUserExist } from "@/db/queries";
import { revalidatePath } from "next/cache";

const signupActionSchema = z.tuple([signupValidator]);

const baseActionSignup = async (values: z.infer<typeof signupValidator>) => {
  const { email, password, name } = values;

  const userExists = await doesUserExist();

  if (userExists) {
    throw new ClientError("Unauthorized Action, Admin account already exists");
  }

  const hashedPassword = await hash(password, 10);

  await createUser({
    name: name || email.split("@")[0],
    email,
    passwordHash: hashedPassword,
  });

  revalidatePath("/admin");
  revalidatePath("/auth/login");

  return;
};

const validatedSignupAction = withActionValidator(
  baseActionSignup,
  signupActionSchema,
);

export const ActionSignup = createServerAction(validatedSignupAction);
