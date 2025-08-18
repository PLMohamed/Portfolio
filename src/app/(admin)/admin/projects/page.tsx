import ProjectsContainer from "@/components/Projects/Table/Container";
import { withAuthPage } from "@/lib/server/wrappers";
import { Fragment } from "react";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function ProjectsPage(props: PageProps) {
  const searchParams = await props.searchParams;

  return (
    <Fragment>
      <ProjectsContainer searchParams={searchParams} />
    </Fragment>
  );
}

export default withAuthPage(ProjectsPage);
