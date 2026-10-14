import { createRegistry } from "@/lib/registry";
import { createAuthLoginRequest } from "./services/auth-login-request";
import { createAuthLogoutRequest } from "./services/auth-logout-request";
import { createAuthGetUserProfileRequest } from "./services/auth-profile-request";
import { createAuthRefreshRequest } from "./services/auth-refresh-request";
import { createAuthRegisterRequest } from "./services/auth-register-request";
import {
  AuthGetCurrentUserProfile,
  AuthGetUserProfileRequest,
  AuthLoginAction,
  AuthLoginRequest,
  AuthLogoutAction,
  AuthLogoutRequest,
  AuthRefreshRequest,
  AuthRegisterAction,
  AuthRegisterRequest,
} from "./types";
import {
  createAuthLogin,
  createAuthLogout,
  createAuthRegister,
} from "./actions";
import { baseRegistry } from "@/lib/registry/client/registry-instance.client";
import { createAuthGetCurrentUserProfile } from "./queries";
import { createAuthStore } from "./store";

const baseDeps = baseRegistry.instances;

export const authRegistry = createRegistry()
  //requests
  .provide<"authLoginRequest", AuthLoginRequest>("authLoginRequest", () =>
    createAuthLoginRequest(baseDeps),
  )
  .provide<"authLogoutRequest", AuthLogoutRequest>("authLogoutRequest", () =>
    createAuthLogoutRequest({ ...baseDeps, endpoint: "api/bff/auth/logout" }),
  )
  .provide<"authGetUserProfileRequest", AuthGetUserProfileRequest>(
    "authGetUserProfileRequest",
    () =>
      createAuthGetUserProfileRequest({
        ...baseDeps,
        endpoint: "api/bff/auth/me",
      }),
  )
  .provide<"authRefreshRequest", AuthRefreshRequest>("authRefreshRequest", () =>
    createAuthRefreshRequest(baseDeps),
  )
  .provide<"authRegisterRequest", AuthRegisterRequest>(
    "authRegisterRequest",
    () =>
      createAuthRegisterRequest({
        ...baseDeps,
        endpoint: "api/bff/auth/register",
      }),
  )

  //actions
  .provide<"authLogin", AuthLoginAction>("authLogin", ({ authLoginRequest }) =>
    createAuthLogin({ ...baseDeps, loginRequest: authLoginRequest }),
  )
  .provide<"authLogout", AuthLogoutAction>(
    "authLogout",
    ({ authLogoutRequest }) =>
      createAuthLogout({ ...baseDeps, logoutRequest: authLogoutRequest }),
  )
  .provide<"authRegister", AuthRegisterAction>(
    "authRegister",
    ({ authRegisterRequest }) =>
      createAuthRegister({ ...baseDeps, registerRequest: authRegisterRequest }),
  )

  //queries
  .provide<"getCurrentUserProfile", AuthGetCurrentUserProfile>(
    "getCurrentUserProfile",
    (deps) =>
      createAuthGetCurrentUserProfile({
        getProfileUserRequest: deps.authGetUserProfileRequest,
      }),
  )

  //store
  .provide("auth-store", (deps) =>
    createAuthStore({
      getCurrentUser: deps.getCurrentUserProfile,
      login: deps.authLogin,
      logout: deps.authLogout,
    }),
  )

  .build();
