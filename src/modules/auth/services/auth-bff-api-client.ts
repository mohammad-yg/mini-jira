import { createApiClient } from "@/shared/services/api-client";

/** Browser requests for auth data stay on the same-origin Next.js BFF. */
export const authBffApiClient = createApiClient("/api/bff");
