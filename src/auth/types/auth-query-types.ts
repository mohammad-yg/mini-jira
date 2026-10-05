import { ResultPromise } from "@/shared/result";
import { AuthUser } from "./auth-types";

export type AuthGetCurrentUserProfile = () => ResultPromise<AuthUser>;
