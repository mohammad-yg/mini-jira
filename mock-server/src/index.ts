import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { pgTable, text, jsonb } from "drizzle-orm/pg-core";
import Fastify, {
  type FastifyInstance,
  type FastifyRequest,
  type HTTPMethods,
} from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import type {
  BoardRecord,
  ClientLogEntry,
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
  UserRecord,
} from "./types.type.js";
import { AUTH_ROUTES } from "./cases/auth.js";
import { LOGS_ROUTES } from "./cases/logs.js";
import { PROJECTS_ROUTES } from "./cases/projects.js";
import { USERS_ROUTES } from "./cases/users.js";

export const records = pgTable("records", {
  id: text("id").primaryKey(),
  kind: text("kind").notNull(),
  data: jsonb("data").notNull(),
});
export const dbClient = new PGlite();
export const db = drizzle(dbClient, { schema: { records } });
export const users: UserRecord[] = [
  {
    id: "user-admin",
    name: "Ava Admin",
    email: "admin@mini-jira.local",
    password: "password123",
    role: "admin",
  },
  {
    id: "user-1",
    name: "Sam Product",
    email: "sam@mini-jira.local",
    password: "password123",
    role: "member",
  },
  {
    id: "user-2",
    name: "Lee Engineer",
    email: "lee@mini-jira.local",
    password: "password123",
    role: "member",
  },
];
export const projects: ProjectRecord[] = [
  {
    id: "project-1",
    name: "Mini Jira",
    key: "MJ",
    description: "Demo project",
    ownerId: "user-admin",
    memberIds: ["user-admin", "user-1", "user-2"],
  },
];
export const roles: RoleRecord[] = [
  {
    id: "role-admin",
    projectId: "project-1",
    name: "Admin",
    permissions: ["*"],
  },
  {
    id: "role-member",
    projectId: "project-1",
    name: "Member",
    permissions: ["issues:read", "issues:write"],
  },
];
export const columns: ColumnRecord[] = [
  {
    id: "col-todo",
    projectId: "project-1",
    name: "To Do",
    statuses: ["todo"],
    position: 0,
  },
  {
    id: "col-doing",
    projectId: "project-1",
    name: "In Progress",
    statuses: ["in-progress"],
    position: 1,
  },
  {
    id: "col-done",
    projectId: "project-1",
    name: "Done",
    statuses: ["done"],
    position: 2,
  },
];
export const sprints: SprintRecord[] = [
  { id: "sprint-1", name: "Sprint 1", state: "active", projectId: "project-1" },
];
export const issues: IssueRecord[] = [
  {
    id: "issue-1",
    key: "MJ-1",
    title: "Welcome issue",
    projectId: "project-1",
    type: "task",
    status: "todo",
    priority: "medium",
    labels: [],
  },
];
export const tasks: TaskRecord[] = [
  {
    id: "task-1",
    title: "Review the board",
    status: "todo",
    priority: "medium",
    labels: [],
    columnId: "col-todo",
    projectId: "project-1",
    issueId: "issue-1",
    assigneeId: "user-1",
    sprintId: "sprint-1",
    position: 0,
  },
];
export const comments: CommentRecord[] = [
  {
    id: "comment-1",
    body: "Welcome!",
    taskId: "task-1",
    authorId: "user-admin",
    projectId: "project-1",
  },
];
export const labels: LabelRecord[] = [
  { id: "label-1", projectId: "project-1", name: "frontend", color: "#6366f1" },
];
export const API = [
  ...AUTH_ROUTES,
  ...LOGS_ROUTES,
  ...USERS_ROUTES,
  ...PROJECTS_ROUTES,
] as const;

type JsonObject = Record<string, unknown>;
type JsonSchema = JsonObject;
type ResourceRecord =
  | UserRecord
  | ProjectRecord
  | RoleRecord
  | ColumnRecord
  | SprintRecord
  | IssueRecord
  | TaskRecord
  | CommentRecord
  | LabelRecord;

type AuthenticatedRequest = FastifyRequest & {
  userId?: string;
  sid?: string;
};

const asJsonObject = (value: unknown): JsonObject =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};
const stringValue = (object: JsonObject, key: string): string => {
  const value = object[key];
  return typeof value === "string" ? value : "";
};
const fieldValue = (object: object, key: string): unknown =>
  (object as Record<string, unknown>)[key];

const textField = (
  description: string,
  extra: JsonSchema = {},
): JsonSchema => ({ type: "string", description, ...extra });
const idField = (description: string): JsonSchema =>
  textField(description, { minLength: 1 });
