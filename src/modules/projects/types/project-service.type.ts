import type { ApiResponse } from "@/lib/api-client";
import type { ProjectList } from "./project.type";

export type ProjectGetListRequest = () => Promise<ApiResponse<ProjectList>>;
