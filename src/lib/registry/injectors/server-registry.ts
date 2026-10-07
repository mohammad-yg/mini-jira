import "server-only";

import { createRegistry } from "..";
import { serverGlobalInjectors } from "./global/server-injectors";

export const serverRegistry = createRegistry("server", serverGlobalInjectors);
