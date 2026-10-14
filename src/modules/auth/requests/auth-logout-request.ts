"use client";

import { signOut } from "next-auth/react";
import type { AuthLogoutRequest } from "../types/auth-requests.type";

export const createAuthLogoutRequest = (): AuthLogoutRequest =>
  () => signOut({ redirect: false });
