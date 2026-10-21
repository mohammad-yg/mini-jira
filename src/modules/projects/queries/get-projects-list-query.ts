import { failedResult, successResult } from "@/utils/result";
import { GetProjectsListQuery } from "../types/project-query.type";
import { GetProjectsListRequest } from "../types";

interface Dependencies {
  getProjectsListRequest: GetProjectsListRequest;
}

export const GET_PROJECTS_LIST_KEY = "/projects";

export const createGetProjectsListQuery = (
  deps: Dependencies,
): GetProjectsListQuery => {
  const { getProjectsListRequest } = deps;
  return async () => {
    const response = await getProjectsListRequest();

    if (!response.ok || !response.data)
      return failedResult({
        code: response.error?.code || "unknown",
        message: response.error?.message,
      });

    return successResult(response.data);
  };
};
