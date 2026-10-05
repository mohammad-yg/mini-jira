import { AuthRegisterRequest } from "../types/auth-requests-types";
import { AuthRegisterDto } from "../types/auth-types";

type Dependencies = {
  registerRequest: AuthRegisterRequest;
};

export const authRegister = async (
  dto: AuthRegisterDto,
  deps: Dependencies,
) => {
  const { registerRequest } = deps;

  return registerRequest(dto);
};
