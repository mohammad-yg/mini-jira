# Development and validation

## Requirements and setup

Use the Node/npm versions supported by the installed dependencies and lockfile. The main package pins Next.js `16.3.7`; read the matching installed documentation before changing Next-specific behavior.

1. Run `npm install` at the repository root.
2. Copy `.env.example` to `.env.local` and set `AUTH_SECRET` to a long random value.
3. Start the API in one terminal with `npm run mock-server`.
4. Start Next.js in another terminal with `npm run dev`.

The frontend environment variables are:

| Variable              | Purpose                                                                          |
| --------------------- | -------------------------------------------------------------------------------- |
| `AUTH_SECRET`         | Auth.js session signing/encryption secret; required for BFF session-token lookup |
| `NEXT_PUBLIC_API_URL` | Backend API base URL; defaults to `http://localhost:4000/api/v1`                 |

The mock API also reads `PORT` and `JWT_SECRET`; see [mock-server/README.md](../mock-server/README.md). Use local development credentials only.

## Available commands

### Repository root

| Command                   | Purpose                                           |
| ------------------------- | ------------------------------------------------- |
| `npm run dev`             | Start Next.js development server                  |
| `npm run build`           | Run `next build --webpack`                        |
| `npm run start`           | Start the production Next.js server               |
| `npm run lint`            | Run ESLint                                        |
| `npm run format`          | Format the repository with Prettier               |
| `npm run format:check`    | Check repository formatting without writing files |
| `npm run storybook`       | Start Storybook on port 6006                      |
| `npm run build-storybook` | Build static Storybook output                     |
| `npm run mock-server`     | Start the mock server package in watch mode       |

### Mock server

| Command                                  | Purpose                              |
| ---------------------------------------- | ------------------------------------ |
| `npm --prefix mock-server test`          | Run Node test runner API smoke tests |
| `npm --prefix mock-server run typecheck` | Type-check mock-server TypeScript    |
| `npm --prefix mock-server run dev`       | Run Fastify with `tsx watch`         |

The root package currently defines neither `npm test` nor a root TypeScript check. `vitest.config.ts` configures browser-based Storybook story tests, but no root test command is declared in `package.json`.

## Choosing checks

- Docs-only changes: `npm run format:check`.
- Frontend code: `npm run lint`, `npm run format:check`, and the relevant manual/build check when behavior changed.
- Mock-server code: `npm --prefix mock-server test` and `npm --prefix mock-server run typecheck`, plus root lint/format checks if shared files changed.
- Auth or route changes: include the appropriate mock/API checks and verify redirect, status, and response behavior. Do not count Proxy page redirects as API authorization.

Report checks that were not run. Avoid running formatting with write mode merely to check a diff; use `format:check` for review.

## Repository hygiene

- `.env*` files are ignored except `.env.example`; never add local credentials or generated secrets to docs or commits.
- `node_modules`, `.next`, `storybook-static`, build outputs, coverage, package lockfiles, and binary font assets are excluded by project config from common source-formatting operations.
- `AGENTS.md` contains a Next.js-managed block. Keep project guidance outside its markers; the installed generator upserts that marked block while preserving surrounding content. `CLAUDE.md` delegates to `AGENTS.md`.
