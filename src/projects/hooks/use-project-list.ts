"use client";

import useSWR from "swr";
import { createProjectGetListQuery } from "@/projects/queries/get-project-list";
import { createProjectGetListRequest } from "@/projects/services/get-project-list-request";
import { projectsBffApiClient } from "@/projects/services/projects-bff-api-client";
import type { ProjectList } from "@/projects/types";

const getProjectList = createProjectGetListQuery({
  getProjectListRequest: createProjectGetListRequest({
    apiClient: projectsBffApiClient,
  }),
});

const fetchProjectList = async (): Promise<ProjectList> => {
  const result = await getProjectList();

  if (!result.success) {
    throw new Error(
      result.error.message ?? `Could not load projects (${result.error.code})`,
    );
  }

  return result.data;
};

const PROJECT_LIST_KEY = "/api/bff/projects";

export const useProjectList = (initialValue: ProjectList) =>
  useSWR<ProjectList, Error>(PROJECT_LIST_KEY, fetchProjectList, {
    fallbackData: initialValue,
  });
