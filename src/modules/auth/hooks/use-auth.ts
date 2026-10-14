import { useEffect, useSyncExternalStore } from "react";
import { authRegistry } from "../auth-registry";

export const useAuth = () => {
  const { getCurrentUser, getState, login, logout, subscribe } =
    authRegistry.get("auth-store");
  const state = useSyncExternalStore(subscribe, getState, getState);

  useEffect(() => {
    void getCurrentUser();
  }, [getCurrentUser]);

  return {
    user: state.user,
    isAuthenticated: state.user !== null,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
  };
};
