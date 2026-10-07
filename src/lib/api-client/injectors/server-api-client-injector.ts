import { apiClientRegistryToken } from "../registry-token";
import { createServerApiClient } from "../server-factory";
import { forEnvironment, type RegistryInjector } from "@/lib/registry";

export const injectServerApiClient: RegistryInjector = (registry) => {
  registry.provide(
    apiClientRegistryToken,
    forEnvironment("server")(createServerApiClient()),
  );
};
