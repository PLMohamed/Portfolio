"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SortableHeader from "@/components/ui/data-table/sortable-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionResponseError } from "@/lib/server/actions";
import { ActionGetProjects } from "@/lib/server/actions/projects/read";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

export type ProjectsResponse = Exclude<
  Awaited<ReturnType<typeof ActionGetProjects>>,
  ActionResponseError
>["data"];

export const useProjectColumns = (): ColumnDef<
  ProjectsResponse["data"][number]
>[] => {
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
    (columnId: string, direction?: SortDirection) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (direction) {
        newParams.set("sortBy", columnId);
        newParams.set("order", direction);
      } else {
        newParams.delete("sortBy");
        newParams.delete("order");
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
            <SortableHeader
              column={column}
              title="Title"
              onSortingChange={handleSortingChange}
            />
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
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => {
          return (
            <SortableHeader
              column={column}
              title="Description"
              onSortingChange={handleSortingChange}
            />
          );
        },
        cell: ({ row }) => {
          return <span className="ps-4">{row.getValue("description")}</span>;
        },
      },
      {
        accessorKey: "is_visible",
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-center">
              <Badge
                variant={row.getValue("is_visible") ? "success" : "destructive"}
              >
                {row.getValue("is_visible") ? "Yes" : "No"}
              </Badge>
            </div>
          );
        },
        header: ({ column }) => {
          return (
            <div className="flex items-center justify-center">
              <SortableHeader
                column={column}
                title="Is Visible"
                onSortingChange={handleSortingChange}
              />
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => {
          return (
            <SortableHeader
              column={column}
              title="Created At"
              onSortingChange={handleSortingChange}
            />
          );
        },
        cell: ({ row }) => {
          return (
            <span className="ps-4">
              {format(new Date(row.getValue("updatedAt")), "PPP pp")}
            </span>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => {
          return (
            <SortableHeader
              column={column}
              title="Updated At"
              onSortingChange={handleSortingChange}
            />
          );
        },
        cell: ({ row }) => {
          return (
            <span className="ps-4">
              {format(new Date(row.getValue("updatedAt")), "PPP pp")}
            </span>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const project = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={null} className="size-8">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/projects/${project.id}`}>
                    <span>Edit project</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.warning("Coming soon!")}>
                  View customer
                </DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleSortingChange],
  );
};
