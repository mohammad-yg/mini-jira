import type { AuthRegisterFactory } from "../types/auth-action.type";

export const createAuthRegister: AuthRegisterFactory =
  ({ registerRequest }) =>
  async (dto) =>
    registerRequest(dto);
