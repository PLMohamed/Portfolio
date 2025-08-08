import Main from "@/components/main";
import Card from "./components/Card";
import { GetProjects } from "@/lib/projects/utils";

export default function Projects() {
  const projects = GetProjects();

  const projectsParPart = Math.floor(projects.length / 3);
  const remainder = projects.length % 3;

  const projectsParts = Array.from({ length: 3 }, (_, index) => {
    const start = index * projectsParPart + Math.min(index, remainder);
    const end = (index + 1) * projectsParPart + Math.min(index + 1, remainder);
    return projects.slice(start, end);
  });

  return (
    <Main
      classNameInView="grid grid-cols-1 md:grid-cols-3 gap-5 my-12 opacity-100 transition-all duration-500 ease-in-out translate-y-0"
      classNameNotInView="grid grid-cols-1 md:grid-cols-3 gap-5 my-12 opacity-0 translate-y-12 transition-all duration-500 ease-in-out"
      id="projects"
    >
      {projectsParts.map((project, index) => (
        <div key={index} className="flex flex-col gap-5">
          {project.map((project, index) => (
            <Card key={index} {...project} />
          ))}
        </div>
      ))}
    </Main>
  );
}
