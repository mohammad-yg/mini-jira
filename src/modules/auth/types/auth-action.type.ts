import type { SignInResponse } from "next-auth/react";
import type {
  AuthCredentials,
  AuthRegisterDto,
  AuthRegistrationResponse,
} from "./auth.type";
import type { ApiResponse } from "@/lib/api-client";

export type AuthLoginAction = (
  credentials: AuthCredentials,
) => Promise<SignInResponse>;
export type AuthLoginFactory = () => AuthLoginAction;

export type AuthRegisterAction = (
  dto: AuthRegisterDto,
) => Promise<ApiResponse<AuthRegistrationResponse>>;
export type AuthRegisterFactory = () => AuthRegisterAction;

export type AuthLogoutAction = () => Promise<{ url: string }>;
export type AuthLogoutFactory = () => AuthLogoutAction;
