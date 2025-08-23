"use server";

import { USER_TOKEN_TYPES } from "@/constants/token";
import { getUserByEmail } from "@/db/queries";
import { USER_SCHEMA } from "@/db/schema";
import { setSessionToken } from "@/lib/server/services";
import {
  withActionValidator,
  withRatelimitAction,
} from "@/lib/server/wrappers";
import { loginValidator } from "@/lib/validators";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import { z } from "zod";
import { ClientError, createServerAction } from "../..";
import { COOKIE_NAMES } from "@/constants/config";
import { revalidatePath } from "next/cache";

const loginActionSchema = z.tuple([loginValidator]);

const baseActionLogin = async (values: z.infer<typeof loginValidator>) => {
  const { email, password } = values;

  const user = await getUserByEmail(email, {
    id: USER_SCHEMA.id,
    email: USER_SCHEMA.email,
    passwordHash: USER_SCHEMA.passwordHash,
  });

  if (!user) {
    throw new ClientError("Email or password is incorrect.");
  }

  const passwordMatch = await compare(password, user.passwordHash);

  if (!passwordMatch) {
    throw new ClientError("Email or password is incorrect.");
  }

  const [token, cookieStore] = await Promise.all([
    setSessionToken(
      {
        uuid: user.id,
        type: USER_TOKEN_TYPES.ACCESS,
      },
      2,
    ),
    cookies(),
  ]);

  cookieStore.set(COOKIE_NAMES.TOKEN, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    maxAge: 2 * 60 * 60,
    path: "/",
  });

  revalidatePath("/admin");
  revalidatePath("/auth/login");

  return;
};

const validatedLogin = withActionValidator(baseActionLogin, loginActionSchema);

export const ActionLogin = createServerAction(
  withRatelimitAction(validatedLogin, {
    useIp: true,
    duration: "1h",
    key: "login",
    limit: 5,
  }),
);
