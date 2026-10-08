import { createClientApiClient } from "@/lib/api-client/client-factory";
import type { ApiClient } from "@/lib/api-client/types";
import {
  createRegistryToken,
  forEnvironment,
  type RegistryInjector,
} from "@/lib/registry/primitives";

export const authApiClientToken =
  createRegistryToken<ApiClient>("auth-api-client");

/** Registers the auth module's same-origin BFF client. */
export const authModuleInjector: RegistryInjector = (registry) => {
  registry.provide(
    authApiClientToken,
    forEnvironment("client")(createClientApiClient("/api/bff")),
  );
};
