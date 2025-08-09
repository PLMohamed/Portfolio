import { cache } from "react";
import { techs, tools } from "./data";

export const GetTechs = cache(() => {
  return techs;
});

export const GetTools = cache(() => {
  return tools;
});
