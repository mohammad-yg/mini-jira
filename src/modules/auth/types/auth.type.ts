export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt?: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthLoginResponse extends AuthTokens {
  user: AuthUser;
}

export interface AuthRegistrationResponse {
  user: AuthUser;
}

export interface AuthRegisterDto {
  name: string;
  email: string;
  password: string;
}
