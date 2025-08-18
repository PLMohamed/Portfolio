"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActionResponseError } from "@/lib/server/actions";
import { ActionGetProjects } from "@/lib/server/actions/projects/read";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type ProjectsResponse = Exclude<
  Awaited<ReturnType<typeof ActionGetProjects>>,
  ActionResponseError
>["data"]["data"][number];

export const useProjectColumns = (): ColumnDef<ProjectsResponse>[] => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearchParamsChange = useCallback(
    (newParams: URLSearchParams) => {
      newParams.delete("page");
      router.push(`?${newParams.toString()}`);
    },
    [router],
  );

  const handleSortingChange = useCallback(
    (columnId: string) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (newParams.get("sortBy") === columnId) {
        newParams.delete("sortBy");
      } else {
        newParams.set("sortBy", columnId);
      }

      handleSearchParamsChange(newParams);
    },
    [handleSearchParamsChange, searchParams],
  );

  return useMemo(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                handleSortingChange(column.id);
                column.clearSorting();
                column.toggleSorting();
              }}
              className="has-[>svg]:px-4"
            >
              <span>Title</span>
              {column.getIsSorted() === "asc" && <ArrowUpIcon />}
            </Button>
          );
        },
        cell: ({ row }) => {
          return <span className="ps-4">{row.getValue("title")}</span>;
        },
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "is_visible",
        header: "Is Visible",
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => {
          return (
            <Badge
              variant={row.getValue("is_visible") ? "success" : "destructive"}
              className="mx-auto"
            >
              {row.getValue("is_visible") ? "Yes" : "No"}
            </Badge>
          );
        },
      },
    ],
    [handleSortingChange],
  );
};
