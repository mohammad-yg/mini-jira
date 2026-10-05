import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { apiClient } from "@/shared/services/api-client";
import { authLogout } from "@/auth/actions/auth-logout";
import { authRegister } from "@/auth/actions/auth-register";
import { createAuthGetCurrentUserProfile } from "@/auth/queries/get-current-profile";
import { createAuthGetUserProfileRequest } from "@/auth/services/auth-profile-request";
import { createAuthLogoutRequest } from "@/auth/services/auth-logout-request";
import { createAuthRegisterRequest } from "@/auth/services/auth-register-request";
import type { AuthRegisterDto } from "@/auth/types/auth-types";

type RouteContext = {
    params: Promise<{ authPath: string[] }>;
};

export const runtime = "nodejs";

const errorResponse = (message: string, status: number) => Response.json({ error: message }, { status });

const isSameOrigin = (request: NextRequest): boolean => {
    const origin = request.headers.get("origin");
    return origin !== null && origin === new URL(request.url).origin;
};

const getSessionToken = async (request: NextRequest) => {
    const secret = process.env.AUTH_SECRET;
    if (!secret) return null;
    // Match Auth.js's default cookie prefix, which follows the request protocol.
    return getToken({ req: request, secret, secureCookie: request.nextUrl.protocol === "https:" });
};

export async function GET(request: NextRequest, { params }: RouteContext) {
    const { authPath } = await params;
    if (authPath.join("/") !== "me") return errorResponse("Unsupported auth endpoint", 404);

    const token = await getSessionToken(request);
    const accessToken = token?.backendAccessToken;
    if (typeof accessToken !== "string") return errorResponse("Unauthorized", 401);

    const getCurrentProfile = createAuthGetCurrentUserProfile({
        getProfileUserRequest: createAuthGetUserProfileRequest({ apiClient, accessToken }),
    });
    const result = await getCurrentProfile();
    if (!result.success) {
        const status = result.error.code === "unauthorized" ? 401 : 502;
        return errorResponse(result.error.message ?? "Could not load the current user", status);
    }

    return Response.json(result.data);
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    const { authPath } = await params;
    const action = authPath.join("/");
    if (!isSameOrigin(request)) return errorResponse("Invalid request origin", 403);

    if (action === "register") {
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return errorResponse("Invalid JSON request body", 400);
        }
        if (!body || typeof body !== "object") return errorResponse("Invalid registration data", 400);

        const dto = body as Partial<AuthRegisterDto>;
        if (typeof dto.name !== "string" || typeof dto.email !== "string" || typeof dto.password !== "string") {
            return errorResponse("Name, email, and password are required", 400);
        }

        const response = await authRegister(
            { name: dto.name, email: dto.email, password: dto.password },
            { registerRequest: createAuthRegisterRequest({ apiClient }) },
        );
        if (!response.ok || !response.data) {
            return errorResponse(response.error?.message ?? "Could not register the account", response.statusCode ?? 502);
        }

        // Return the profile only; keep backend tokens in the encrypted Auth.js session.
        return Response.json({ user: response.data.user }, { status: response.statusCode ?? 201 });
    }

    if (action === "logout") {
        const token = await getSessionToken(request);
        const accessToken = token?.backendAccessToken;
        if (typeof accessToken !== "string") return errorResponse("Unauthorized", 401);

        const response = await authLogout({
            logoutRequest: createAuthLogoutRequest({ apiClient, accessToken }),
        });
        if (!response.ok) {
            return errorResponse(response.error?.message ?? "Could not log out", response.statusCode ?? 502);
        }
        return new Response(null, { status: 204 });
    }

    return errorResponse("Unsupported auth endpoint", 404);
}
