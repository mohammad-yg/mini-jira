import type { ResultPromise } from "@/utils/result";
import type { ProjectList } from "./project.type";

export type ProjectsListQuery = () => ResultPromise<
  ProjectList[]
>;
