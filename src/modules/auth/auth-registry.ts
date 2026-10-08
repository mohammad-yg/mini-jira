import { baseRegistry, createRegistry } from "@/lib/registry";
import { createAuthLoginRequest } from "./services/auth-login-request";
import { createAuthLogoutRequest } from "./services/auth-logout-request";
import { createAuthGetUserProfileRequest } from "./services/auth-profile-request";
import { createAuthRefreshRequest } from "./services/auth-refresh-request";
import { createAuthRegisterRequest } from "./services/auth-register-request";
import { AuthGetUserProfileRequest, AuthLoginAction, AuthLoginRequest, AuthLogoutAction, AuthLogoutRequest, AuthRefreshRequest, AuthRegisterAction, AuthRegisterRequest } from "./types";
import { createAuthLogin, createAuthLogout, createAuthRegister } from "./actions";

const baseDeps = baseRegistry.instances;

export const authRegistry = createRegistry()
    //requests
    .provide<'authLoginRequest', AuthLoginRequest>('authLoginRequest', () => createAuthLoginRequest(baseDeps))
    .provide<'authLogoutRequest', AuthLogoutRequest>('authLogoutRequest', () => createAuthLogoutRequest(baseDeps))
    .provide<'authGetUserProfileRequest', AuthGetUserProfileRequest>('authGetUserProfileRequest', () => createAuthGetUserProfileRequest(baseDeps))
    .provide<'authRefreshRequest', AuthRefreshRequest>('authRefreshRequest', () => createAuthRefreshRequest(baseDeps))
    .provide<'authRegisterRequest', AuthRegisterRequest>('authRegisterRequest', () => createAuthRegisterRequest(baseDeps))

    //actions
    .provide<"authLogin", AuthLoginAction>('authLogin', ({ authLoginRequest }) => createAuthLogin({ ...baseDeps, loginRequest: authLoginRequest }))
    .provide<"authLogout", AuthLogoutAction>('authLogout', ({ authLogoutRequest }) => createAuthLogout({ ...baseDeps, logoutRequest: authLogoutRequest }))
    .provide<"authRegister", AuthRegisterAction>('authRegister', ({ authRegisterRequest }) => createAuthRegister({ ...baseDeps, registerRequest: authRegisterRequest }))

    .build();