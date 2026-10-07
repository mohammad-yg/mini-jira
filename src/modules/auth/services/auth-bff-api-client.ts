import { createClientApiClient } from "@/lib/api-client/client";

/** Browser requests for auth data stay on the same-origin Next.js BFF. */
export const authBffApiClient = createClientApiClient("/api/bff");