const enumField = (description: string, values: string[]): JsonSchema => ({
  type: "string",
  enum: values,
  description,
});
const stringArray = (description: string): JsonSchema => ({
  type: "array",
  items: { type: "string", minLength: 1 },
  uniqueItems: true,
  description,
});
const body = (
  properties: Record<string, JsonSchema>,
  required: string[] = [],
  example?: Record<string, unknown>,
): JsonSchema => ({
  type: "object",
  properties,
  required,
  additionalProperties: false,
  ...(required.length ? {} : { minProperties: 1 }),
  ...(example ? { examples: [example] } : {}),
});
const stateValues = ["todo", "in-progress", "done"];
const priorityValues = ["low", "medium", "high", "urgent"];
const issueTypeValues = ["bug", "story", "task"];

const bodySchemas: Record<string, JsonSchema> = {
  "POST /logs": body(
    {
      logs: {
        type: "array",
        minItems: 1,
        maxItems: 100,
        items: {
          type: "object",
          properties: {
            app: textField("Application name", { maxLength: 120 }),
            level: enumField("Client log severity", [
              "debug",
              "info",
              "warn",
              "error",
            ]),
            timestamp: textField("ISO 8601 time when the log was created", {
              format: "date-time",
            }),
            values: { type: "array", items: {} },
          },
          required: ["app", "level", "timestamp", "values"],
          additionalProperties: false,
        },
      },
    },
    ["logs"],
  ),
  "POST /auth/register": body(
    {
      name: textField("Display name", { minLength: 2, maxLength: 80 }),
      email: textField("Account email", { pattern: "^\\S+@\\S+\\.\\S+$" }),
      password: textField("Password (8 characters minimum)", { minLength: 8 }),
    },
    ["name", "email", "password"],
    { name: "Alex Morgan", email: "alex@example.com", password: "password123" },
  ),
  "POST /auth/login": body(
    {
      email: textField("Registered account email", {
        pattern: "^\\S+@\\S+\\.\\S+$",
      }),
      password: textField("Account password", { minLength: 1 }),
    },
    ["email", "password"],
    { email: "admin@mini-jira.local", password: "password123" },
  ),
  "POST /auth/refresh": body(
    {
      refreshToken: textField(
        "Refresh token returned by login or registration",
        { minLength: 1 },
      ),
    },
    ["refreshToken"],
    { refreshToken: "<refresh-token>" },
  ),
  "POST /projects": body(
    {
      name: textField("Project display name", { minLength: 1, maxLength: 100 }),
      key: textField("Unique project key", { pattern: "^[A-Z][A-Z0-9]{1,9}$" }),
      description: textField("Project description", { maxLength: 2000 }),
      imageUrl: textField("Project image URL", { format: "uri" }),
    },
    ["name", "key"],
    {
      name: "Website redesign",
      key: "WEB",
      description: "Plan the next website release",
    },
  ),
  "PATCH /projects/:id": body({
    name: textField("Project display name", { minLength: 1, maxLength: 100 }),
    key: textField("Unique project key", { pattern: "^[A-Z][A-Z0-9]{1,9}$" }),
    description: textField("Project description", { maxLength: 2000 }),
    imageUrl: textField("Project image URL", { format: "uri" }),
  }),
  "POST /projects/:id/members": body(
    { userId: idField("ID of an existing user") },
    ["userId"],
    { userId: "user-1" },
  ),
  "POST /projects/:id/roles": body(
    {
      name: textField("Role name", { minLength: 1, maxLength: 60 }),
      permissions: stringArray("Permission keys granted to the role"),
    },
    ["name", "permissions"],
    {
      name: "Developer",
      permissions: ["issue:view", "issue:create", "issue:edit", "task:move"],
    },
  ),
  "PATCH /projects/:id/roles/:roleId": body({
    name: textField("Role name", { minLength: 1, maxLength: 60 }),
    permissions: stringArray("Replacement permission list"),
  }),
  "PATCH /projects/:id/members/:userId/role": body(
    { roleId: idField("ID of a role defined in this project") },
    ["roleId"],
    { roleId: "role-member" },
  ),
  "PATCH /projects/:id/board": body(
    {
      name: textField("Board name", { minLength: 1, maxLength: 100 }),
      description: textField("Board description", { maxLength: 1000 }),
      showCompleted: {
        type: "boolean",
        description: "Whether completed tasks appear on the board",
      },
    },
    [],
    { name: "Delivery board", showCompleted: true },
  ),
  "POST /projects/:id/board/columns": body(
    {
      name: textField("Column name", { minLength: 1, maxLength: 60 }),
      position: {
        type: "integer",
        minimum: 0,
        description: "Zero-based board position",
      },
      statuses: {
        ...stringArray("Task statuses shown in this column"),
        items: { type: "string", enum: stateValues },
      },
      filters: {
        type: "object",
        description: "Optional task filter conditions",
        properties: {
          assigneeId: idField("Filter by assignee"),
          priorities: {
            type: "array",
            items: { type: "string", enum: priorityValues },
          },
          labels: stringArray("Match any of these labels"),
        },
        additionalProperties: false,
      },
    },
    ["name"],
    { name: "Review", position: 1, statuses: ["in-progress"] },
  ),
  "PATCH /projects/:id/board/columns/:columnId": body({
    name: textField("Column name", { minLength: 1, maxLength: 60 }),
    position: {
      type: "integer",
      minimum: 0,
      description: "Zero-based board position",
    },
    statuses: {
      ...stringArray("Task statuses shown in this column"),
      items: { type: "string", enum: stateValues },
    },
    filters: {
      type: "object",
      description: "Task filter conditions",
      properties: {
        assigneeId: idField("Filter by assignee"),
        priorities: {
          type: "array",
          items: { type: "string", enum: priorityValues },
        },
        labels: stringArray("Match any of these labels"),
      },
      additionalProperties: false,
    },
  }),
  "PATCH /projects/:id/board/columns/reorder": body(
    {
      columnIds: {
        ...stringArray("All column IDs in their new order"),
        minItems: 1,
      },
    },
    ["columnIds"],
    { columnIds: ["col-todo", "col-doing", "col-done"] },
  ),
  "POST /projects/:id/sprints": body(
    {
      name: textField("Sprint name", { minLength: 1, maxLength: 100 }),
      goal: textField("Sprint goal", { maxLength: 1000 }),
      startDate: textField("Sprint start date", { format: "date-time" }),
      endDate: textField("Sprint end date", { format: "date-time" }),
    },
    ["name"],
    {
      name: "Sprint 2",
      goal: "Ship the new board",
      startDate: "2026-10-05T09:00:00.000Z",
      endDate: "2026-10-19T09:00:00.000Z",
    },
  ),
  "PATCH /projects/:id/sprints/:sprintId": body({
    name: textField("Sprint name", { minLength: 1, maxLength: 100 }),
    goal: textField("Sprint goal", { maxLength: 1000 }),
    startDate: textField("Sprint start date", { format: "date-time" }),
    endDate: textField("Sprint end date", { format: "date-time" }),
  }),
  "POST /projects/:id/issues": body(
    {
      title: textField("Issue title", { minLength: 1, maxLength: 200 }),
      description: textField("Issue description", { maxLength: 10000 }),
      type: enumField("Issue type", issueTypeValues),
      status: enumField("Workflow status", stateValues),
      priority: enumField("Issue priority", priorityValues),
      assigneeId: idField("Optional assignee user ID"),
      epicId: idField("Optional parent epic ID"),
      labels: stringArray("Labels applied to the issue"),
    },
    ["title"],
    {
      title: "Create account settings page",
      type: "story",
      status: "todo",
      priority: "medium",
      labels: ["frontend"],
    },
  ),
  "PATCH /projects/:id/issues/:issueId": body({
    title: textField("Issue title", { minLength: 1, maxLength: 200 }),
    description: textField("Issue description", { maxLength: 10000 }),
    type: enumField("Issue type", issueTypeValues),
    status: enumField("Workflow status", stateValues),
    priority: enumField("Issue priority", priorityValues),
    assigneeId: idField("Assignee user ID"),
    epicId: idField("Parent epic ID"),
    labels: stringArray("Replacement label list"),
  }),
  "POST /projects/:id/issues/:issueId/tasks": body(
    {
      title: textField("Task title", { minLength: 1, maxLength: 200 }),
      description: textField("Task description", { maxLength: 10000 }),
      status: enumField("Workflow status", stateValues),
      priority: enumField("Task priority", priorityValues),
      assigneeId: idField("Optional assignee user ID"),
      sprintId: idField("Optional sprint ID"),
      labels: stringArray("Labels applied to the task"),
      position: {
        type: "integer",
        minimum: 0,
        description: "Zero-based task position",
      },
      dueDate: textField("Due date", { format: "date-time" }),
    },
    ["title"],
    { title: "Implement the settings form", status: "todo", priority: "high" },
  ),
  "PATCH /projects/:id/tasks/:taskId": body({
    title: textField("Task title", { minLength: 1, maxLength: 200 }),
    description: textField("Task description", { maxLength: 10000 }),
    status: enumField("Workflow status", stateValues),
    priority: enumField("Task priority", priorityValues),
    assigneeId: idField("Assignee user ID"),
    sprintId: idField("Sprint ID"),
    labels: stringArray("Replacement label list"),
    position: {
      type: "integer",
      minimum: 0,
      description: "Zero-based task position",
    },
    dueDate: textField("Due date", { format: "date-time" }),
  }),
  "PATCH /projects/:id/tasks/:taskId/move": body(
    {
      status: enumField("New workflow status", stateValues),
      columnId: idField("Target board column ID"),
      position: {
        type: "integer",
        minimum: 0,
        description: "Zero-based position in the target column",
      },
      sprintId: idField("Target sprint ID"),
      label: textField("Label to apply"),
      labels: stringArray("Replacement label list"),
    },
    [],
    { status: "in-progress", columnId: "col-doing", position: 0 },
  ),
  "PATCH /projects/:id/tasks/reorder": body(
    {
      columnId: idField("Column whose tasks are being reordered"),
      taskIds: {
        ...stringArray("All task IDs in their new order"),
        minItems: 1,
      },
    },
    ["columnId", "taskIds"],
    { columnId: "col-todo", taskIds: ["task-1", "task-2"] },
  ),
  "POST /projects/:id/tasks/:taskId/comments": body(
    { body: textField("Comment text", { minLength: 1, maxLength: 5000 }) },
    ["body"],
    { body: "The first version is ready for review." },
  ),
  "PATCH /projects/:id/tasks/:taskId/comments/:commentId": body(
    {
      body: textField("Updated comment text", {
        minLength: 1,
        maxLength: 5000,
      }),
    },
    ["body"],
    { body: "Updated comment text." },
  ),
  "POST /projects/:id/labels": body(
    {
      name: textField("Label name", { minLength: 1, maxLength: 50 }),
      color: textField("Hex color", { pattern: "^#[0-9A-Fa-f]{6}$" }),
    },
    ["name", "color"],
    { name: "frontend", color: "#6366f1" },
  ),
  "PATCH /projects/:id/labels/:labelId": body({
    name: textField("Label name", { minLength: 1, maxLength: 50 }),
    color: textField("Hex color", { pattern: "^#[0-9A-Fa-f]{6}$" }),
  }),
  "PATCH /users/:id": body({
    name: textField("Display name", { minLength: 2, maxLength: 80 }),
    email: textField("Account email", { pattern: "^\\S+@\\S+\\.\\S+$" }),
    avatarUrl: textField("Avatar URL", { format: "uri" }),
  }),
};

