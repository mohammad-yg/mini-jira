import { successResult } from "@/utils/result"
import { GetProjectTasksQuery } from "../types/project-query.type"
import { TaskListItem, TaskPriority, TaskStatus } from "@/modules/tasks/types"

export const createGetProjectTasksQuery = (): GetProjectTasksQuery => {
    return async (taskId) =>
        successResult<TaskListItem[], string>([
            {
                id: '1',
                title: "Implement authentication",
                status: TaskStatus.TODO,
                priority: TaskPriority.HIGH,
            },
            {
                id: '2',
                title: "Set up project board",
                status: TaskStatus.IN_PROGRESS,
                priority: TaskPriority.MEDIUM,
            },
            {
                id: '3',
                title: "Fix bugs in dashboard",
                status: TaskStatus.DONE,
                priority: TaskPriority.LOW,
            },
            {
                id: '4',
                title: "Design new UI components",
                status: TaskStatus.IN_PROGRESS,
                priority: TaskPriority.HIGH,
            },
            {
                id: '5',
                title: "Write unit tests for API",
                status: TaskStatus.TODO,
                priority: TaskPriority.MEDIUM,
            },
            {
                id: '6',
                title: "Update project documentation",
                status: TaskStatus.DONE,
                priority: TaskPriority.LOW,
            },
            {
                id: '7',
                title: "Integrate third-party login",
                status: TaskStatus.TODO,
                priority: TaskPriority.HIGH,
            },
            {
                id: '8',
                title: "Optimize build pipeline",
                status: TaskStatus.IN_PROGRESS,
                priority: TaskPriority.MEDIUM,
            },
            {
                id: '9',
                title: "Review pull requests",
                status: TaskStatus.TODO,
                priority: TaskPriority.LOW,
            }
        ]);

}