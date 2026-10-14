import type { NextRequest } from "next/server";
import { createServerProjectsRegistry } from "@/modules/projects/server/projects-registry.server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const registry = createServerProjectsRegistry(
    request.headers.get("cookie") ?? "",
  );
  const getProjectBff = registry.get("getProjectBff");
  const result = await getProjectBff();

  if (!result.success) {
    const status =
      result.error.code === "unauthorized"
        ? 401
        : result.error.code === "forbidden"
          ? 403
          : 502;

    return Response.json(
      { error: result.error.message ?? "Could not load projects" },
      { status },
    );
  }

  return Response.json(result.data);
}
