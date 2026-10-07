import { injectServerApiClient } from "@/lib/api-client/injectors";
import { injectorForEnvironment } from "../..";

export const serverGlobalInjectors = [
  injectorForEnvironment("server")(injectServerApiClient),
];
