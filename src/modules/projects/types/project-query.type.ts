import type { ResultPromise } from "@/utils/result";
import type { ProjectListItem } from "./project.type";

export type ProjectsListQuery = () => ResultPromise<
  ProjectListItem[]
>;
