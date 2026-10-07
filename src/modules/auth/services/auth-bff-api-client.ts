import { clientRegistry } from "@/lib/registry/injectors/client-registry";
import { authApiClientToken } from "../injectors";

/** Browser requests for auth data stay on the same-origin Next.js BFF. */
export const authBffApiClient = clientRegistry.resolve(authApiClientToken);
