import type { ApiClient } from "@/lib/api-client";
import "server-only";
import { GetProjectsBff, ProjectListItem } from "../types/project.type";
import { failedResult, successResult } from "@/utils/result";

type Dependencies = {
  apiClient: ApiClient;
};

export const createGetProjectsBff = (deps: Dependencies): GetProjectsBff => {
  const { apiClient } = deps;

  return async () => {
    const response = await apiClient.get<ProjectListItem[]>("projects");

    if (!response.ok || !response.data) {
      return failedResult({ code: "unknown", message: "" });
    }

    return successResult(response.data);
  };
};
