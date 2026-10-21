import { ProjectListItem } from "@/modules/projects/types";
import { Result } from "@/utils/result";

export type SelectInitialProject = (
  projects: ProjectListItem[],
) => Result<ProjectListItem>;
