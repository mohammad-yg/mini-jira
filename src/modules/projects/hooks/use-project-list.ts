"use client";

import useSWR from "swr";
import type { ProjectListItem } from "../types";
import { ProjectsListQuery } from "../types/project-query.type";
import { useCallback } from "react";

type Dependencies = {
  projectGetListQuery: ProjectsListQuery;
};

const PROJECT_LIST_KEY = "/api/bff/projects";

export const useProjectList = (initialValue: ProjectListItem[], deps: Dependencies) => {
  const { projectGetListQuery } = deps;


  const fetcher = useCallback(async () => {
    const result = await projectGetListQuery();

    if (!result.success) {
      throw new Error(
        result.error.message ??
        `Could not load projects (${result.error.code})`,
      );
    }

    return result.data;
  },
    [projectGetListQuery])

  return useSWR<ProjectListItem[], Error>(PROJECT_LIST_KEY, fetcher, {
    fallbackData: initialValue,
  });
}
