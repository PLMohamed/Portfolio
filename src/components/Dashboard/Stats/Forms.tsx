import { Fragment } from "react";
import StatsItem from "./Item";
import { MailIcon, MessageSquareIcon } from "lucide-react";
import { ActionGetFormsStats } from "@/lib/server/actions/stats";

export default async function StatsForms() {
  const { data } = await ActionGetFormsStats();

  const { formsThisWeek, totalForms, unreadForms } = data || {
    formsThisWeek: 0,
    totalForms: 0,
    unreadForms: 0,
  };

  return (
    <Fragment>
      <StatsItem
        title="Total Forms"
        value={totalForms}
        description={`+${formsThisWeek} from last week`}
        icon={MessageSquareIcon}
      />

      <StatsItem
        title="Unread Forms"
        value={unreadForms}
        description="Requires attention"
        icon={MailIcon}
      />
    </Fragment>
  );
}
