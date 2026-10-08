import 'server-only'

import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

type Authentication = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

const unauthenticated: Authentication = {
  accessToken: null,
  isAuthenticated: false,
};

const getSecureCookieSetting = (requestHeaders: Headers): boolean => {
  const authUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  if (authUrl) return new URL(authUrl).protocol === "https:";

  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",", 1)[0]
    ?.trim()
    .toLowerCase();

  if (forwardedProtocol) return forwardedProtocol === "https";
  return process.env.NODE_ENV === "production";
};

export const getAuthentication = async (): Promise<Authentication> => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return unauthenticated;

  try {
    const requestHeaders = await headers();
    const token = await getToken({
      req: { headers: requestHeaders },
      secret,
      secureCookie: getSecureCookieSetting(requestHeaders),
    });
    const accessToken = token?.backendAccessToken;

    if (typeof accessToken !== "string" || accessToken.length === 0) {
      return unauthenticated;
    }

    return { accessToken, isAuthenticated: true };
  } catch {
    return unauthenticated;
  }
}
