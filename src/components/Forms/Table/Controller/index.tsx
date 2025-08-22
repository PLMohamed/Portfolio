"use client";

import { DataTableColumnsCustomize } from "@/components/ui/data-table/visibility";
import Search from "@/components/ui/search";

export default function FormTableController() {
  return (
    <section className="flex flex-wrap items-center justify-end gap-4">
      <Search className="min-w-3xs" />
      <DataTableColumnsCustomize />
    </section>
  );
}
