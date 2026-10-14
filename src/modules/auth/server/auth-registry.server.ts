import "server-only";
import { createRegistry } from "@/lib/registry";
import type { ApiClient } from "@/lib/api-client";
import { createAuthLoginRequest } from "../services/auth-login-request";
import { createAuthLogoutRequest } from "../services/auth-logout-request";
import { createAuthGetUserProfileRequest } from "../services/auth-profile-request";
import { createAuthRefreshRequest } from "../services/auth-refresh-request";
import { createAuthRegisterRequest } from "../services/auth-register-request";
import { createAuthGetCurrentUserProfile } from "../queries";
import type { AuthGetCurrentUserProfile } from "../types/auth-query.type";
import {
  AuthGetUserProfileRequest,
  AuthLoginAction,
  AuthLoginRequest,
  AuthLogoutAction,
  AuthLogoutRequest,
  AuthRefreshRequest,
  AuthRegisterAction,
  AuthRegisterRequest,
} from "../types";
import {
  createAuthLogin,
  createAuthLogout,
  createAuthRegister,
} from "../actions";
import { serverRegistry } from "@/lib/registry/server/registry-instance.server";

const baseDeps = serverRegistry.instances;

export const authServerRegistry = createRegistry()
  //requests
  .provide<"authLoginRequest", AuthLoginRequest>("authLoginRequest", () =>
    createAuthLoginRequest(baseDeps),
  )
  .provide<"authLogoutRequest", AuthLogoutRequest>("authLogoutRequest", () =>
    createAuthLogoutRequest(baseDeps),
  )
  .provide<"authGetUserProfileRequest", AuthGetUserProfileRequest>(
    "authGetUserProfileRequest",
    () => createAuthGetUserProfileRequest(baseDeps),
  )
  .provide<"authRefreshRequest", AuthRefreshRequest>("authRefreshRequest", () =>
    createAuthRefreshRequest(baseDeps),
  )
  .provide<"authRegisterRequest", AuthRegisterRequest>(
    "authRegisterRequest",
    () => createAuthRegisterRequest(baseDeps),
  )

  //actions
  .provide<"authLoginAction", AuthLoginAction>(
    "authLoginAction",
    ({ authLoginRequest }) =>
      createAuthLogin({ loginRequest: authLoginRequest }),
  )
  .provide<"authLogoutAction", AuthLogoutAction>(
    "authLogoutAction",
    ({ authLogoutRequest }) =>
      createAuthLogout({ logoutRequest: authLogoutRequest }),
  )
  .provide<"authRegisterAction", AuthRegisterAction>(
    "authRegisterAction",
    ({ authRegisterRequest }) =>
      createAuthRegister({ registerRequest: authRegisterRequest }),
  )

  .build();

/** Creates auth dependencies bound to the current request's authenticated API client. */
export const createAuthBffRegistry = (apiClient: ApiClient) =>
  createRegistry()
    .provide<"authGetUserProfileRequest", AuthGetUserProfileRequest>(
      "authGetUserProfileRequest",
      () => createAuthGetUserProfileRequest({ apiClient }),
    )
    .provide<"authGetCurrentUserProfileQuery", AuthGetCurrentUserProfile>(
      "authGetCurrentUserProfileQuery",
      ({ authGetUserProfileRequest }) =>
        createAuthGetCurrentUserProfile({
          getProfileUserRequest: authGetUserProfileRequest,
        }),
    )
    .provide<"authLogoutRequest", AuthLogoutRequest>("authLogoutRequest", () =>
      createAuthLogoutRequest({ apiClient }),
    )
    .provide<"authLogoutAction", AuthLogoutAction>(
      "authLogoutAction",
      ({ authLogoutRequest }) =>
        createAuthLogout({ logoutRequest: authLogoutRequest }),
    )
    .build();
