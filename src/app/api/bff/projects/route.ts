import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { apiClient } from "@/shared/services/api-client";
import type { ProjectList } from "@/modules/projects/types";

export const runtime = "nodejs";

const errorResponse = (message: string, status: number) =>
  Response.json({ error: message }, { status });

export async function GET(request: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return errorResponse("Unauthorized", 401);

  const token = await getToken({
    req: request,
    secret,
    secureCookie: request.nextUrl.protocol === "https:",
  });
  const accessToken = token?.backendAccessToken;
  if (typeof accessToken !== "string")
    return errorResponse("Unauthorized", 401);

  const response = await apiClient.get<ProjectList>("projects", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    return Response.json(
      { error: response.error ?? { message: "Could not load projects" } },
      { status: response.statusCode ?? 502 },
    );
  }

  if (response.data === null)
    return errorResponse("Project service returned an empty response", 502);

  return Response.json(response.data, {
    status: response.statusCode ?? 200,
  });
}
