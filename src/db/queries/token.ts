import {
  eq,
  type SelectedFields,
  type InferSelectModel,
  lt,
} from "drizzle-orm";
import { TOKEN_SCHEMA, TokenInsert } from "../schema";
import { cache } from "react";
import { db } from "@/db";

type TokenTable = typeof TOKEN_SCHEMA;
type TokenColumns =
  TokenTable["_"]["columns"][keyof TokenTable["_"]["columns"]];
type InferSelectedFields<T extends SelectedFields<TokenColumns, TokenTable>> = {
  [K in keyof T]: K extends keyof InferSelectModel<TokenTable>
    ? InferSelectModel<TokenTable>[K]
    : never;
};

const DEFAULT_SELECT = {
  id: TOKEN_SCHEMA.id,
  userId: TOKEN_SCHEMA.userId,
  token: TOKEN_SCHEMA.token,
};

export const GetToken = cache(
  async <
    TSelect extends SelectedFields<
      TokenColumns,
      TokenTable
    > = typeof DEFAULT_SELECT,
  >(
    token: string,
    selectFields?: TSelect,
  ): Promise<InferSelectedFields<TSelect> | null> => {
    const fields = (selectFields ?? DEFAULT_SELECT) as TSelect;

    const [result] = (await db
      .select(fields)
      .from(TOKEN_SCHEMA)
      .where(eq(TOKEN_SCHEMA.token, token))
      .limit(1)) as InferSelectedFields<TSelect>[];

    return result ?? null;
  },
);

export const GetTokensByUserId = cache(
  async <
    TSelect extends SelectedFields<
      TokenColumns,
      TokenTable
    > = typeof DEFAULT_SELECT,
  >(
    userId: string,
    selectFields?: TSelect,
  ): Promise<InferSelectedFields<TSelect>[]> => {
    const fields = (selectFields ?? DEFAULT_SELECT) as TSelect;

    const result = (await db
      .select(fields)
      .from(TOKEN_SCHEMA)
      .where(
        eq(TOKEN_SCHEMA.userId, userId),
      )) as InferSelectedFields<TSelect>[];

    return result;
  },
);

export const DeleteTokenById = cache(async (id: string) => {
  const result = await db.delete(TOKEN_SCHEMA).where(eq(TOKEN_SCHEMA.id, id));

  return result.rowCount;
});

export const DeleteTokensPastDate = cache(async (date: Date) => {
  const result = await db
    .delete(TOKEN_SCHEMA)
    .where(lt(TOKEN_SCHEMA.createdAt, date));

  return result.rowCount;
});

export const CreateToken = cache(async (values: TokenInsert) => {
  const result = await db.insert(TOKEN_SCHEMA).values(values).returning({
    insertedId: TOKEN_SCHEMA.id,
  });
  return result;
});
