import { db } from "@/db";
import {
  and,
  asc,
  desc,
  eq,
  type SQL,
  type SelectedFields,
  type InferSelectModel,
  count,
} from "drizzle-orm";
import { cache } from "react";
import { PROJECT_SCHEMA } from "../schema";
import { PaginationData } from "@/types/data/pagination";

type ProjectTable = typeof PROJECT_SCHEMA;
type ProjectColumns =
  ProjectTable["_"]["columns"][keyof ProjectTable["_"]["columns"]];
type InferSelectedFields<
  T extends SelectedFields<ProjectColumns, ProjectTable>,
> = {
  [K in keyof T]: K extends keyof InferSelectModel<ProjectTable>
    ? InferSelectModel<ProjectTable>[K]
    : never;
};

const DEFAULT_SELECT = {
  id: PROJECT_SCHEMA.id,
  title: PROJECT_SCHEMA.title,
  description: PROJECT_SCHEMA.description,
  image_url: PROJECT_SCHEMA.image_url,
  preview_link: PROJECT_SCHEMA.preview_link,
  source_link: PROJECT_SCHEMA.source_link,
  download_link: PROJECT_SCHEMA.download_link,
};

export const getProjectById = cache(
  async <
    TSelect extends SelectedFields<
      ProjectColumns,
      ProjectTable
    > = typeof DEFAULT_SELECT,
  >(
    id: string,
    selectFields?: TSelect,
  ): Promise<InferSelectedFields<TSelect> | null> => {
    const fields = (selectFields ?? DEFAULT_SELECT) as TSelect;

    const [project] = (await db
      .select(fields)
      .from(PROJECT_SCHEMA)
      .where(eq(PROJECT_SCHEMA.id, id))
      .limit(1)) as InferSelectedFields<TSelect>[];

    return project;
  },
);

export const getProjects = cache(
  async <
    TSelect extends SelectedFields<
      ProjectColumns,
      ProjectTable
    > = typeof DEFAULT_SELECT,
  >(
    selectFields?: TSelect,
    filters: SQL | SQL[] = [],
    opts?: {
      offset?: number;
      limit?: number;
      orderBy?: {
        column: ProjectColumns;
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

    const query = db.select(fields).from(PROJECT_SCHEMA);

    if (whereClause) {
      query.where(whereClause);
    }

    if (orderBy) {
      const { column, direction = "asc" } = orderBy;
      query.orderBy(direction === "asc" ? asc(column) : desc(column));
    }

    if (typeof offset === "number") {
      query.offset(offset);
    }
    if (typeof limit === "number") {
      query.limit(limit);
    }

    const [count, results] = (await Promise.all([
      getProjectCount(whereClause),
      query,
    ])) as [
      Awaited<ReturnType<typeof getProjectCount>>,
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

export const getProjectCount = cache(
  async (filters: SQL | SQL[] = []): Promise<number> => {
    const whereClause = Array.isArray(filters)
      ? filters.length > 0
        ? and(...filters)
        : undefined
      : filters;

    const [result] = await db
      .select({ count: count(PROJECT_SCHEMA.id) })
      .from(PROJECT_SCHEMA)
      .where(whereClause)
      .limit(1);

    return result?.count ?? 0;
  },
);
