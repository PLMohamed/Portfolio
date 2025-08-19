import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Button } from "../button";
import { Column, SortDirection } from "@tanstack/react-table";
import { useCallback } from "react";

interface SortableHeaderProps<T> {
  column: Column<T>;
  title: string;
  onSortingChange: (columnId: string, direction?: SortDirection) => void;
}

export default function SortableHeader<T>({
  column,
  title,
  onSortingChange,
}: SortableHeaderProps<T>) {
  const getSortingDirection = useCallback(
    (currentDirection: SortDirection | false) => {
      if (currentDirection === "asc") return "desc";
      if (currentDirection === "desc") return undefined;
      return "asc";
    },
    [],
  );

  return (
    <Button
      variant="ghost"
      onClick={() => {
        const newDirection = getSortingDirection(column.getIsSorted());
        onSortingChange(column.id, newDirection);

        if (newDirection) {
          column.toggleSorting(newDirection !== "asc");
        } else {
          column.clearSorting();
        }
      }}
      className="has-[>svg]:px-4"
    >
      <span>{title}</span>
      {column.getIsSorted() === "asc" && <ArrowUpIcon />}
      {column.getIsSorted() === "desc" && <ArrowDownIcon />}
    </Button>
  );
}
