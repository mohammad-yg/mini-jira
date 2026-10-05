import { AuthLoginRequest } from "../types/auth-requests-types";
import { AuthCredentials } from "../types/auth-types";

type Dependencies = {
    loginRequest: AuthLoginRequest,
};

export const authLogin = async (credentials: AuthCredentials, deps: Dependencies) => {
    const { loginRequest } = deps;

    return loginRequest(credentials);
};