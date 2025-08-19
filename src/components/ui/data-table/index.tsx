"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  TableOptions,
  type Table as TableType,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";

interface DataTableContext<TData> {
  table: TableType<TData>;
}

const DataTableContext = createContext<DataTableContext<unknown> | null>(null);

interface DataTableProviderProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  opts?: Omit<TableOptions<TData>, "data" | "columns">;
  paginations: {
    page: number;
    totalPages: number;
    total: number;
  };
  children: React.ReactNode;
}

function DataTableProvider<TData, TValue>({
  columns,
  data,
  opts,
  paginations,
  children,
}: DataTableProviderProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const limit = Number(searchParams.get("limit")) || 10;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    pageCount: paginations.totalPages,
    state: {
      pagination: {
        pageIndex: paginations.page - 1,
        pageSize: limit,
      },
    },
    onPaginationChange: (updater) => {
      const newParams = new URLSearchParams(searchParams.toString());

      const newState =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;

      const newPageIndex = newState.pageIndex + 1;

      newParams.set("page", newPageIndex.toString());
      newParams.set("limit", newState.pageSize.toString());

      replace(`?${newParams.toString()}`);
    },
    ...opts,
  });

  return (
    <DataTableContext.Provider value={{ table } as DataTableContext<unknown>}>
      {children}
    </DataTableContext.Provider>
  );
}

function DataTable<TData>() {
  const { table } = useDataTable<TData>();

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function useDataTable<TData>() {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }

  return context as DataTableContext<TData>;
}

export { DataTable, DataTableProvider, useDataTable };
