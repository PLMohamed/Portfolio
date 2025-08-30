import StatsCard from "@/components/Dashboard/Stats";
import { withAuthPage } from "@/lib/server/wrappers";

function Page() {
  return (
    <article className="space-y-4 px-4 md:space-y-6 lg:space-y-8">
      <section>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="text-muted-foreground max-md:text-sm">
          Welcome back! Here&#39;s what&#39;s happening with your portfolio.
        </p>
      </section>
      <StatsCard />
    </article>
  );
}

export default withAuthPage(Page);
