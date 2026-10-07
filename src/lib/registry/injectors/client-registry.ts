import { createRegistry } from "..";
import { clientGlobalInjectors } from "./global/client-injectors";
import { clientModuleInjectors } from "./modules";

export const clientRegistry = createRegistry("client", [
  ...clientGlobalInjectors,
  ...clientModuleInjectors,
]);
