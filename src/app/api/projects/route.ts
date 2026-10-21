import "server-only";

import { serverProjectsRegistry } from "@/modules/projects/server/projects-registry.server";

const getErrorStatus = (code: string | undefined): number => {
  if (code === "unauthorized") return 401;
  if (code === "forbidden") return 403;
  return 502;
};

export async function GET(): Promise<Response> {
  const { getProjectsListRequest } = await serverProjectsRegistry();
  const result = await getProjectsListRequest();

  if (!result.ok || result.data === null) {
    return Response.json(
      { error: result.error },
      {
        status: result.statusCode ?? getErrorStatus(result.error?.code),
      },
    );
  }

  return Response.json(result.data, {
    status: result.statusCode ?? 200,
  });
}
