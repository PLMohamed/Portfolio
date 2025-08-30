import { ActionGetProjectsStats } from "@/lib/server/actions/stats";
import StatsItem from "./Item";
import { FolderOpenIcon } from "lucide-react";

export default async function StatsProject() {
  const { data } = await ActionGetProjectsStats();

  const { projectsThisMonth, totalProjects } = data || {
    projectsThisMonth: 0,
    totalProjects: 0,
  };

  return (
    <StatsItem
      title="Total Projects"
      value={totalProjects}
      description={`+${projectsThisMonth} this month`}
      icon={FolderOpenIcon}
    />
  );
}
