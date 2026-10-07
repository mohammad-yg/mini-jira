import { createRegistryToken } from "@/lib/registery";
import type { ApiClient } from "./types";

export const apiClientRegistryToken =
  createRegistryToken<ApiClient>("api-client");
