<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Mini Jira agent guide

These project instructions are maintained outside the Next.js managed block above. Next.js updates the marked block; preserve the project guide below it.

- Before changing code, read [docs/README.md](docs/README.md) and the relevant linked guide. Trace the current implementation and its callers before proposing architecture changes.
- Treat source code and executable contracts as authoritative. If a guide conflicts with code, report the mismatch and update the guide when the task changes the behavior.
- Keep the current product boundary explicit: auth screens and a minimal home page exist; the broader Jira domain currently lives in the mock API, not in app screens.
- Follow the feature boundaries documented in [docs/architecture.md](docs/architecture.md). Keep generic UI primitives in `src/components/ui`, feature UI in its feature module, HTTP details in services, and orchestration in use-case functions.
- The current Next.js version is pinned in `package.json`. Before changing Next.js conventions, read the matching guide under `node_modules/next/dist/docs/` as required by the managed rule above.
- Run the narrowest relevant checks after a change. Use the commands in [docs/development.md](docs/development.md); do not claim that tests ran unless they did.
- Keep docs synchronized with behavior, endpoint schemas, environment variables, and developer commands when those change.
