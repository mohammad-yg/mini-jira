/** User shape stored by the mock server, including the private password field. */
export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
  avatarUrl?: string;
}

/** User payload returned by endpoints; passwords never leave the server. */
export type UserOutput = Omit<UserRecord, "password">;

export interface ProjectRecord {
  id: string;
  name: string;
  key: string;
  description?: string;
  imageUrl?: string;
  ownerId: string;
  memberIds: string[];
}

export interface RoleRecord {
  id: string;
  projectId: string;
  name: string;
  permissions: string[];
}

export interface ColumnRecord {
  id: string;
  projectId: string;
  name: string;
  statuses: string[];
  position: number;
  filters?: { assigneeId?: string; priorities?: string[]; labels?: string[] };
}

export interface SprintRecord {
  id: string;
  projectId: string;
  name: string;
  state: "planned" | "active" | "completed";
  goal?: string;
  startDate?: string;
  endDate?: string;
}

export interface IssueRecord {
  id: string;
  key: string;
  title: string;
  projectId: string;
  type: "bug" | "story" | "task";
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  labels: string[];
  description?: string;
  assigneeId?: string;
  reporterId?: string;
  epicId?: string;
}

export interface TaskRecord {
  id: string;
  title: string;
  projectId: string;
  issueId?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  labels: string[];
  columnId: string;
  assigneeId?: string;
  sprintId?: string;
  position: number;
  description?: string;
  dueDate?: string;
}

export interface CommentRecord {
  id: string;
  body: string;
  taskId: string;
  authorId: string;
  projectId: string;
}

export interface LabelRecord {
  id: string;
  projectId: string;
  name: string;
  color: string;
}

export interface BoardRecord {
  projectId: string;
  name?: string;
  description?: string;
  showCompleted?: boolean;
}

export interface MemberRoleRecord {
  projectId: string;
  userId: string;
  roleId: string;
}

/** Error body returned by all API error paths. */
export interface ApiErrorOutput {
  error: string;
}

/** Successful login and registration response body. */
export interface AuthOutput {
  accessToken: string;
  refreshToken: string;
  user: UserOutput;
}

/** Successful refresh response body. */
export interface RefreshOutput {
  accessToken: string;
  refreshToken: string;
}

/** TypeScript description of an HTTP response body and status. */
export interface ApiOutput<TBody> {
  statusCode: number;
  body: TBody;
}

export type ApiRouteDefinition = readonly [
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  description: string,
];

export type ApiOutputBody =
  | ApiErrorOutput
  | AuthOutput
  | RefreshOutput
  | UserOutput
  | UserOutput[]
  | ProjectRecord
  | ProjectRecord[]
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
  | BoardRecord
  | MemberRoleRecord
  | { updated: true; columnIds?: string[]; taskIds?: string[] }
  | null;
