import { serverGlobalRegistry } from "@/lib/registry/server/registry-instance.server";
import type { AuthRegisterDto, AuthRegistrationResponse } from "@/modules/auth/types";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const errorResponse = (message: string, status: number) =>
  Response.json({ error: message }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return errorResponse("Invalid request origin", 403);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON request body", 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return errorResponse("Invalid registration data", 400);
  }

  const dto = body as Partial<AuthRegisterDto>;
  if (
    typeof dto.name !== "string" ||
    typeof dto.email !== "string" ||
    typeof dto.password !== "string"
  ) {
    return errorResponse("Name, email, and password are required", 400);
  }

  const apiClient = (await serverGlobalRegistry()).apiClient(await cookies())
  const result = await apiClient.post<
    AuthRegistrationResponse,
    AuthRegisterDto
  >("/auth/register", {
    name: dto.name,
    email: dto.email,
    password: dto.password,
  });


  if (!result.ok || !result.data) {
    return errorResponse(
      result.error?.message ?? "Could not register the account",
      result.statusCode ?? 502,
    );
  }

  return Response.json({ user: result.data.user }, { status: 201 });
}
