import type { NextRequest } from "next/server";
import { createBffApiClient } from "@/lib/api-client/api-client.server";
import type { ProjectList } from "@/modules/projects/types";

export const runtime = "nodejs";

const errorResponse = (message: string, status: number) =>
  Response.json({ error: message }, { status });

export async function GET(request: NextRequest) {
  const { apiClient, isAuthenticated } = await createBffApiClient(request);
  if (!isAuthenticated) return errorResponse("Unauthorized", 401);

  const response = await apiClient.get<ProjectList>("projects");

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
