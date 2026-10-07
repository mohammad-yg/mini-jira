import { clientRegistry } from "@/lib/registry/injectors/client-registry";
import { apiClientRegistryToken } from "./registry-token";
export { createClientApiClient } from "./client-factory";

export const clientApiClient = clientRegistry.resolve(apiClientRegistryToken);