const querySchemas: Record<string, JsonSchema> = {
  "/projects/:id/issues": {
    type: "object",
    additionalProperties: false,
    properties: {
      status: enumField("Filter by workflow status", stateValues),
      type: enumField("Filter by issue type", issueTypeValues),
      priority: enumField("Filter by priority", priorityValues),
      assigneeId: idField("Filter by assignee"),
      epicId: idField("Filter by epic"),
      search: textField("Search title and description"),
      page: {
        type: "integer",
        minimum: 1,
        default: 1,
        description: "Page number",
      },
      limit: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        default: 20,
        description: "Items per page",
      },
    },
  },
  "/projects/:id/tasks": {
    type: "object",
    additionalProperties: false,
    properties: {
      status: enumField("Filter by workflow status", stateValues),
      priority: enumField("Filter by priority", priorityValues),
      assigneeId: idField("Filter by assignee"),
      issueId: idField("Filter by issue"),
      sprintId: idField("Filter by sprint"),
      epicId: idField("Filter by epic"),
      label: textField("Filter by label"),
      search: textField("Search title and description"),
      page: {
        type: "integer",
        minimum: 1,
        default: 1,
        description: "Page number",
      },
      limit: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        default: 20,
        description: "Items per page",
      },
    },
  },
};

const parameterDescriptions: Record<string, string> = {
  id: "Project or user ID, depending on the route.",
  userId: "User ID of the project member.",
  roleId: "Project role ID.",
  columnId: "Board column ID.",
  sprintId: "Sprint ID.",
  issueId: "Issue ID.",
  taskId: "Task ID.",
  commentId: "Task comment ID.",
  labelId: "Project label ID.",
};

