import type { AuthRegisterFactory } from "../types/auth-action-types";

export const createAuthRegister: AuthRegisterFactory = ({ registerRequest }) =>
  async (dto) => registerRequest(dto);
