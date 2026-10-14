# API contracts and mock server

## Frontend HTTP contract

API transport code lives in `src/lib/api-client/`. `api-client.client.ts` exports `createClientApiClient({ bffApiBaseUrl, fetcher })`; `api-client.server.ts` exports the server-only `createServerApiClient({ apiServerBaseUrl, fetcher, accessToken? })`. Calling the server factory returns a `ServerApiClient`, a function that accepts the incoming user's serialized Cookie header and returns an `ApiClient`; the resulting client forwards that Cookie header and any configured bearer token with backend requests. Create a fresh client for each request, and do not retain request cookies or tokens in module-level state. Registry execution and dependency order are documented in [architecture](architecture.md#registry-and-dependency-injection-behavior). Both factories use the shared request and response contracts and support:

- supports `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`, query parameters, headers, abort signals, and optional credentials;
- serializes defined request bodies as JSON and sets `Accept: application/json`;
- parses JSON responses, preserves non-JSON text, and treats 204/205 as no content;
- uses `cache: "no-store"` and converts HTTP/network failures into `ApiResponse` instead of throwing them to callers.

The current registry configures the browser base as `/` and the server base as `http://localhost:4000/api/v1/`. Pass the desired URLs and `fetch` implementation to the relevant factory; the factories do not read environment variables themselves.

The `ApiClient`, request options, `ApiResponse` contract, and response constructors live in `src/lib/api-client/` and are exposed through its public barrel. Feature request/response types belong in the feature module. Keep `ApiResponse` as the transport contract and map it to `Result` only where an application-level outcome is needed.

## Mock API inventory

The mock server combines route tuples from these files into the exported `API` array and registers the routes in Fastify:

- `mock-server/src/cases/auth.ts`: register, login, logout, refresh, current profile.
- `mock-server/src/cases/logs.ts`: receive batches of browser log entries.
- `mock-server/src/cases/users.ts`: list/read/update/delete users.
- `mock-server/src/cases/projects.ts`: projects, members, roles, boards/columns, sprints, issues, tasks, comments, labels, and reorder/move actions.
- `mock-server/src/types.type.ts`: records and response body shapes used by mock route inventories.

The versioned API base is `/api/v1`; Swagger UI is served at `/docs`. OpenAPI operations are generated from the same route inventory. Server host/port and token secret are controlled by `PORT` and `JWT_SECRET` (defaults: port `4000` and a development-only secret in source). Do not use the default JWT secret outside local development.

The Fastify request hook requires a bearer access token for API requests other than `/docs`, `/documentation`, `/logs`, and the auth login, register, and refresh routes. `/auth/me` and `/auth/logout` therefore require a bearer token. `POST /logs` accepts up to 100 JSON-safe entries per batch and stores the latest 5,000 in process memory; it returns `202` with the number accepted.

The browser logger buffers entries without writing them to the browser console. When the page is hidden or receives `pagehide`, it sends batches through `POST /api/bff/logs` using `navigator.sendBeacon`; the BFF validates the payload and forwards it to the mock API's `POST /logs` endpoint. A batch leaves the browser queue only when `sendBeacon` reports that the browser accepted it for delivery.

## Current mock implementation limits

- Seed accounts and records are module-level arrays. Auth sessions are tracked in a process-local set.
- Startup creates a PGlite table and seeds it from those arrays, but request handlers read and mutate the arrays; they do not persist runtime mutations to the table. State resets when the server process exits.
- `/health` is registered outside the versioned API path, but the current auth hook does not exempt it; requests without a bearer token receive 401. This is documented in `mock-server/README.md`. Decide and test explicitly before changing the endpoint to public or moving it under `/api/v1`.
- `mock-server/test/api.test.ts` sends a request to each listed route and checks that it does not return a 5xx response; another test checks OpenAPI registration. This is a smoke test, not full verification of payload validation, authorization rules, or business semantics.
- The mock API is development/demo infrastructure, not a production security or persistence model.

## Adding or changing an endpoint

1. Confirm the task requires a backend/mock endpoint and identify its route family.
2. Update the relevant typed record/output declarations in `mock-server/src/types.type.ts`.
3. Add the method/path/description tuple to the matching `mock-server/src/cases/*.ts` file so the `API` list and OpenAPI inventory stay in sync.
4. Implement and authorize the behavior in `mock-server/src/index.ts`; do not rely on the frontend page gate for API security.
5. Update frontend feature request/response types and service adapter if the app consumes the route.
6. Add behavior-focused tests for the contract. The current every-route smoke test does not prove correctness.
7. Update this guide if route scope, auth behavior, response shape, storage behavior, or API verification changes.

The project BFF Route Handler still imports `createBffApiClient` from `@/lib/api-client/api-client.server`. That helper is not part of the split server factory yet, so its request-bound authentication flow remains a known migration gap. Keep product BFF routes in their own feature path; do not route project requests through `/api/bff/auth/*`.
