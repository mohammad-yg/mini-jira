"use client";

import { useSession } from "next-auth/react";
import { authRegistry } from "../auth-registry";

export const useAuth = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user ?? null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    error: null,
    logout: () => authRegistry.get("authLogoutAction")(),
  };
};
