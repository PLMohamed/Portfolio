"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ProjectCardLoading() {
  const previewLinkExists = Math.random() > 0.5;
  const sourceLinkExists = Math.random() > 0.5;
  const downloadLinkExists = Math.random() > 0.5;
  const imageUrlExists = Math.random() > 0.3;

  const hasLinks = previewLinkExists || sourceLinkExists || downloadLinkExists;

  return (
    <Card
      className={cn({
        "pt-0": !!imageUrlExists,
      })}
    >
      {imageUrlExists && (
        <Skeleton className="flex h-48 w-full items-center justify-center rounded-t-xl">
          <svg
            className="text-accent-foreground mx-auto size-8 h-8 w-8 animate-pulse md:size-10 lg:size-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </Skeleton>
      )}
      <CardHeader className="gap-2">
        <CardTitle>
          <Skeleton className="h-5 w-40 max-w-full" />
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-1">
            {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map(
              (_, index) => (
                <Skeleton
                  key={index}
                  className="h-3 min-w-60"
                  style={{ width: `${Math.random() * 100}%` }}
                />
              ),
            )}
          </div>
        </CardDescription>
      </CardHeader>
      {hasLinks && (
        <CardFooter className="flex-col flex-wrap gap-4 sm:flex-row lg:flex-col xl:flex-row">
          {sourceLinkExists && (
            <Skeleton className="h-9 w-full sm:w-24 lg:w-full xl:w-24" />
          )}

          {previewLinkExists && (
            <Skeleton className="h-9 w-full sm:w-36 lg:w-full xl:w-36" />
          )}

          {downloadLinkExists && (
            <Skeleton className="h-9 w-full sm:w-24 lg:w-full xl:w-24" />
          )}
        </CardFooter>
      )}
    </Card>
  );
}
