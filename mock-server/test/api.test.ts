import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { API, buildApp } from "../src/index.js";
import type { FastifyInstance } from "fastify";
let app: FastifyInstance;
const token = jwt.sign({ sub: "user-admin" }, "mini-jira-dev-secret-change-me");
const ids: Record<string, string> = {
  id: "project-1",
  userId: "user-1",
  taskId: "task-1",
  issueId: "issue-1",
  sprintId: "sprint-1",
  columnId: "col-todo",
  roleId: "role-admin",
  commentId: "comment-1",
  labelId: "label-1",
};
function concrete(path: string) {
  return path.replace(
    /:([A-Za-z0-9_]+)/g,
    (_, key: string) => ids[key] ?? "user-1",
  );
}
before(async () => {
  app = await buildApp();
});
after(async () => {
  await app.close();
  await (await import("../src/index.js")).dbClient.close();
});
for (const [method, path, description] of API) {
  test(`${method} ${path} — ${description}`, async () => {
    const body =
      path === "/auth/login"
        ? { email: "admin@mini-jira.local", password: "password123" }
        : path === "/auth/register"
          ? {
              name: "Test User",
              email: `test-${Math.random()}@local.test`,
              password: "password123",
            }
          : path.endsWith("/members")
            ? { userId: "user-2" }
            : path.endsWith("/role")
              ? { roleId: "role-member" }
              : {
                  name: "E2E item",
                  title: "E2E item",
                  body: "E2E comment",
                  permissions: [],
                };
    const response = await app.inject({
      method,
      url: "/api/v1" + concrete(path),
      headers:
        method === "POST" && ["/auth/login", "/auth/register"].includes(path)
          ? {}
          : { authorization: `Bearer ${token}` },
      payload: ["GET", "DELETE"].includes(method) ? undefined : body,
    });
    assert.ok(
      response.statusCode < 500,
      `${response.statusCode}: ${response.body}`,
    );
  });
}
test("OpenAPI document lists all versioned API operations", async () => {
  const doc = await app.inject("/docs/json");
  assert.equal(doc.statusCode, 200);
  const parsed = doc.json();
  for (const [method, path] of API) {
    const key = path.replace(/:([A-Za-z0-9_]+)/g, "{$1}");
    assert.ok(
      parsed.paths[key]?.[method.toLowerCase()],
      `${method} ${path} missing from OpenAPI`,
    );
  }
});
