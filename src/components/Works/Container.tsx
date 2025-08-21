"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ProjectCard from "./Card";
import { useInfiniteGetProjects } from "@/hooks/api/useProjects";
import { ActionGetPublicProjects } from "@/lib/server/actions/projects";
import { ActionResponseError } from "@/lib/server/actions";
import ProjectCardLoading from "./CardLoading";
import FadeIn from "../Animations/FadeIn";

interface ContainerProps {
  projects: Exclude<
    Awaited<ReturnType<typeof ActionGetPublicProjects>>,
    ActionResponseError
  >["data"]["data"];
}

export default function WorksContainer({
  projects: initialProject,
}: ContainerProps) {
  const [parts, setParts] = useState<number>(1);

  const observer = useRef<IntersectionObserver | null>(null);

  const { fetchNextPage, hasNextPage, isFetching, data } =
    useInfiniteGetProjects({
      initialPageParam: 2,
      enabled: false,
    });

  const allProjects = useMemo(() => {
    const newProjects = data?.pages?.flatMap((page) => page.data ?? []) ?? [];
    return [...initialProject, ...newProjects];
  }, [initialProject, data]);

  const projectsParPart = useMemo(
    () => Math.floor(allProjects.length / parts),
    [allProjects.length, parts],
  );
  const remainder = useMemo(
    () => allProjects.length % parts,
    [allProjects.length, parts],
  );

  const projectsParts = useMemo(() => {
    const partsArray = Array.from({ length: parts }, (_, index) => {
      const start = index * projectsParPart + Math.min(index, remainder);
      const end =
        (index + 1) * projectsParPart + Math.min(index + 1, remainder);
      return allProjects.slice(start, end);
    });
    return partsArray;
  }, [parts, allProjects, projectsParPart, remainder]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            void fetchNextPage();
          }
        },
        {
          threshold: 1.0,
          rootMargin: "0px 0px 50px 0px",
        },
      );

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

  useEffect(() => {
    function handleResize() {
      const newWidth = window.innerWidth;

      switch (true) {
        case newWidth <= 768:
          setParts(1);
          break;
        case newWidth < 1024:
          setParts(2);
          break;
        case newWidth >= 1024:
        default:
          setParts(3);
          break;
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <article
      className="container grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      id="projects"
    >
      {projectsParts.map((part, index) => (
        <section key={index} className="flex flex-col gap-5">
          {part.map((project) => (
            <Suspense key={project.id} fallback={<ProjectCardLoading />}>
              <ProjectCard {...project} />
            </Suspense>
          ))}
        </section>
      ))}
      <div ref={sentinelRef} className="h-12" />
      {isFetching &&
        Array.from({ length: parts }).map((_, index) => (
          <section key={index} className="flex flex-col gap-5">
            {Array.from({ length: 2 }).map((_, cardIndex) => (
              <FadeIn
                classNameInView="opacity-100 translate-y-0"
                classNameNotInView="opacity-0 translate-y-10"
                className="transition-all duration-300"
                key={cardIndex}
              >
                <ProjectCardLoading />
              </FadeIn>
            ))}
          </section>
        ))}
    </article>
  );
}
