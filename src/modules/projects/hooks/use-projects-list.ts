"use client";

import useSWR from "swr";
import { GET_PROJECTS_LIST_KEY } from "../queries";
import { ProjectListItem } from "../types";
import { clientProjectsRegistry } from "../client/projects-registry.client";

export const useProjectsList = () => {
  const fetcher = async () => {
    const query = clientProjectsRegistry.getProjectsListQuery;

    const result = await query();

    if (result.success)
      return result.data

    throw result.error
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<ProjectListItem[], Error>(GET_PROJECTS_LIST_KEY, fetcher, {});

  return {
    data, error, isLoading, isValidating, mutate
  }
}
