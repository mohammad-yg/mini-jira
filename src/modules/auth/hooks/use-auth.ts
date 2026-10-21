"use client";

import { useSession } from "next-auth/react";
import paths from "@/lib/paths.constants";
import { clientAuthRegistry } from "../client/auth-registry.client";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const logout = (redirect: (path: string) => void) => {
    clientAuthRegistry.get("authLogoutAction")();
    redirect(paths.auth.signIn);
  };

  return {
    user: session?.user ?? null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    error: null,
    logout,
  };
};
