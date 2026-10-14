import type { NextRequest } from "next/server";
import type { AuthRegisterDto } from "@/modules/auth/types";
import {
  authServerRegistry,
  createAuthBffRegistry,
} from "@/modules/auth/server/auth-registry.server";
import { serverRegistry } from "@/lib/registry/server/registry-instance.server";
import { getAuthentication } from "@/modules/auth/server/auth-get-authentication.server";
import { createServerApiClient } from "@/lib/api-client/server";

type RouteContext = {
  params: Promise<{ authPath: string[] }>;
};

export const runtime = "nodejs";

const errorResponse = (message: string, status: number) =>
  Response.json({ error: message }, { status });

const isSameOrigin = (request: NextRequest): boolean => {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { authPath } = await params;
  if (authPath.join("/") !== "me")
    return errorResponse("Unsupported auth endpoint", 404);

  const authentication = await getAuthentication();
  if (!authentication.isAuthenticated || !authentication.accessToken)
    return errorResponse("Unauthorized", 401);

  const apiClient = createServerApiClient({
    apiServerBaseUrl: serverRegistry.get("config").apiServerBaseUrl,
    fetcher: fetch,
    accessToken: authentication.accessToken,
  });

  const requestRegistry = createAuthBffRegistry(apiClient);
  const getCurrentProfile = requestRegistry.get(
    "authGetCurrentUserProfileQuery",
  );
  const result = await getCurrentProfile();
  if (!result.success) {
    const status = result.error.code === "unauthorized" ? 401 : 502;
    return errorResponse(
      result.error.message ?? "Could not load the current user",
      status,
    );
  }

  return Response.json(result.data);
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { authPath } = await params;
  const action = authPath.join("/");
  if (!isSameOrigin(request))
    return errorResponse("Invalid request origin", 403);

  if (action === "register") {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse("Invalid JSON request body", 400);
    }
    if (!body || typeof body !== "object")
      return errorResponse("Invalid registration data", 400);

    const dto = body as Partial<AuthRegisterDto>;
    if (
      typeof dto.name !== "string" ||
      typeof dto.email !== "string" ||
      typeof dto.password !== "string"
    ) {
      return errorResponse("Name, email, and password are required", 400);
    }

    const authRegisterAction = authServerRegistry.get("authRegisterAction");
    const response = await authRegisterAction({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
    if (!response.ok || !response.data) {
      return errorResponse(
        response.error?.message ?? "Could not register the account",
        response.statusCode ?? 502,
      );
    }

    // Return the profile only; keep backend tokens in the encrypted Auth.js session.
    return Response.json(
      { user: response.data.user },
      { status: response.statusCode ?? 201 },
    );
  }

  if (action === "logout") {
    const authentication = await getAuthentication();

    if (!authentication.isAuthenticated || !authentication.accessToken)
      return errorResponse("Unauthorized", 401);

    const apiClient = createServerApiClient({
      apiServerBaseUrl: serverRegistry.get("config").apiServerBaseUrl,
      fetcher: fetch,
      accessToken: authentication.accessToken,
    });

    const requestRegistry = createAuthBffRegistry(apiClient);
    const authLogoutAction = requestRegistry.get("authLogoutAction");
    const response = await authLogoutAction();
    if (!response.ok) {
      return errorResponse(
        response.error?.message ?? "Could not log out",
        response.statusCode ?? 502,
      );
    }
    return new Response(null, { status: 204 });
  }

  return errorResponse("Unsupported auth endpoint", 404);
}
