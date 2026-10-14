import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { AuthUser } from "@/modules/auth/types";
import { createAuthServerRegistry } from "./modules/auth/server/auth-registry.server";

const accessTokenExpiresAt = (accessToken: string): number => {
  try {
    const payload = accessToken.split(".")[1];
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { exp?: number };
    return typeof decoded.exp === "number"
      ? decoded.exp * 1000
      : Date.now() + 55 * 60 * 1000;
  } catch {
    return Date.now() + 55 * 60 * 1000;
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const email =
          typeof credentials.email === "string" ? credentials.email.trim() : "";
        const password =
          typeof credentials.password === "string" ? credentials.password : "";
        if (!email || !password) return null;

        const loginAction = createAuthServerRegistry(
          request.headers.get("cookie") ?? "",
        ).get("authLoginAction");

        const response = await loginAction({ email, password });
        if (!response.ok || !response.data?.user) return null;

        const user = response.data.user;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.avatarUrl ?? null,
          authUser: user,
          backendAccessToken: response.data.accessToken,
          backendRefreshToken: response.data.refreshToken,
          backendAccessTokenExpiresAt: accessTokenExpiresAt(
            response.data.accessToken,
          ),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (
        user?.authUser &&
        user.backendAccessToken &&
        user.backendRefreshToken
      ) {
        token.authUser = user.authUser;
        token.backendAccessToken = user.backendAccessToken;
        token.backendRefreshToken = user.backendRefreshToken;
        token.backendAccessTokenExpiresAt = user.backendAccessTokenExpiresAt;
        delete token.authError;
      }

      const tokenExpiresAt = token.backendAccessTokenExpiresAt;
      if (
        typeof tokenExpiresAt !== "number" ||
        Date.now() < tokenExpiresAt - 60_000
      ) {
        return token;
      }
      const refreshToken = token.backendRefreshToken;
      if (typeof refreshToken !== "string" || !refreshToken) {
        token.authError = "RefreshAccessTokenError";
        return token;
      }

      const authRefreshRequest =
        createAuthServerRegistry("").get("authRefreshRequest");

      const refreshed = await authRefreshRequest(refreshToken);
      if (!refreshed.ok || !refreshed.data) {
        token.authError = "RefreshAccessTokenError";
        return token;
      }

      token.backendAccessToken = refreshed.data.accessToken;
      token.backendRefreshToken = refreshed.data.refreshToken;
      token.backendAccessTokenExpiresAt = accessTokenExpiresAt(
        refreshed.data.accessToken,
      );
      delete token.authError;
      return token;
    },
    async session({ session, token }) {
      if (token.authUser) {
        const authUser = token.authUser as AuthUser;
        session.user = {
          ...session.user,
          ...authUser,
          image: authUser.avatarUrl ?? session.user.image,
        };
      }
      return session;
    },
  },
  events: {
    async signOut(event) {
      const accessToken =
        "token" in event ? event.token?.backendAccessToken : undefined;
      if (!accessToken) return;

      const authLogoutAction =
        createAuthServerRegistry("").get("authLogoutAction");

      await authLogoutAction(accessToken);
    },
  },
});
