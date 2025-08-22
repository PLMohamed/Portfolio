"use server";

import { COOKIE_NAMES } from "@/constants/config";
import { getUserById } from "@/db/queries";
import { withAuthAction } from "@/lib/server/wrappers";
import { UserTokenPayload } from "@/types/data/user";
import { cookies } from "next/headers";
import { ClientError, createServerAction } from "../..";

const baseActionMe = async ({ session }: { session: UserTokenPayload }) => {
  const user = await getUserById(session.uuid);

  if (!user) {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAMES.TOKEN);

    throw new ClientError("User not found.");
  }

  return user;
};

export const ActionMe = createServerAction(withAuthAction(baseActionMe));
