import { clientRegistry } from "@/lib/registry/injectors/client-registry";
import { projectsApiClientToken } from "../injectors";

export const projectsBffApiClient = clientRegistry.resolve(
  projectsApiClientToken,
);
