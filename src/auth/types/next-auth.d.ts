import type { DefaultSession } from "next-auth";
import type { AuthUser } from "./auth-types";

declare module "next-auth" {
    interface User {
        authUser?: AuthUser;
        backendAccessToken?: string;
        backendRefreshToken?: string;
        backendAccessTokenExpiresAt?: number;
    }

    interface Session {
        user: DefaultSession["user"] & AuthUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        authUser?: AuthUser;
        backendAccessToken?: string;
        backendRefreshToken?: string;
        backendAccessTokenExpiresAt?: number;
        authError?: "RefreshAccessTokenError";
    }
}
