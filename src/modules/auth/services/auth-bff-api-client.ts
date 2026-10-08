import { registry } from "@/lib/registry";
import { authApiClientToken } from "../injectors";

/** Browser requests for auth data stay on the same-origin Next.js BFF. */
export const getAuthBffApiClient = () => registry.resolve(authApiClientToken);
