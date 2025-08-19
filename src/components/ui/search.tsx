"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { forwardRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./input";
import { SearchIcon } from "lucide-react";

interface SearchProps {
  placeholder?: string;
  searchKey?: string;
  className?: string;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    { placeholder = "Search...", searchKey = "q", className }: SearchProps,
    ref,
  ): React.JSX.Element => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearchChange = useDebouncedCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const q = event.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (q) params.set(searchKey, q);
        else params.set(searchKey, "");

        params.delete("page");

        replace(`?${params.toString()}`);
      },
      300,
    );

    return (
      <div className={cn("relative flex items-center", className)}>
        <Input
          ref={ref}
          type="text"
          name={searchKey}
          placeholder={placeholder}
          onChange={handleSearchChange}
          defaultValue={searchParams.get(searchKey) || ""}
          className="pe-8"
        />

        <SearchIcon className="text-muted-foreground absolute end-2 top-1/2 size-4 -translate-y-1/2" />
      </div>
    );
  },
);

Search.displayName = "Search";

export default Search;
