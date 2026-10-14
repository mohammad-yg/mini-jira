import "server-only";

import { createRegistry } from "@/lib/registry";
import { createServerRegistry } from "@/lib/registry/server/registry-instance.server";
import { createGetProjectsBff } from "./get-projects-bff.server";
import { GetProjectsBff } from "../types/project.type";
import type { AppCookies } from "@/types/cookies.type";

export const createServerProjectsRegistry = (userCookies: AppCookies) => {
  const baseRegistry = createServerRegistry();
  const apiClient = baseRegistry.get("apiClient")(userCookies);

  return createRegistry()
    .provide<"getProjectBff", GetProjectsBff>("getProjectBff", () =>
      createGetProjectsBff({ apiClient }),
    )
    .build();
};
