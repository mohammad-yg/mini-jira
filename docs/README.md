# Agent-first documentation index

This directory describes the implemented project as it exists in source. Read this page first, then open only the guide relevant to the task.

## Read order for agents

1. Read the root [AGENTS.md](../AGENTS.md) for project-specific instructions and the required Next.js documentation rule.
2. Use [architecture](architecture.md) to find the owning module and trace request or UI flows.
3. Read the matching specialist guide below before changing auth, API, UI, or local tooling.
4. Confirm details against the linked source files. If source and docs disagree, treat source as current behavior, call out the mismatch, and update docs with behavior-changing work.
5. Run only relevant checks and report the exact commands and results.

## Guides

| Guide                                                 | Use it when                                                                                     |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Architecture and module boundaries](architecture.md) | Locating ownership, following the app layers, or adding a feature module                        |
| [Authentication](authentication.md)                   | Changing sign-in, sign-up, sessions, tokens, proxy redirects, or auth BFF routes                |
| [API contracts and mock server](api-contracts.md)     | Adding or changing request/response types, endpoints, mock data, or API tests                   |
| [Frontend and UI conventions](frontend-and-ui.md)     | Building screens, forms, shared components, responsive behavior, or Storybook stories           |
| [Development and validation](development.md)          | Setting up the repo, choosing commands, configuring environment variables, or checking a change |

## Current implementation snapshot

- The app uses the Next.js App Router. The root page is currently a minimal authenticated landing page; sign-in and sign-up are the only implemented product flows.
- `src/auth.ts` configures Auth.js credentials and the backend token lifecycle. `src/proxy.ts` performs page-level redirects; it does not protect API routes.
- The Next.js BFF currently exposes only auth routes under `/api/bff/auth/*`.
- `mock-server` advertises a larger project-management REST API. Its API surface is not a roadmap guarantee and does not mean equivalent UI features exist.
- The frontend uses `ApiResponse` for HTTP results and `Result` for use-case/query results. Keep these contracts distinct.
- The root package provides lint and format scripts but no root `test` or `typecheck` script. The mock server has its own test and typecheck scripts.

## Project rules versus observations

The root `AGENTS.md` contains rules intended to guide future changes. Specialist guides label current behavior, known gaps, and test limits explicitly; do not turn an observation into a new requirement without checking the task and source.
