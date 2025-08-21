import FormsContainer from "@/components/Forms/Table/Container";
import { withAuthPage } from "@/lib/server/wrappers";
import { Fragment } from "react";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function FormsPage(props: PageProps) {
  const searchParams = await props.searchParams;

  return (
    <Fragment>
      <FormsContainer searchParams={searchParams} />
    </Fragment>
  );
}

export default withAuthPage(FormsPage);
