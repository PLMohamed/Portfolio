"use client";

import { DataTable, DataTableProvider } from "@/components/ui/data-table";
import { DataTablePaginations } from "@/components/ui/data-table/paginations";
import { ProjectsResponse, useProjectColumns } from "./Columns";
import ProjectTableController from "./Controller";

interface ProjectsTableProps {
  data: ProjectsResponse | undefined;
}

export default function ProjectsTable({ data }: ProjectsTableProps) {
  const columns = useProjectColumns();

  return (
    <DataTableProvider
      columns={columns}
      data={data?.data ?? []}
      paginations={{
        page: data?.currentPage ?? 1,
        totalPages: data?.totalPages ?? 1,
        total: data?.total ?? 0,
      }}
    >
      <ProjectTableController />
      <DataTable />
      <DataTablePaginations />
    </DataTableProvider>
  );
}
