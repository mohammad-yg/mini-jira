# Mini Jira

Mini Jira is a Next.js App Router project with credential authentication, a reusable UI library, and a local mock REST API.

## AI-first project guide

For AI-assisted work, read [AGENTS.md](AGENTS.md) and then start at [the documentation index](docs/README.md). The index maps architecture, authentication, API contracts, UI conventions, and development commands to their source files.

## Current scope

The app currently contains sign-in and sign-up flows and a minimal authenticated home page. The mock API describes a wider project, board, issue, sprint, task, and user domain; those endpoints do not imply that matching product screens have been implemented.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `AUTH_SECRET` to a long random value.
3. Start the mock API with `npm run mock-server`.
4. In another terminal, start the app with `npm run dev`.

The app runs at `http://localhost:3000`; the mock API uses `http://localhost:4000/api/v1` by default. Mock seed accounts and server-specific notes are in [mock-server/README.md](mock-server/README.md).

## Common commands

| Task                | Command                                  |
| ------------------- | ---------------------------------------- |
| Run the app         | `npm run dev`                            |
| Run the mock API    | `npm run mock-server`                    |
| Lint the app        | `npm run lint`                           |
| Format files        | `npm run format`                         |
| Check formatting    | `npm run format:check`                   |
| Run Storybook       | `npm run storybook`                      |
| Run Storybook tests | `npx vitest run`                         |
| Test mock API       | `npm --prefix mock-server test`          |
| Type-check mock API | `npm --prefix mock-server run typecheck` |

The root package currently has no `test` or `typecheck` script. See [development and validation](docs/development.md) for scope and environment details.
