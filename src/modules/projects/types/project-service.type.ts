import type { ApiResponse } from "@/lib/api-client";
import type { ProjectListItem } from "./project.type";

export type ProjectGetListRequest = () => Promise<ApiResponse<ProjectListItem[]>>;
