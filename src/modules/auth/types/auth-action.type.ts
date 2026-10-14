import type { SignInResponse } from "next-auth/react";
import type {
  AuthCredentials,
  AuthRegisterDto,
  AuthRegistrationResponse,
} from "./auth.type";
import { ResultPromise } from "@/utils/result";

export type AuthLoginAction = (
  credentials: AuthCredentials,
) => Promise<SignInResponse>;
export type AuthLoginFactory = () => AuthLoginAction;

export type AuthRegisterAction = (
  dto: AuthRegisterDto,
) => ResultPromise<AuthRegistrationResponse>;
export type AuthRegisterFactory = () => AuthRegisterAction;

export type AuthLogoutAction = () => Promise<{ url: string }>;
export type AuthLogoutFactory = () => AuthLogoutAction;
