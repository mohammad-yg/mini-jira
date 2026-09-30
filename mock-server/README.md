# Mini Jira Mock Server

A standalone TypeScript REST API for the Mini Jira demo. It uses Fastify, Drizzle ORM, and PGlite (embedded PostgreSQL running in memory). Runtime state resets when the process exits.

## Run

```sh
npm install
npm run dev
```

The API listens on `http://localhost:4000/api/v1`. Swagger UI is at `http://localhost:4000/docs`; `/health` is a public health check. Set `PORT` and `JWT_SECRET` to configure the listener and signing secret.

## Seed accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@mini-jira.local` | `password123` |
| Member | `sam@mini-jira.local` | `password123` |
| Member | `lee@mini-jira.local` | `password123` |

Seed project `project-1` has board columns, an active sprint, issue, task, comment, and label. All listed routes require a bearer token except registration and login.

## Verify

```sh
npm test
npm run typecheck
```

The e2e suite uses Fastify's in-process HTTP injection and exercises every documented endpoint, plus checks that all operations appear in the OpenAPI document.
