import { createClientApiClient } from "@/lib/api-client/client-factory";
import type { ApiClient } from "@/lib/api-client/types";
import {
  createRegistryToken,
  forEnvironment,
  type RegistryInjector,
} from "@/lib/registry";

export const projectsApiClientToken = createRegistryToken<ApiClient>(
  "projects-api-client",
);

/** Registers the projects module's same-origin BFF client. */
export const projectsModuleInjector: RegistryInjector = (registry) => {
  registry.provide(
    projectsApiClientToken,
    forEnvironment("client")(createClientApiClient("/api/bff")),
  );
};