function routeSchema(method: string, path: string, description: string) {
  const names = [...path.matchAll(/:([A-Za-z0-9_]+)/g)].map(
    (match) => match[1],
  );
  const params = names.length
    ? {
        type: "object",
        required: names,
        additionalProperties: false,
        properties: Object.fromEntries(
          names.map((name) => [
            name,
            {
              type: "string",
              minLength: 1,
              description:
                parameterDescriptions[name] ?? `${name} path parameter.`,
            },
          ]),
        ),
      }
    : undefined;
  const requestBody = bodySchemas[`${method} ${path}`];
  const schema: Record<string, unknown> = {
    summary: description,
    description: requestBody
      ? "Request body fields are validated by the API. See the schema and example below."
      : description,
    tags: [
      path.split("/")[1] === "projects"
        ? "Projects"
        : path.split("/")[1].replace(/^./, (c) => c.toUpperCase()),
    ],
    security:
      path === "/logs" ||
      (path.startsWith("/auth/") &&
        ["register", "login", "refresh"].some((x) => path.endsWith(x)))
        ? []
        : [{ bearerAuth: [] }],
  };
  if (params) schema.params = params;
  if (requestBody) schema.body = requestBody;
  if (querySchemas[path]) schema.querystring = querySchemas[path];
  return schema;
}
const secret = process.env.JWT_SECRET ?? "mini-jira-dev-secret-change-me";
const collections: Record<string, ResourceRecord[]> = {
  users,
  projects,
  roles,
  columns,
  sprints,
  issues,
  tasks,
  comments,
  labels,
};
const boards: BoardRecord[] = [
  {
    projectId: "project-1",
    name: "Mini Jira board",
    description: "",
    showCompleted: true,
  },
];
const memberRoles: MemberRoleRecord[] = [];
const activeSessions = new Set<string>();
const clientLogs: ClientLogEntry[] = [];
const MAX_STORED_CLIENT_LOGS = 5_000;
const safeUser = (user: UserRecord | undefined): UserOutput | undefined => {
  if (!user) return user;
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => key !== "password"),
  ) as UserOutput;
};
const tokenPair = (id: string) => {
  const sid = randomUUID();
  activeSessions.add(sid);
  return {
    accessToken: jwt.sign({ sub: id, sid, type: "access" }, secret, {
      expiresIn: "1h",
    }),
    refreshToken: jwt.sign({ sub: id, sid, type: "refresh" }, secret, {
      expiresIn: "30d",
    }),
  };
};
function resourceFor(path: string): ResourceRecord[] {
  if (path === "/users" || path === "/users/:id") return users;
  if (path === "/projects" || path === "/projects/:id") return projects;
  if (path.includes("/members")) return users;
  if (path.includes("/roles")) return roles;
  if (path.includes("/board/columns")) return columns;
  if (path.includes("/sprints")) return sprints;
  if (path.includes("/issues")) return path.endsWith("/tasks") ? tasks : issues;
  if (path.includes("/comments")) return comments;
  if (path.includes("/labels")) return labels;
  if (path.includes("/tasks")) return tasks;
  return projects;
}
function itemId(path: string, p: Record<string, string>): string | undefined {
  if (path === "/users/:id" || path === "/projects/:id") return p.id;
  for (const key of [
    "userId",
    "roleId",
    "columnId",
    "sprintId",
    "issueId",
    "taskId",
    "commentId",
    "labelId",
  ]) {
    if (
      path.split("/").includes(`:${key}`) &&
      !path.endsWith("/tasks") &&
      !path.endsWith("/comments")
    )
      return p[key];
  }
  return undefined;
}
const projectOf = (id: string) => projects.find((project) => project.id === id);
const scoped = <T extends object>(rows: T[], projectId: string) =>
  rows.filter((row) => fieldValue(row, "projectId") === projectId);
