"use client";

import { DataTable } from "@/components/ui/data-table";
import { ProjectsResponse, useProjectColumns } from "./Columns";

interface ProjectsTableProps {
  data: ProjectsResponse[];
}

export default function ProjectsTable({ data }: ProjectsTableProps) {
  const columns = useProjectColumns();

  return <DataTable columns={columns} data={data} />;
}
