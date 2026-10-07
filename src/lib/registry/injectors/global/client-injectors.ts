import { injectClientApiClient } from "@/lib/api-client/injectors";
import { injectorForEnvironment } from "../..";

export const clientGlobalInjectors = [
  injectorForEnvironment("client")(injectClientApiClient),
];