const filterPage = <T extends object>(rows: T[], q: JsonObject) => {
  const filtered = rows.filter((row) =>
    Object.entries(q).every(([key, value]) => {
      if (!value || ["page", "limit"].includes(key)) return true;
      if (key === "search") {
        const title = fieldValue(row, "title");
        const description = fieldValue(row, "description");
        return `${title ?? ""} ${description ?? ""}`
          .toLowerCase()
          .includes(String(value).toLowerCase());
      }
      if (key === "label") {
        const labels = fieldValue(row, "labels");
        return Array.isArray(labels) && labels.includes(value);
      }
      return String(fieldValue(row, key) ?? "") === String(value);
    }),
  );
  const page = Number(q.page ?? 1),
    limit = Number(q.limit ?? 100);
  return filtered.slice((page - 1) * limit, page * limit);
};
export async function buildApp(): Promise<FastifyInstance> {
  await dbClient.exec(
    `CREATE TABLE IF NOT EXISTS records (id text primary key, kind text not null, data jsonb not null)`,
  );
  for (const [kind, rows] of Object.entries(collections))
    for (const row of rows)
      await db
        .insert(records)
        .values({ id: row.id, kind, data: row })
        .onConflictDoNothing();
  const app = Fastify({ logger: false });
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Mini Jira Mock API",
        version: "1.0.0",
        description: "Versioned in-memory REST API for Mini Jira",
      },
      servers: [{ url: "/api/v1" }],
      components: {
        securitySchemes: {
          bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        },
      },
    },
  });
  await app.register(swaggerUi, { routePrefix: "/docs" });
  app.addHook("onRequest", async (req, reply) => {
    if (
      req.url.startsWith("/docs") ||
      req.url.startsWith("/documentation") ||
      [
        "/api/v1/logs",
        "/api/v1/auth/login",
        "/api/v1/auth/register",
        "/api/v1/auth/refresh",
      ].includes(req.url.split("?")[0])
    )
      return;
    const h = req.headers.authorization;
    if (!h?.startsWith("Bearer "))
      return reply.code(401).send({ error: "Unauthorized" });
    try {
      const payload = jwt.verify(h.slice(7), secret) as jwt.JwtPayload;
      if (
        payload.type === "refresh" ||
        (payload.sid && !activeSessions.has(String(payload.sid)))
      )
        return reply
          .code(401)
          .send({ error: "Invalid or revoked access token" });
      if (!payload.sub)
        return reply.code(401).send({ error: "Invalid token subject" });
      const authenticatedRequest = req as AuthenticatedRequest;
      authenticatedRequest.userId = payload.sub;
      authenticatedRequest.sid =
        typeof payload.sid === "string" ? payload.sid : undefined;
    } catch {
      return reply.code(401).send({ error: "Invalid token" });
    }
  });
  app.get("/health", async () => ({ status: "ok" }));
  for (const [method, path, description] of API) {
    const url = "/api/v1" + path.replace(/:([A-Za-z0-9_]+)/g, ":$1");
    app.route({
      method: method as HTTPMethods,
      url,
      schema: routeSchema(method, path, description),
      handler: async (req, reply) => {
        const input = asJsonObject(req.body),
          p = req.params as Record<string, string>,
          q = asJsonObject(req.query),
          userId = (req as AuthenticatedRequest).userId ?? "";
        const project = projectOf(p.id);
        if (path === "/logs") {
          const incomingLogs = input.logs as ClientLogEntry[];
          clientLogs.push(...incomingLogs);
          if (clientLogs.length > MAX_STORED_CLIENT_LOGS)
            clientLogs.splice(0, clientLogs.length - MAX_STORED_CLIENT_LOGS);
          return reply.code(202).send({ accepted: incomingLogs.length });
        }
        if (path === "/auth/login" || path === "/auth/register") {
          let user = users.find((x) => x.email === input.email);
          if (path.endsWith("login")) {
            if (!user || user.password !== input.password)
              return reply.code(401).send({ error: "Invalid credentials" });
          } else {
            if (user)
              return reply
                .code(409)
                .send({ error: "Email already registered" });
            user = {
              id: randomUUID(),
              name: stringValue(input, "name"),
              email: stringValue(input, "email"),
              password: stringValue(input, "password"),
              role: "member",
            };
            users.push(user);
          }
          return reply
            .code(path.endsWith("register") ? 201 : 200)
            .send({ ...tokenPair(user.id), user: safeUser(user) });
        }
        if (path === "/auth/refresh") {
          try {
            const refreshToken = stringValue(input, "refreshToken");
            if (!refreshToken)
              return reply.code(401).send({ error: "Invalid refresh token" });
            const old = jwt.verify(refreshToken, secret) as jwt.JwtPayload;
            if (
              old.type !== "refresh" ||
              !old.sid ||
              !activeSessions.has(String(old.sid))
            )
              return reply.code(401).send({ error: "Invalid refresh token" });
            activeSessions.delete(String(old.sid));
            return tokenPair(String(old.sub));
          } catch {
            return reply.code(401).send({ error: "Invalid refresh token" });
          }
        }
        if (path === "/auth/logout") {
          const sid = (req as AuthenticatedRequest).sid;
          if (sid) activeSessions.delete(sid);
          return reply.code(204).send();
        }
        if (path === "/auth/me")
          return (
            safeUser(users.find((u) => u.id === userId)) ??
            reply.code(404).send({ error: "User not found" })
          );
        if (
          path === "/users" &&
          method === "GET" &&
          users.find((u) => u.id === userId)?.role !== "admin"
        )
          return reply.code(403).send({ error: "Admin required" });
        const coll = resourceFor(path),
          id = itemId(path, p);
        if (method === "GET") {
          if (path === "/users") return users.map(safeUser);
          if (path === "/projects")
            return projects.filter((x) => x.memberIds.includes(userId));
          if (path === "/projects/:id/board") {
            if (!project)
              return reply.code(404).send({ error: "Project not found" });
            return {
              ...(boards.find((x) => x.projectId === p.id) ?? {
                projectId: p.id,
              }),
              columns: scoped(columns, p.id),
            };
          }
          if (path.endsWith("/members"))
            return (
              project?.memberIds
                .map((mid: string) => safeUser(users.find((u) => u.id === mid)))
                .filter(Boolean) ??
              reply.code(404).send({ error: "Project not found" })
            );
          if (path.endsWith("/roles")) return scoped(roles, p.id);
          if (path.endsWith("/board/columns")) return scoped(columns, p.id);
          if (path.endsWith("/sprints")) return scoped(sprints, p.id);
          if (path === "/projects/:id/issues")
            return filterPage(scoped(issues, p.id), q);
          if (path === "/projects/:id/issues/:issueId/tasks")
            return tasks.filter(
              (row) => row.projectId === p.id && row.issueId === p.issueId,
            );
          if (path === "/projects/:id/tasks")
            return filterPage(scoped(tasks, p.id), q);
          if (path.endsWith("/comments"))
            return comments.filter((row) => row.taskId === p.taskId);
          if (path.endsWith("/labels")) return scoped(labels, p.id);
          if (id) {
            const item = coll.find(
              (x) =>
                x.id === id &&
                (!p.id ||
                  !fieldValue(x, "projectId") ||
                  fieldValue(x, "projectId") === p.id),
            );
            return item
              ? coll === users
                ? safeUser(item as UserRecord)
                : item
              : reply.code(404).send({ error: "Not found" });
          }
          return coll;
        }
        if (path.startsWith("/projects/") && !project)
          return reply.code(404).send({ error: "Project not found" });
        if (method === "POST") {
          if (path === "/projects") {
            if (projects.some((x) => x.key === input.key))
              return reply
                .code(409)
                .send({ error: "Project key already exists" });
            const item = {
              id: randomUUID(),
              ...input,
              ownerId: userId,
              memberIds: [userId],
            } as ProjectRecord;
            projects.push(item);
            return reply.code(201).send(item);
          }
          if (path.endsWith("/members")) {
            const user = users.find((x) => x.id === input.userId);
            if (!user) return reply.code(404).send({ error: "User not found" });
            if (!project!.memberIds.includes(user.id))
              project!.memberIds.push(user.id);
            return reply.code(201).send(safeUser(user));
          }
          if (path.endsWith("/start") || path.endsWith("/complete")) {
            const sprint = sprints.find(
              (x) => x.id === p.sprintId && x.projectId === p.id,
            );
            if (!sprint)
              return reply.code(404).send({ error: "Sprint not found" });
            sprint.state = path.endsWith("/start") ? "active" : "completed";
            return sprint;
          }
          const item: JsonObject = {
            id: randomUUID(),
            ...input,
            projectId: p.id,
          };
          if (path.endsWith("/roles"))
            coll.push(item as unknown as ResourceRecord);
          else if (path.endsWith("/board/columns")) {
            item.position ??= scoped(columns, p.id).length;
            item.statuses ??= [];
            columns.push(item as unknown as ColumnRecord);
          } else if (path.endsWith("/sprints")) {
            item.state = "planned";
            sprints.push(item as unknown as SprintRecord);
          } else if (path.endsWith("/issues")) {
            const next =
              Math.max(
                0,
                ...scoped(issues, p.id).map(
                  (x) => Number(String(x.key).split("-").pop()) || 0,
                ),
              ) + 1;
            item.key = `${project!.key}-${next}`;
            item.reporterId = userId;
            item.type ??= "task";
            item.status ??= "todo";
            item.priority ??= "medium";
            item.labels ??= [];
            issues.push(item as unknown as IssueRecord);
          } else if (path.endsWith("/tasks")) {
            if (path.includes("/issues/")) {
              const parent = issues.find(
                (x) => x.id === p.issueId && x.projectId === p.id,
              );
              if (!parent)
                return reply.code(404).send({ error: "Issue not found" });
              item.issueId = p.issueId;
            }
            item.status ??= "todo";
            item.priority ??= "medium";
            item.labels ??= [];
            item.assigneeId ??= userId;
            item.position ??= scoped(tasks, p.id).length;
            item.columnId =
              columns.find(
                (c) =>
                  c.projectId === p.id &&
                  c.statuses?.includes(stringValue(item, "status")),
              )?.id ?? "col-todo";
            tasks.push(item as unknown as TaskRecord);
          } else if (path.endsWith("/comments")) {
            if (!tasks.some((x) => x.id === p.taskId && x.projectId === p.id))
              return reply.code(404).send({ error: "Task not found" });
            item.taskId = p.taskId;
            item.authorId = userId;
            comments.push(item as unknown as CommentRecord);
          } else if (path.endsWith("/labels")) {
            if (scoped(labels, p.id).some((x) => x.name === input.name))
              return reply.code(409).send({ error: "Label already exists" });
            labels.push(item as unknown as LabelRecord);
          } else return reply.code(404).send({ error: "Unsupported resource" });
          return reply.code(201).send(item);
        }
        if (method === "PATCH") {
          if (path === "/projects/:id/board") {
            let board = boards.find((x) => x.projectId === p.id);
            if (!board) {
              board = { projectId: p.id };
              boards.push(board);
            }
            Object.assign(board, input);
            return { ...board, columns: scoped(columns, p.id) };
          }
          if (path.endsWith("/members/:userId/role")) {
            if (!project!.memberIds.includes(p.userId))
              return reply.code(404).send({ error: "Member not found" });
            if (
              !roles.some(
                (x) =>
                  x.id === input.roleId &&
                  (!x.projectId || x.projectId === p.id),
              )
            )
              return reply.code(404).send({ error: "Role not found" });
            const row = memberRoles.find(
              (x) => x.projectId === p.id && x.userId === p.userId,
            );
            if (row) row.roleId = stringValue(input, "roleId");
            else
              memberRoles.push({
                projectId: p.id,
                userId: p.userId,
                roleId: stringValue(input, "roleId"),
              });
            return {
              projectId: p.id,
              userId: p.userId,
              roleId: stringValue(input, "roleId"),
            };
          }
          if (path.endsWith("/reorder")) {
            const rows = path.includes("/columns/")
              ? scoped(columns, p.id)
              : scoped(tasks, p.id);
            const idsValue = path.includes("/columns/")
              ? input.columnIds
              : input.taskIds;
            const key = path.includes("/columns/") ? "columnId" : "taskId";
            if (
              !Array.isArray(idsValue) ||
              !idsValue.every(
                (value): value is string => typeof value === "string",
              ) ||
              idsValue.length !== rows.length ||
              idsValue.some((x) => !rows.some((row) => row.id === x))
            )
              return reply
                .code(400)
                .send({ error: "IDs must contain every item in this project" });
            const ids = idsValue;
            ids.forEach((x, index) => {
              const row = rows.find((r) => r.id === x);
              if (row) row.position = index;
            });
            return { updated: true, [key + "s"]: ids };
          }
          const item = coll.find(
            (x) =>
              x.id === id &&
              (!fieldValue(x, "projectId") ||
                fieldValue(x, "projectId") === p.id),
          );
          if (!item) return reply.code(404).send({ error: "Not found" });
          if (path.endsWith("/move")) {
            if (
              input.columnId &&
              !columns.some(
                (x) => x.id === input.columnId && x.projectId === p.id,
              )
            )
              return reply.code(404).send({ error: "Column not found" });
            if (
              input.sprintId &&
              !sprints.some(
                (x) => x.id === input.sprintId && x.projectId === p.id,
              )
            )
              return reply.code(404).send({ error: "Sprint not found" });
            const itemData = item as unknown as JsonObject;
            if (typeof input.label === "string") {
              const labels = Array.isArray(itemData.labels)
                ? itemData.labels.filter(
                    (label): label is string => typeof label === "string",
                  )
                : [];
              itemData.labels = [...new Set([...labels, input.label])];
            }
            const updates = { ...input };
            delete updates.label;
            Object.assign(item, updates);
          } else Object.assign(item, input);
          return item;
        }
        if (method === "DELETE") {
          if (path.endsWith("/members/:userId")) {
            if (!project!.memberIds.includes(p.userId))
              return reply.code(404).send({ error: "Member not found" });
            project!.memberIds = project!.memberIds.filter(
              (x: string) => x !== p.userId,
            );
            const i = memberRoles.findIndex(
              (x) => x.projectId === p.id && x.userId === p.userId,
            );
            if (i >= 0) memberRoles.splice(i, 1);
            return reply.code(204).send();
          }
          const index = coll.findIndex(
            (x) =>
              x.id === id &&
              (!fieldValue(x, "projectId") ||
                fieldValue(x, "projectId") === p.id),
          );
          if (index < 0) return reply.code(404).send({ error: "Not found" });
          const [removed] = coll.splice(index, 1);
          if (path === "/projects/:id") {
            for (const name of [
              "roles",
              "columns",
              "sprints",
              "issues",
              "tasks",
              "comments",
              "labels",
            ])
              collections[name] = collections[name].filter(
                (x) => fieldValue(x, "projectId") !== p.id,
              );
          }
          if (path.includes("/issues/"))
            tasks.splice(
              0,
              tasks.length,
              ...tasks.filter((x) => x.issueId !== removed.id),
            );
          if (path.includes("/tasks/"))
            comments.splice(
              0,
              comments.length,
              ...comments.filter((x) => x.taskId !== removed.id),
            );
          return reply.code(204).send();
        }
        return reply.code(200).send({ ok: true });
      },
    });
  }
  return app;
}
if (process.argv[1]?.replace(/\\/g, "/").endsWith("/src/index.ts"))
  buildApp()
    .then((app) =>
      app.listen({ port: Number(process.env.PORT) || 4000, host: "0.0.0.0" }),
    )
    .then(() => console.log("Mini Jira API: http://localhost:4000/docs"));
