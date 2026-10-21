import { TaskId, TaskStatus, TaskPriority } from "./task.type";

export type IssueId = string;

export interface Issue {
  id: IssueId;
  title: string;
  status?: TaskStatus;
  priority: TaskPriority;
  description?: string;
  assigneeId?: string;
  createdAt?: number;
  updatedAt?: number;

  taskIds?: TaskId[];
}

export type IssueListItem = Pick<
  Issue,
  "id" | "title" | "status" | "priority" | "assigneeId"
>;
