import { IssueId } from "./issue.type";
import { TaskId, TaskStatus } from "./task.type";

export type EpicId = string;

export interface Epic {
    id: EpicId;
    name: string;
    description?: string;
    status?: TaskStatus;

    issueIds?: IssueId[];
    taskIds?: TaskId[];
}