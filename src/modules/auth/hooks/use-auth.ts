"use client";

import { useSession } from "next-auth/react";
import { authRegistry } from "../auth-registry";
import paths from "@/lib/paths.constants";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const logout = (redirect: (path: string) => void) => {
    authRegistry.get("authLogoutAction")();
    redirect(paths.auth.signIn);
  }

  return {
    user: session?.user ?? null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    error: null,
    logout
  };
};
