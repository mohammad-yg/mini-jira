import type { StoreApi, UseBoundStore } from "zustand";

import type { Project, ProjectListItem } from "@/modules/projects/types";
import { Task, TaskListItem } from "@/modules/tasks/types";

export type DashboardStoreState = {
  projects: ProjectListItem[];
  selectedProject: ProjectListItem | null;
  selectedProjectTasks: Task[] | null;
  isLoadingSelectedProjectTasks: boolean;
  handleSelectProject: (projectId: ProjectListItem["id"]) => Promise<void>;
};

export type DashboardStore = UseBoundStore<StoreApi<DashboardStoreState>>;

export type DashboardStoreSeeds = {
  projectsList: ProjectListItem[];
  selectedProject: Project | null;
  selectedProjectTasks: TaskListItem[] | null;
};
