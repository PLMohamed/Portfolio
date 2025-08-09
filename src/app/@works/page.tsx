import { GetProjects } from "@/lib/projects/utils";
import WorksContainer from "./components/Container";

export default function Projects() {
  const projects = GetProjects();

  return <WorksContainer projects={projects} />;
}
