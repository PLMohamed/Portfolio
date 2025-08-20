import ProjectForm from "@/components/Project/Form";
import { ActionGetProjectById } from "@/lib/server/actions/projects";
import { withAuthPage } from "@/lib/server/wrappers";
import { redirect } from "next/navigation";

interface EditProjectsPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

async function EditProjectsPage({ params }: EditProjectsPageProps) {
  const { projectId } = await params;

  const { data: project, error } = await ActionGetProjectById(projectId);

  if (error) {
    redirect("/admin/projects?error=" + error.message);
  }

  return (
    <article className="space-y-4 px-4 md:space-y-6 lg:space-y-8">
      <section>
        <h1 className="text-2xl font-bold md:text-3xl">
          Edit Project : {project.title}
        </h1>
        <p className="text-muted-foreground max-md:text-sm">
          Update the project details by filling out the form below.
        </p>
      </section>
      <ProjectForm project={project} />
    </article>
  );
}

export default withAuthPage(EditProjectsPage);
