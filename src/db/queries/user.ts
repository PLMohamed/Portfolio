import { db } from "@/db";
import type { InferSelectModel } from "drizzle-orm";
import { and, eq, isNull, type SelectedFields } from "drizzle-orm";
import { cache } from "react";
import { USER_SCHEMA, UserInsert } from "../schema";

type UserTable = typeof USER_SCHEMA;
type UserColumns = UserTable["_"]["columns"][keyof UserTable["_"]["columns"]];
type InferSelectedFields<T extends SelectedFields<UserColumns, UserTable>> = {
  [K in keyof T]: K extends keyof InferSelectModel<UserTable>
    ? InferSelectModel<UserTable>[K]
    : never;
};

const DEFAULT_SELECT = {
  id: USER_SCHEMA.id,
  name: USER_SCHEMA.name,
  email: USER_SCHEMA.email,
};

export const getUserById = cache(
  async <
    TSelect extends SelectedFields<
      UserColumns,
      UserTable
    > = typeof DEFAULT_SELECT,
  >(
    id: string,
    selectFields?: TSelect,
  ): Promise<InferSelectedFields<TSelect> | null> => {
    const fields = (selectFields ?? DEFAULT_SELECT) as TSelect;

    const result: InferSelectedFields<TSelect>[] = (await db
      .select(fields)
      .from(USER_SCHEMA)
      .where(and(eq(USER_SCHEMA.id, id), isNull(USER_SCHEMA.deletedAt)))
      .limit(1)) as InferSelectedFields<TSelect>[];

    return result[0] ?? null;
  },
);

export const getUserByEmail = cache(
  async <
    TSelect extends SelectedFields<
      UserColumns,
      UserTable
    > = typeof DEFAULT_SELECT,
  >(
    email: string,
    selectFields?: TSelect,
  ): Promise<InferSelectedFields<TSelect> | null> => {
    const fields = (selectFields ?? DEFAULT_SELECT) as TSelect;

    const [result]: InferSelectedFields<TSelect>[] = (await db
      .select(fields)
      .from(USER_SCHEMA)
      .where(and(eq(USER_SCHEMA.email, email), isNull(USER_SCHEMA.deletedAt)))
      .limit(1)) as InferSelectedFields<TSelect>[];

    return result ?? null;
  },
);

export const createUser = cache(async (userData: UserInsert) => {
  const [result] = await db.insert(USER_SCHEMA).values(userData).returning({
    insertedId: USER_SCHEMA.id,
  });

  return result;
});

export const doesUserExist = cache(async (): Promise<boolean> => {
  const count = await db
    .select({ id: USER_SCHEMA.id })
    .from(USER_SCHEMA)
    .where(isNull(USER_SCHEMA.deletedAt))
    .limit(1);

  return count.length > 0;
});
