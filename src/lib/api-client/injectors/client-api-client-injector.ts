import { apiClientRegistryToken } from "../registry-token";
import { createClientApiClient } from "../client-factory";
import { forEnvironment, type RegistryInjector } from "@/lib/registry";

export const injectClientApiClient: RegistryInjector = (registry) => {
  registry.provide(
    apiClientRegistryToken,
    forEnvironment("client")(createClientApiClient()),
  );
};
