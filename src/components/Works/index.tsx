import { ActionGetPublicProjects } from "@/lib/server/actions/projects";
import WorksContainer from "./Container";

export default async function Projects() {
  const { data: projects } = await ActionGetPublicProjects({
    page: 1,
    limit: 10,
  });

  return <WorksContainer projects={projects?.data ?? []} />;
}
