"use client";

import { Project } from "@/lib/projects/data";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./Card";

interface ContainerProps {
  projects: Project[];
}

export default function WorksContainer({ projects }: ContainerProps) {
  const [parts, setParts] = useState<number>(1);

  const projectsParPart = useMemo(
    () => Math.floor(projects.length / parts),
    [projects.length, parts],
  );
  const remainder = useMemo(
    () => projects.length % parts,
    [projects.length, parts],
  );

  const projectsParts = useMemo(() => {
    const partsArray = Array.from({ length: parts }, (_, index) => {
      const start = index * projectsParPart + Math.min(index, remainder);
      const end =
        (index + 1) * projectsParPart + Math.min(index + 1, remainder);
      return projects.slice(start, end);
    });
    return partsArray;
  }, [parts, projects, projectsParPart, remainder]);

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
          {part.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </section>
      ))}
    </article>
  );
}
