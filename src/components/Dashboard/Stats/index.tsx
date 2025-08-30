import { Suspense } from "react";
import StatsForms from "./Forms";
import StatsProject from "./Projects";
import StatsVisitor from "./Visitor";
import SkeletonStatsContainer from "@/components/Skeleton/Dashboard/Stats/Container";
import SkeletonStatsItem from "@/components/Skeleton/Dashboard/Stats/Item";

export default function StatsCard() {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<SkeletonStatsContainer length={2} />}>
        <StatsForms />
      </Suspense>
      <Suspense fallback={<SkeletonStatsItem />}>
        <StatsProject />
      </Suspense>
      <Suspense fallback={<SkeletonStatsItem />}>
        <StatsVisitor />
      </Suspense>
    </section>
  );
}
