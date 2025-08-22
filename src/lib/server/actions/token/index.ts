"use server";

import { UserTokenPayload } from "@/types/data/user";
import { ClientError, createServerAction } from "..";
import { withAuthAction } from "../../wrappers";
import { GetToken } from "@/db/queries";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/constants/config";
import { revokeSessionToken, setSessionToken } from "../../services";

const baseActionRevalidateToken = async ({
  session,
}: {
  session: UserTokenPayload;
}) => {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAMES.TOKEN)!.value;

  const tokenDb = await GetToken(token);

  if (!tokenDb) {
    cookieStore.delete(COOKIE_NAMES.TOKEN);
    throw new ClientError("Token not found in database");
  }

  try {
    const [, newToken] = await Promise.all([
      revokeSessionToken(tokenDb.id),
      setSessionToken(session),
    ]);

    cookieStore.set(COOKIE_NAMES.TOKEN, newToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      maxAge: 2 * 60 * 60,
      path: "/",
    });
  } catch (error) {
    throw new ClientError(
      error instanceof Error ? error.message : "Unknown error",
    );
  }
};

export const ActionRevalidateToken = createServerAction(
  withAuthAction(baseActionRevalidateToken),
);
