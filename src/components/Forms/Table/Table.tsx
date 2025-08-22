"use client";

import { DataTable, DataTableProvider } from "@/components/ui/data-table";
import { DataTablePaginations } from "@/components/ui/data-table/paginations";
import { ContactsResponse, useFormsColumns } from "./Columns";
import FormTableController from "./Controller";

interface FormsTableProps {
  data: ContactsResponse | undefined;
}

export default function FormsTable({ data }: FormsTableProps) {
  const columns = useFormsColumns();

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
      <FormTableController />
      <DataTable />
      <DataTablePaginations />
    </DataTableProvider>
  );
}
