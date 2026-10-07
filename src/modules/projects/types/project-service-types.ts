import type { ApiResponse } from "@/lib/api-client";
import type { ProjectList } from "./project-types";

export type ProjectGetListRequest = () => Promise<ApiResponse<ProjectList>>;
