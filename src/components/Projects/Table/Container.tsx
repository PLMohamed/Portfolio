import { ActionGetProjects } from "@/lib/server/actions/projects/read";
import { validateSchema } from "@/lib/server/services";
import { projectFilterValidator } from "@/lib/validators/project";
import z from "zod";
import ProjectsTable from "./Table";

interface ContainerProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const projectSchema = z.tuple([projectFilterValidator]);

export default async function ProjectsContainer({
  searchParams,
}: ContainerProps) {
  const [validatedFilters] = validateSchema(projectSchema, [searchParams]);
  console.log("Validated Filters:", validatedFilters);
  const { data: projects } = await ActionGetProjects(validatedFilters);

  return (
    <section className="px-4">
      <ProjectsTable data={projects?.data ?? []} />
    </section>
  );
}
