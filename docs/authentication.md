# Authentication

## Sources of truth

- Auth.js setup and backend token lifecycle: `src/auth.ts`
- Auth.js route exposure: `src/app/api/auth/[...nextauth]/route.ts`
- Page redirect gate: `src/proxy.ts`
- Browser auth BFF: `src/app/api/bff/auth/[...authPath]/route.ts`
- Form hooks and schemas: `src/modules/auth/hooks/` and `src/modules/auth/schemas/`
- Backend request adapters: `src/modules/auth/services/`

## Sign-in flow

1. `/auth/sign-in` renders `AuthLogin` and `useAuthLoginForm`.
2. The hook validates with React Hook Form and the Zod schema, then calls `signIn("credentials", { redirect: false })` from Auth.js.
3. `src/auth.ts` validates the credential values and creates the `authLogin` use-case with an injected login request imported from the auth module's public API; the returned action receives only the credentials.
4. The request adapter calls `POST auth/login` through the shared API client, whose default base URL is `NEXT_PUBLIC_API_URL` or `http://localhost:4000/api/v1`.
5. Auth.js uses the JWT session strategy and carries backend access/refresh tokens in its session token. The JWT callback refreshes the backend tokens when the access token is within 60 seconds of expiry.
6. On success the client navigates to `/` and refreshes the route.

## Sign-up flow

1. `/auth/sign-up` renders `AuthRegister` and `useAuthRegisterForm`.
2. The hook validates the name, email, and password with the Zod schema.
3. It creates the `authRegister` use-case with the auth BFF request and runs the returned action with the registration data. The browser sends `POST /api/bff/auth/register` on the app's own origin.
4. The BFF requires an `Origin` header matching the request origin, validates that the three values are strings, then calls backend `POST auth/register`.
5. The BFF returns the user profile only; backend tokens stay out of the registration response. The hook then signs in through the credentials provider and navigates to `/` on success.

## Auth route inventory

| App route                 | Method                    | Behavior                                                                                        |
| ------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| `/api/auth/[...nextauth]` | Auth.js supported methods | Auth.js credentials/session handlers                                                            |
| `/api/bff/auth/me`        | `GET`                     | Reads the Auth.js token, calls backend `auth/me` with its access token, and returns the profile |
| `/api/bff/auth/register`  | `POST`                    | Same-origin registration; returns profile only                                                  |
| `/api/bff/auth/logout`    | `POST`                    | Same-origin request that revokes the backend session using the access token                     |

The auth catch-all is limited to auth paths; project listing uses its separate `/api/bff/projects` route. The page gate in `src/proxy.ts` does not authorize API routes: its matcher excludes `/api/**`. Each route handler must authenticate and validate its own request. The auth BFF checks origins on POST requests and checks the session token for `me` and `logout`.

Only the credentials provider is configured in `src/auth.ts`. The Google and GitHub buttons are display-only buttons without sign-in handlers. The forgot-password, terms, and privacy links are placeholder anchors; no corresponding routes or flows are currently implemented.

## Page redirect behavior

`src/proxy.ts` allows any `/auth` or `/auth/*` page through and allows other matched pages only when `request.auth?.user` exists. Otherwise it redirects to `/auth/sign-in`. The matcher skips API paths, Next static/image paths, `favicon.ico`, and paths containing a dot. Authenticated users are also allowed to open auth pages; there is no signed-in redirect away from sign-in/sign-up.

Treat Proxy as a page-level redirect gate, not the security boundary for backend data. Backend routes and BFF handlers need their own authentication and authorization checks.

## Sign-out and profile details

- Auth.js `events.signOut` in `src/auth.ts` calls the backend logout request when a backend access token is present.
- The BFF also has a `POST /api/bff/auth/logout` implementation; verify callers before changing or removing it.
- The BFF profile route maps backend 401 to 401 and other query failures to 502.
- `src/modules/auth/store/auth-store.ts` is not used by the active Auth.js form/session path at present. Do not treat it as the authoritative session implementation without first checking current imports.

## Security invariants for changes

- Never return backend access or refresh tokens from the browser-facing registration or profile response.
- Keep credentials and `AUTH_SECRET` server-side; do not add secrets to `NEXT_PUBLIC_*` variables.
- For protected API routes, check the session and request data inside the route handler. Public endpoints such as registration still need input and origin validation; do not use the page gate as API protection.
- Preserve origin validation on BFF POST routes and narrow endpoint allowlists; do not make the catch-all BFF a general-purpose proxy.
- Before changing Auth.js or Next.js route conventions, inspect the installed package docs and current source. The installed Next.js docs live under `node_modules/next/dist/docs/`.
