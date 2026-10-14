import { createRegistry } from "@/lib/registry";
import {
  createAuthLogin,
  createAuthLogout,
  createAuthRegister,
} from "./actions";
import { createAuthGetCurrentUserProfile } from "./queries";
import type {
  AuthGetCurrentUserProfile,
  AuthLoginAction,
  AuthLogoutAction,
  AuthRegisterAction,
} from "./types";

export const authRegistry = createRegistry()
  .provide<"authLoginAction", AuthLoginAction>("authLoginAction", () =>
    createAuthLogin(),
  )
  .provide<"authLogoutAction", AuthLogoutAction>("authLogoutAction", () =>
    createAuthLogout(),
  )
  .provide<"authRegisterAction", AuthRegisterAction>(
    "authRegisterAction",
    () => createAuthRegister(),
  )
  .provide<"authGetCurrentUserProfileQuery", AuthGetCurrentUserProfile>(
    "authGetCurrentUserProfileQuery",
    () => createAuthGetCurrentUserProfile(),
  )
  .build();
