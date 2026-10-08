import { ResultPromise } from "@/utils/result";
import { AuthUser } from "./auth.type";

export type AuthGetCurrentUserProfile = () => ResultPromise<AuthUser>;
