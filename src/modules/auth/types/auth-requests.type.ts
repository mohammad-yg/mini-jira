import type { ApiResponse } from "@/lib/api-client";
import type { SignInResponse } from "next-auth/react";
import type { Session } from "next-auth";
import type {
  AuthCredentials,
  AuthRegisterDto,
  AuthRegistrationResponse,
  AuthUser,
} from "./auth.type";

export type AuthRegisterRequest = (
  dto: AuthRegisterDto,
) => Promise<ApiResponse<AuthRegistrationResponse>>;
export type AuthLoginRequest = (
  credentials: AuthCredentials,
) => Promise<SignInResponse>;
export type AuthLogoutRequest = () => Promise<{ url: string }>;
export type AuthRefreshRequest = () => Promise<Session | null>;

export type AuthGetUserProfileRequest = () => Promise<ApiResponse<AuthUser>>;
