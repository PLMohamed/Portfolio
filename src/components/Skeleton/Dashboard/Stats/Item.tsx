import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonStatsItem() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="font-medium">
          <Skeleton className="h-4 w-24 max-w-full" />
        </CardTitle>
        <Skeleton className="size-5 rounded-full" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-6 w-8 text-2xl font-bold" />
        <Skeleton className="h-4 w-24 max-w-full" />
      </CardContent>
    </Card>
  );
}
