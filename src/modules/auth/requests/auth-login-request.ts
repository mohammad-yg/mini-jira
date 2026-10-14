"use client";

import { signIn } from "next-auth/react";
import type { AuthLoginRequest } from "../types/auth-requests.type";
import type { AuthCredentials } from "../types/auth.type";

export const createAuthLoginRequest = (): AuthLoginRequest =>
  (credentials: AuthCredentials) =>
    signIn("credentials", { ...credentials, redirect: false });
