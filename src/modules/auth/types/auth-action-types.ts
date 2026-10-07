import type {
  AuthLoginRequest,
  AuthLogoutRequest,
  AuthRegisterRequest,
} from "./auth-requests-types";
import type {
  AuthCredentials,
  AuthLoginResponse,
  AuthRegisterDto,
  AuthRegistrationResponse,
} from "./auth-types";
import type { ApiResponse } from "@/lib/api-client";

export interface AuthLoginActionDependencies {
  loginRequest: AuthLoginRequest;
}

export type AuthLoginAction = (
  credentials: AuthCredentials,
) => Promise<ApiResponse<AuthLoginResponse>>;
export type AuthLoginFactory = (
  dependencies: AuthLoginActionDependencies,
) => AuthLoginAction;

export interface AuthRegisterActionDependencies {
  registerRequest: AuthRegisterRequest;
}

export type AuthRegisterAction = (
  dto: AuthRegisterDto,
) => Promise<ApiResponse<AuthRegistrationResponse>>;
export type AuthRegisterFactory = (
  dependencies: AuthRegisterActionDependencies,
) => AuthRegisterAction;

export interface AuthLogoutActionDependencies {
  logoutRequest: AuthLogoutRequest;
}

export type AuthLogoutAction = () => Promise<ApiResponse<null>>;
export type AuthLogoutFactory = (
  dependencies: AuthLogoutActionDependencies,
) => AuthLogoutAction;
