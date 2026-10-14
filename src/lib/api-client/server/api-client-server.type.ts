import { AppCookies } from "@/types/cookies.type";
import { ApiClient } from "../api-client.type";

/** Creates an API client scoped to the incoming user's Cookie header. */
export type ServerApiClient = (userCookies: AppCookies) => ApiClient;
