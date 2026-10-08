import { ResultPromise } from "@/utils/result";
import { AuthUser } from "./auth-types";

export type AuthGetCurrentUserProfile = () => ResultPromise<AuthUser>;
