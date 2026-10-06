import { failedResult, successResult } from "@/shared/result";
import type { ProjectGetListQuery, ProjectGetListRequest } from "../types";

type Dependencies = {
  getProjectListRequest: ProjectGetListRequest;
};

export const createProjectGetListQuery =
  ({ getProjectListRequest }: Dependencies): ProjectGetListQuery =>
  async () => {
    const response = await getProjectListRequest();

    if (response.statusCode === 401)
      return failedResult({ code: "unauthorized" });

    if (response.statusCode === 403) return failedResult({ code: "forbidden" });

    if (!response.ok || response.data === null)
      return failedResult({ code: "unknown" });

    return successResult(response.data);
  };
