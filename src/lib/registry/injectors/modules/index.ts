import { authModuleInjector } from "@/modules/auth/injectors";
import { projectsModuleInjector } from "@/modules/projects/injectors";
import { injectorForEnvironment } from "../..";

export const clientModuleInjectors = [
  injectorForEnvironment("client")(authModuleInjector),
  injectorForEnvironment("client")(projectsModuleInjector),
];
