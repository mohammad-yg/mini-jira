import type { ApiRouteDefinition } from "../types.js";
import type {
  ApiErrorOutput,
  ApiOutput,
  BoardRecord,
  ColumnRecord,
  CommentRecord,
  IssueRecord,
  LabelRecord,
  MemberRoleRecord,
  ProjectRecord,
  RoleRecord,
  SprintRecord,
  TaskRecord,
  UserOutput,
} from "../types.js";

export type ProjectsCaseOutput = ApiOutput<
  | ApiErrorOutput
  | ProjectRecord
  | ProjectRecord[]
  | (BoardRecord & { columns: ColumnRecord[] })
  | RoleRecord
  | RoleRecord[]
  | ColumnRecord
  | ColumnRecord[]
  | SprintRecord
  | SprintRecord[]
  | IssueRecord
  | IssueRecord[]
  | TaskRecord
  | TaskRecord[]
  | CommentRecord
  | CommentRecord[]
  | LabelRecord
  | LabelRecord[]
  | UserOutput
  | UserOutput[]
  | MemberRoleRecord
  | { updated: true; columnIds?: string[]; taskIds?: string[] }
  | null
>;

export const PROJECTS_ROUTES = [
  ["GET", "/projects", "List accessible projects"],
  ["POST", "/projects", "Create project"],
  ["GET", "/projects/:id", "Get project"],
  ["PATCH", "/projects/:id", "Update project"],
  ["DELETE", "/projects/:id", "Delete project"],
  ["GET", "/projects/:id/members", "List project members"],
  ["POST", "/projects/:id/members", "Add project member"],
  ["DELETE", "/projects/:id/members/:userId", "Remove project member"],
  ["GET", "/projects/:id/roles", "List roles"],
  ["POST", "/projects/:id/roles", "Create role"],
  ["PATCH", "/projects/:id/roles/:roleId", "Update role"],
  ["DELETE", "/projects/:id/roles/:roleId", "Delete role"],
  ["PATCH", "/projects/:id/members/:userId/role", "Change member role"],
  ["GET", "/projects/:id/board", "Get board"],
  ["PATCH", "/projects/:id/board", "Update board"],
  ["GET", "/projects/:id/board/columns", "List columns"],
  ["POST", "/projects/:id/board/columns", "Create column"],
  ["PATCH", "/projects/:id/board/columns/:columnId", "Update column"],
  ["DELETE", "/projects/:id/board/columns/:columnId", "Delete column"],
  ["PATCH", "/projects/:id/board/columns/reorder", "Reorder columns"],
  ["GET", "/projects/:id/sprints", "List sprints"],
  ["POST", "/projects/:id/sprints", "Create sprint"],
  ["GET", "/projects/:id/sprints/:sprintId", "Get sprint"],
  ["PATCH", "/projects/:id/sprints/:sprintId", "Update sprint"],
  ["DELETE", "/projects/:id/sprints/:sprintId", "Delete sprint"],
  ["POST", "/projects/:id/sprints/:sprintId/start", "Start sprint"],
  ["POST", "/projects/:id/sprints/:sprintId/complete", "Complete sprint"],
  ["GET", "/projects/:id/issues", "List issues"],
  ["POST", "/projects/:id/issues", "Create issue"],
  ["GET", "/projects/:id/issues/:issueId", "Get issue"],
  ["PATCH", "/projects/:id/issues/:issueId", "Update issue"],
  ["DELETE", "/projects/:id/issues/:issueId", "Delete issue"],
  ["GET", "/projects/:id/issues/:issueId/tasks", "List issue tasks"],
  ["POST", "/projects/:id/issues/:issueId/tasks", "Create task"],
  ["GET", "/projects/:id/tasks", "List project tasks"],
  ["GET", "/projects/:id/tasks/:taskId", "Get task"],
  ["PATCH", "/projects/:id/tasks/:taskId", "Update task"],
  ["DELETE", "/projects/:id/tasks/:taskId", "Delete task"],
  ["PATCH", "/projects/:id/tasks/:taskId/move", "Move task"],
  ["PATCH", "/projects/:id/tasks/reorder", "Reorder tasks"],
  ["GET", "/projects/:id/tasks/:taskId/comments", "List comments"],
  ["POST", "/projects/:id/tasks/:taskId/comments", "Create comment"],
  [
    "PATCH",
    "/projects/:id/tasks/:taskId/comments/:commentId",
    "Update comment",
  ],
  [
    "DELETE",
    "/projects/:id/tasks/:taskId/comments/:commentId",
    "Delete comment",
  ],
  ["GET", "/projects/:id/labels", "List labels"],
  ["POST", "/projects/:id/labels", "Create label"],
  ["PATCH", "/projects/:id/labels/:labelId", "Update label"],
  ["DELETE", "/projects/:id/labels/:labelId", "Delete label"],
] as const satisfies readonly ApiRouteDefinition[];
