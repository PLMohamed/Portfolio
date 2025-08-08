import { cache } from "react";
import { projects } from "./data";

export const GetProjects = cache(() => {
  return projects;
});
