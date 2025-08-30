import { EyeIcon } from "lucide-react";
import StatsItem from "./Item";

export default async function StatsVisitor() {
  return (
    <StatsItem
      title="Portfolio Views"
      value="N/A"
      description={`+0% from last month`}
      icon={EyeIcon}
    />
  );
}
