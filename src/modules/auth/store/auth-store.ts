import type { ApiResponse } from "@/lib/api-client";
import { failedResult, successResult } from "@/utils/result";
import type { Result, ResultError, ResultPromise } from "@/utils/result";
import type { AuthGetCurrentUserProfile } from "../types/auth-query.type";
import type { AuthCredentials, AuthTokens, AuthUser } from "../types/auth.type";

export interface AuthStoreState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  error: ResultError<string> | null;
}

export interface AuthStore {
  getState: () => AuthStoreState;
  subscribe: (listener: () => void) => () => void;
  login: (credentials: AuthCredentials) => Promise<Result<AuthTokens, string>>;
  logout: () => Promise<Result<void, string>>;
  getCurrentUser: AuthGetCurrentUserProfile;
}

export interface AuthStoreDependencies {
  login: (credentials: AuthCredentials) => Promise<ApiResponse<AuthTokens>>;
  logout: () => Promise<ApiResponse<unknown>>;
  getCurrentUser: AuthGetCurrentUserProfile;
}

const toResultError = (
  response: ApiResponse<unknown>,
): ResultError<string> => ({
  code: response.error?.code ?? "unknown",
  message: response.error?.message,
});

export const createAuthStore = ({
  login: loginUseCase,
  logout: logoutUseCase,
  getCurrentUser: getCurrentUserUseCase,
}: AuthStoreDependencies): AuthStore => {
  let state: AuthStoreState = {
    user: null,
    tokens: null,
    isLoading: false,
    error: null,
  };
  const listeners = new Set<() => void>();

  const setState = (update: Partial<AuthStoreState>) => {
    state = { ...state, ...update };
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const login = async (
    credentials: AuthCredentials,
  ): Promise<Result<AuthTokens, string>> => {
    setState({ isLoading: true, error: null });

    try {
      const result = await loginUseCase(credentials);
      if (!result.ok || !result.data) {
        const error = toResultError(result);
        setState({ isLoading: false, error });
        return failedResult(error);
      }

      setState({ tokens: result.data, isLoading: false, error: null });
      return successResult(result.data);
    } catch (cause) {
      const error: ResultError<string> = {
        code: "unknown",
        message: cause instanceof Error ? cause.message : undefined,
      };
      setState({ isLoading: false, error });
      return failedResult(error);
    }
  };

  const logout = async (): Promise<Result<void, string>> => {
    setState({ isLoading: true, error: null });

    try {
      const response = await logoutUseCase();
      if (!response.ok) {
        const error = toResultError(response);
        setState({ user: null, tokens: null, isLoading: false, error });
        return failedResult(error);
      }

      setState({ user: null, tokens: null, isLoading: false, error: null });
      return successResult(undefined);
    } catch (cause) {
      const error: ResultError<string> = {
        code: "unknown",
        message: cause instanceof Error ? cause.message : undefined,
      };
      setState({ user: null, tokens: null, isLoading: false, error });
      return failedResult(error);
    }
  };

  const getCurrentUser = async (): ResultPromise<AuthUser, string> => {
    setState({ isLoading: true, error: null });

    try {
      const result = await getCurrentUserUseCase();
      if (!result.success) {
        setState({ user: null, isLoading: false, error: result.error });
        return result;
      }

      setState({ user: result.data, isLoading: false, error: null });
      return result;
    } catch (cause) {
      const error: ResultError<string> = {
        code: "unknown",
        message: cause instanceof Error ? cause.message : undefined,
      };
      setState({ isLoading: false, error });
      return failedResult(error);
    }
  };

  return { getState, subscribe, login, logout, getCurrentUser };
};
