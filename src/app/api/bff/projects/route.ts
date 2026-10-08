import type { NextRequest } from "next/server";
import { serverProjectsRegistry } from "@/modules/projects/server/projects-registry.server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const getProjectBff = serverProjectsRegistry.get('getProjectBff');
  const result = await getProjectBff();

  return Response.json({});
}
