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
import {
  useDeleteProject,
  useUpdateStatusProject,
} from "@/hooks/api/useProjects";
import { ActionResponseError } from "@/lib/server/actions";
import { ActionGetProjects } from "@/lib/server/actions/projects/read";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { format } from "date-fns";
import { Loader2Icon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
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

  const { mutate: deleteProject } = useDeleteProject();
  const { mutate: updateStatusProject } = useUpdateStatusProject();

  const [deleteProjectIndex, setDeleteProjectIndex] = useState<number[]>([]);
  const [updateStatusProjectIndex, setUpdateStatusProjectIndex] = useState<
    number[]
  >([]);

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

  const handleSetDeleteProjectIndex = useCallback(setDeleteProjectIndex, [
    setDeleteProjectIndex,
  ]);

  const handleSetUpdateStatusProjectIndex = useCallback(
    setUpdateStatusProjectIndex,
    [setUpdateStatusProjectIndex],
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
          return (
            <p className="max-w-md truncate ps-4">
              {row.getValue("description")}
            </p>
          );
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
                {project.is_visible ? (
                  <DropdownMenuItem
                    onClick={() => {
                      handleSetUpdateStatusProjectIndex((prev) => [
                        ...prev,
                        row.index,
                      ]);

                      updateStatusProject(
                        {
                          id: project.id,
                          values: false,
                        },
                        {
                          onSuccess: () => {
                            toast.success(
                              `Project '${project.title}' status updated successfully`,
                            );
                          },
                          onSettled: () => {
                            handleSetUpdateStatusProjectIndex((prev) =>
                              prev.filter((idx) => idx !== row.index),
                            );
                          },
                        },
                      );
                    }}
                    disabled={updateStatusProjectIndex.includes(row.index)}
                  >
                    Hide project
                    {updateStatusProjectIndex.includes(row.index) && (
                      <Loader2Icon className="animate-spin" />
                    )}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => {
                      handleSetUpdateStatusProjectIndex((prev) => [
                        ...prev,
                        row.index,
                      ]);

                      updateStatusProject(
                        {
                          id: project.id,
                          values: true,
                        },
                        {
                          onSuccess: () => {
                            toast.success(
                              `Project '${project.title}' status updated successfully`,
                            );
                          },
                          onSettled: () => {
                            handleSetUpdateStatusProjectIndex((prev) =>
                              prev.filter((idx) => idx !== row.index),
                            );
                          },
                        },
                      );
                    }}
                    disabled={updateStatusProjectIndex.includes(row.index)}
                  >
                    Show project
                    {updateStatusProjectIndex.includes(row.index) && (
                      <Loader2Icon className="animate-spin" />
                    )}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href={`/admin/projects/${project.id}`}>
                    <span>Edit project</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    handleSetDeleteProjectIndex((prev) => [...prev, row.index]);

                    deleteProject(project.id, {
                      onSettled: () => {
                        handleSetDeleteProjectIndex((prev) =>
                          prev.filter((idx) => idx !== row.index),
                        );
                      },
                      onSuccess: () => {
                        toast.success(
                          `Project '${project.title}' deleted successfully`,
                        );
                      },
                    });
                  }}
                  disabled={deleteProjectIndex.includes(row.index)}
                >
                  Delete project
                  {deleteProjectIndex.includes(row.index) && (
                    <Loader2Icon className="animate-spin" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [
      deleteProject,
      deleteProjectIndex,
      handleSetDeleteProjectIndex,
      handleSetUpdateStatusProjectIndex,
      handleSortingChange,
      updateStatusProject,
      updateStatusProjectIndex,
    ],
  );
};
