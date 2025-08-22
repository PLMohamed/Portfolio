import { cn } from "@/lib/utils";
import ProjectCardLoading from "./CardLoading";

export default function WorksLoading() {
  return (
    <article className="container grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <section
          key={index}
          className={cn("flex flex-col gap-5", {
            "md:hidden lg:flex": index === 0,
          })}
        >
          {Array.from({ length: 3 }).map((_, cardIndex) => (
            <ProjectCardLoading key={cardIndex} />
          ))}
        </section>
      ))}
    </article>
  );
}
