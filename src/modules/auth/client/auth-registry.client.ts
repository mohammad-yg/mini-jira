import { createRegistry } from "@/lib/registry";
import {
  AuthGetCurrentUserProfile,
  AuthLoginAction,
  AuthLogoutAction,
  AuthRegisterAction,
  AuthRegisterRequest,
} from "../types";
import {
  createAuthLogin,
  createAuthLogout,
  createAuthRegisterAction,
} from "../actions";
import { clientGlobalRegistry } from "@/lib/registry/client";
import { createClientAuthRegisterRequest } from "./requests";
import { createAuthGetCurrentUserProfile } from "../queries";

export const clientAuthRegistry = createRegistry()
  .provide<"authRegisterRequest", AuthRegisterRequest>(
    "authRegisterRequest",
    ({}) =>
      createClientAuthRegisterRequest({
        apiClient: clientGlobalRegistry.apiClient,
      }),
  )

  .provide<"authLoginAction", AuthLoginAction>("authLoginAction", () =>
    createAuthLogin(),
  )
  .provide<"authLogoutAction", AuthLogoutAction>("authLogoutAction", () =>
    createAuthLogout(),
  )
  .provide<"authRegisterAction", AuthRegisterAction>(
    "authRegisterAction",
    ({ authRegisterRequest }) =>
      createAuthRegisterAction({ authRegisterRequest }),
  )
  .provide<"authGetCurrentUserProfileQuery", AuthGetCurrentUserProfile>(
    "authGetCurrentUserProfileQuery",
    () => createAuthGetCurrentUserProfile(),
  )
  .build();
