import { IssueId } from "./issue.type";

export type TaskId = string;

export interface Task {
    id: TaskId,
    title: string,
    status: TaskStatus,
    priority: TaskPriority,
    issueId?: IssueId,
}

export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done"
}

export enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}

export type TaskListItem = Task;