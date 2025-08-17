import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export default function SkeletonNavUser() {
  return (
    <Fragment>
      <Skeleton className="h-8 w-8 rounded-lg grayscale" />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <Skeleton className="mb-1 h-4 w-24 max-w-full" />
        <Skeleton className="h-3 w-32 max-w-full" />
      </div>
      <Skeleton className="ms-auto size-4" />
    </Fragment>
  );
}
