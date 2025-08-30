import { Fragment } from "react";
import SkeletonStatsItem from "./Item";

export default function SkeletonStatsContainer({ length }: { length: number }) {
  return (
    <Fragment>
      {Array.from({ length }).map((_, index) => (
        <SkeletonStatsItem key={index} />
      ))}
    </Fragment>
  );
}
