import { createRegistryToken } from "@/lib/registry";
import type { ApiClient } from "./types";

export const apiClientRegistryToken =
  createRegistryToken<ApiClient>("api-client");
