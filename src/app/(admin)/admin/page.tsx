import { withAuthPage } from "@/lib/server/wrappers";
import { Fragment } from "react";

function Page() {
  return <Fragment />;
}

export default withAuthPage(Page);
