"use client";

import useSWR from "swr";
import type { ProjectGetListQuery, ProjectList } from "../types";

type Dependencies = {
  projectGetListQuery: ProjectGetListQuery;
};

const createFetchProjectList = (
  deps: Dependencies,
): (() => Promise<ProjectList>) => {
  const { projectGetListQuery } = deps;
  return async () => {
    const result = await projectGetListQuery();

    if (!result.success) {
      throw new Error(
        result.error.message ??
          `Could not load projects (${result.error.code})`,
      );
    }

    return result.data;
  };
};

const PROJECT_LIST_KEY = "/api/bff/projects";

export const useProjectList = (initialValue: ProjectList, deps: Dependencies) =>
  useSWR<ProjectList, Error>(PROJECT_LIST_KEY, createFetchProjectList(deps), {
    fallbackData: initialValue,
  });
