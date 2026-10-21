"use client";

import { create } from "zustand";

import type { GetProjectTasksQuery } from "@/modules/projects/types";
import {
  DashboardStore,
  DashboardStoreSeeds,
  DashboardStoreState,
} from "../types/dashboard-store.type";

type DashboardUseCases = {
  getProjectTasksQuery: GetProjectTasksQuery;
};

export const createDashboardStore = (
  seed: DashboardStoreSeeds,
  useCases: DashboardUseCases,
): DashboardStore => {
  return create<DashboardStoreState>((set, get) => ({
    projects: seed.projectsList,
    selectedProject: seed.selectedProject,
    selectedProjectTasks: seed.selectedProjectTasks,
    isLoadingSelectedProjectTasks: false,

    handleSelectProject: async (projectId) => {
      const nextProject = get().projects.find((_) => _.id === projectId);

      if (!nextProject) throw new Error("Selected project not found");

      set({
        selectedProject: nextProject,
        selectedProjectTasks: [],
        isLoadingSelectedProjectTasks: nextProject !== null,
      });

      if (!nextProject) return;

      try {
        const result = await useCases.getProjectTasksQuery(nextProject.id);

        if (!result.success) {
        } else {
          set({ selectedProjectTasks: result.data });
        }
      } finally {
        set({ isLoadingSelectedProjectTasks: false });
      }
    },
  }));
};
