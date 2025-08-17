import { db } from "@/db";
import {
  and,
  asc,
  desc,
  eq,
  type SQL,
  type SelectedFields,
  type InferSelectModel,
} from "drizzle-orm";
import { cache } from "react";
import { PROJECT_SCHEMA } from "../schema";

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
    filters: SQL | SQL[] = [],
    selectFields?: TSelect,
    opts?: {
      offset?: number;
      limit?: number;
      orderBy?: {
        column: ProjectColumns;
        direction?: "asc" | "desc";
      };
    },
  ): Promise<InferSelectedFields<TSelect>[]> => {
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

    const results = (await query) as InferSelectedFields<TSelect>[];
    return results;
  },
);
