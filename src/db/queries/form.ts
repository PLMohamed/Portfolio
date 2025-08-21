import { db } from "@/db";
import { PaginationData } from "@/types/data/pagination";
import {
  and,
  asc,
  count,
  desc,
  eq,
  type InferSelectModel,
  type SQL,
  type SelectedFields,
} from "drizzle-orm";
import { cache } from "react";
import { FORM_SCHEMA, FormInsert } from "../schema";

type FormTable = typeof FORM_SCHEMA;
type FormColumns = FormTable["_"]["columns"][keyof FormTable["_"]["columns"]];
type InferSelectedFields<T extends SelectedFields<FormColumns, FormTable>> = {
  [K in keyof T]: K extends keyof InferSelectModel<FormTable>
    ? InferSelectModel<FormTable>[K]
    : never;
};

const DEFAULT_SELECT = {
  id: FORM_SCHEMA.id,
  subject: FORM_SCHEMA.subject,
  fullName: FORM_SCHEMA.fullName,
  email: FORM_SCHEMA.email,
  message: FORM_SCHEMA.message,
  createdAt: FORM_SCHEMA.createdAt,
};

export const getFormById = cache(
  async <
    TSelect extends SelectedFields<
      FormColumns,
      FormTable
    > = typeof DEFAULT_SELECT,
  >(
    id: string,
    selectFields?: TSelect,
  ): Promise<InferSelectedFields<TSelect> | null> => {
    const fields = (selectFields ?? DEFAULT_SELECT) as TSelect;

    const [form] = (await db
      .select(fields)
      .from(FORM_SCHEMA)
      .where(eq(FORM_SCHEMA.id, id))
      .limit(1)) as InferSelectedFields<TSelect>[];

    return form;
  },
);

export const getForms = cache(
  async <
    TSelect extends SelectedFields<
      FormColumns,
      FormTable
    > = typeof DEFAULT_SELECT,
  >(
    selectFields?: TSelect,
    filters: SQL | SQL[] = [],
    opts?: {
      offset?: number;
      limit?: number;
      orderBy?: {
        column: FormColumns;
        direction?: "asc" | "desc";
      };
    },
  ): Promise<PaginationData<InferSelectedFields<TSelect>[]>> => {
    const fields = (selectFields ?? DEFAULT_SELECT) as TSelect;
    const { offset, limit, orderBy } = opts ?? {};

    const whereClause = Array.isArray(filters)
      ? filters.length > 0
        ? and(...filters)
        : undefined
      : filters;

    const query = db.select(fields).from(FORM_SCHEMA);

    if (whereClause) {
      query.where(whereClause);
    }

    if (orderBy) {
      const { column, direction = "asc" } = orderBy;
      query.orderBy(direction === "asc" ? asc(column) : desc(column));
    } else {
      query.orderBy(desc(FORM_SCHEMA.createdAt));
    }

    if (typeof offset === "number") {
      query.offset(offset);
    }
    if (typeof limit === "number") {
      query.limit(limit);
    }

    const [count, results] = (await Promise.all([
      getFormCount(whereClause),
      query,
    ])) as [
      Awaited<ReturnType<typeof getFormCount>>,
      InferSelectedFields<TSelect>[],
    ];

    return {
      data: results,
      total: count,
      currentPage: offset ? Math.ceil(offset / (limit ?? 10)) + 1 : 1,
      totalPages: Math.ceil(count / (limit ?? 1)),
    };
  },
);

export const getFormCount = cache(
  async (filters: SQL | SQL[] = []): Promise<number> => {
    const whereClause = Array.isArray(filters)
      ? filters.length > 0
        ? and(...filters)
        : undefined
      : filters;

    const [result] = await db
      .select({ count: count(FORM_SCHEMA.id) })
      .from(FORM_SCHEMA)
      .where(whereClause)
      .limit(1);

    return result?.count ?? 0;
  },
);

export const createForm = cache(async (values: FormInsert) => {
  const [result] = await db.insert(FORM_SCHEMA).values(values).returning({
    insertedId: FORM_SCHEMA.id,
  });

  return result;
});

export const deleteFormById = cache(async (id: string) => {
  const [result] = await db
    .delete(FORM_SCHEMA)
    .where(eq(FORM_SCHEMA.id, id))
    .returning({
      deletedId: FORM_SCHEMA.id,
    });

  return result;
});
