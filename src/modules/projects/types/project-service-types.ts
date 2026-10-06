import type { ApiResponse } from "@/shared/services/types";
import type { ProjectList } from "./project-types";

export type ProjectGetListRequest = () => Promise<ApiResponse<ProjectList>>;
