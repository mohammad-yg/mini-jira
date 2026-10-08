import type { ResultPromise } from "@/utils/result";
import type { ProjectList } from "./project-types";

export type ProjectGetListQuery = () => ResultPromise<
  ProjectList,
  "unauthorized" | "forbidden" | "unknown"
>;
