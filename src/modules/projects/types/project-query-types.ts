import type { ResultPromise } from "@/shared/result";
import type { ProjectList } from "./project-types";

export type ProjectGetListQuery = () => ResultPromise<
  ProjectList,
  "unauthorized" | "forbidden" | "unknown"
>;
