import { failedResult, successResult } from "@/utils/result";
import type { ProjectGetListRequest } from "../types";
import { ProjectsListQuery } from "../types/project-query.type";

type Dependencies = {
  getProjectListRequest: ProjectGetListRequest;
};

export const createProjectGetListQuery =
  ({ getProjectListRequest }: Dependencies): ProjectsListQuery =>
    async () => {
      const response = await getProjectListRequest();

      if (response.statusCode === 401)
        return failedResult({ code: "unauthorized" });

      if (response.statusCode === 403) return failedResult({ code: "forbidden" });

      if (!response.ok || response.data === null)
        return failedResult({ code: "unknown" });

      return successResult(response.data);
    };
