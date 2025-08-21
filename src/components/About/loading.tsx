import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="container mb-10 grid grid-cols-1 gap-10 duration-400 lg:grid-cols-2 lg:gap-44">
      <div>
        <Skeleton className="mb-2 h-4 w-11/12" />
        <Skeleton className="mb-4 h-4 w-10/12" />
        <Skeleton className="mb-2 h-4 w-60" />
        <Skeleton className="mb-4 h-4 w-80" />
        <Skeleton className="mb-2 h-4 w-60" />
        <Skeleton className="mb-2 h-4 w-40" />
      </div>
      <Skeleton className="flex h-48 w-full items-center justify-center">
        <svg
          className="text-accent-foreground h-10 w-full"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </Skeleton>
    </div>
  );
}
