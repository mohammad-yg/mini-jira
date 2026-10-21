import { ResultPromise } from "@/utils/result";
import { ProjectListItem } from "./project.type";
import { TaskId, TaskListItem } from "@/modules/tasks/types";

export type GetProjectsListQuery = () => ResultPromise<ProjectListItem[]>

export type GetProjectTasksQuery = (id: TaskId) => ResultPromise<TaskListItem[]>