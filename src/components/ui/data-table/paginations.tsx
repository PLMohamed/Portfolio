"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDataTable } from ".";
import { Label } from "../label";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

function DataTablePaginations() {
  const { table } = useDataTable();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (type: "next" | "previous" | "first" | "last") => {
      const newParams = new URLSearchParams(searchParams.toString());

      switch (type) {
        case "next":
          if (!table.getCanNextPage()) return "";
          newParams.set(
            "page",
            (table.getState().pagination.pageIndex + 2).toString(),
          );
          break;
        case "previous":
          if (!table.getCanPreviousPage()) return "";
          newParams.set(
            "page",
            table.getState().pagination.pageIndex.toString(),
          );
          break;
        case "first":
          if (!table.getCanPreviousPage()) return "";
          newParams.set("page", "1");
          break;
        case "last":
          if (!table.getCanNextPage()) return "";
          newParams.set("page", table.getPageCount().toString());
          break;
      }

      return "?" + newParams.toString();
    },
    [searchParams, table],
  );

  return (
    <Pagination className="justify-end">
      <PaginationContent className="gap-2">
        <PaginationItem className="hidden items-center gap-2 lg:mr-8 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 2, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PaginationItem>

        <PaginationItem className="flex w-fit items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </PaginationItem>

        <PaginationItem>
          <PaginationFirst
            href={handlePageChange("first")}
            isActive={table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href={handlePageChange("previous")}
            isActive={table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={handlePageChange("next")}
            isActive={table.getCanNextPage()}
            onClick={() => table.nextPage()}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            href={handlePageChange("last")}
            isActive={table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { DataTablePaginations };
