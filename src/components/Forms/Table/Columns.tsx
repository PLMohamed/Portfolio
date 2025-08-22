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
import { useFormsDialog } from "@/contexts/FormsDialog";
import { ActionResponseError } from "@/lib/server/actions";
import { ActionGetContacts } from "@/lib/server/actions/contact";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type ContactsResponse = Exclude<
  Awaited<ReturnType<typeof ActionGetContacts>>,
  ActionResponseError
>["data"];

export const useFormsColumns = (): ColumnDef<
  ContactsResponse["data"][number]
>[] => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setDeleteFormId } = useFormsDialog();

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
        accessorKey: "fullName",
        header: ({ column }) => {
          return (
            <SortableHeader
              column={column}
              title="Full Name"
              onSortingChange={handleSortingChange}
            />
          );
        },
        cell: ({ row }) => {
          return <span className="ps-4">{row.getValue("fullName")}</span>;
        },
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "email",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => {
          return (
            <SortableHeader
              column={column}
              title="Email"
              onSortingChange={handleSortingChange}
            />
          );
        },
        cell: ({ row }) => {
          return (
            <p className="max-w-md truncate ps-4">{row.getValue("email")}</p>
          );
        },
      },
      {
        accessorKey: "subject",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => {
          return (
            <SortableHeader
              column={column}
              title="Subject"
              onSortingChange={handleSortingChange}
            />
          );
        },
        cell: ({ row }) => {
          return (
            <p className="max-w-md truncate ps-4">{row.getValue("subject")}</p>
          );
        },
      },
      {
        accessorKey: "message",
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => {
          return (
            <SortableHeader
              column={column}
              title="Message"
              onSortingChange={handleSortingChange}
            />
          );
        },
        cell: ({ row }) => {
          return (
            <p className="max-w-md truncate ps-4">{row.getValue("message")}</p>
          );
        },
      },
      {
        accessorKey: "is_read",
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-center">
              <Badge
                variant={row.getValue("is_read") ? "success" : "destructive"}
              >
                {row.getValue("is_read") ? "Yes" : "No"}
              </Badge>
            </div>
          );
        },
        header: ({ column }) => {
          return (
            <div className="flex items-center justify-center">
              <SortableHeader
                column={column}
                title="Is Read"
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
              {format(new Date(row.getValue("createdAt")), "PPP pp")}
            </span>
          );
        },
      },

      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const form = row.original;

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
                  <Link href={`/admin/forms/${form.id}`}>
                    <span>View Form</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    // Delay setting the ID to allow dropdown to close
                    setTimeout(() => {
                      setDeleteFormId(form.id);
                    }, 0);
                  }}
                >
                  Delete form
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleSortingChange, setDeleteFormId],
  );
};
