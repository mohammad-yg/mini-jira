import type { ApiResponse } from "@/lib/api-client";
import type {
  AuthCredentials,
  AuthLoginResponse,
  AuthRegisterDto,
  AuthRegistrationResponse,
  AuthTokens,
  AuthUser,
} from "./auth.type";

export type AuthRegisterRequest = (
  dto: AuthRegisterDto,
) => Promise<ApiResponse<AuthRegistrationResponse>>;
export type AuthLoginRequest = (
  credentials: AuthCredentials,
) => Promise<ApiResponse<AuthLoginResponse>>;
export type AuthLogoutRequest = () => Promise<ApiResponse<null>>;
export type AuthRefreshRequest = (
  refreshToken: string,
) => Promise<ApiResponse<AuthTokens>>;

export type AuthGetUserProfileRequest = () => Promise<ApiResponse<AuthUser>>;
