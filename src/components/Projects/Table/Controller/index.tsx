"use client";

import { DataTableColumnsCustomize } from "@/components/ui/data-table/visibility";
import { Link } from "@/components/ui/link";
import Search from "@/components/ui/search";
import { CirclePlusIcon } from "lucide-react";

export default function ProjectTableController() {
  return (
    <section className="flex flex-wrap items-center justify-end gap-4">
      <Search className="min-w-3xs" />
      <DataTableColumnsCustomize />
      <Link href="/admin/projects/new">
        <CirclePlusIcon />
        <span>New Project</span>
      </Link>
    </section>
  );
}
