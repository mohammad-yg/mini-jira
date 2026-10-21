import { ApiResponse } from "@/lib/api-client";
import { ProjectListItem } from "./project.type";

export type GetProjectsListRequest = () => Promise<
  ApiResponse<ProjectListItem[]>
>;
