import ProjectForm from "@/components/Project/Form";
import { withAuthPage } from "@/lib/server/wrappers";

async function NewProjectsPage() {
  return (
    <article className="space-y-4 px-4">
      <section>
        <h1 className="text-2xl font-bold md:text-3xl">Create New Project</h1>
        <p className="text-muted-foreground max-md:text-sm">
          Create a new project by filling out the form below.
        </p>
      </section>
      <ProjectForm />
    </article>
  );
}

export default withAuthPage(NewProjectsPage);
