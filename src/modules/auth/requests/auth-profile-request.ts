"use client";

import { createErrorApiResponse, createSuccessApiResponse } from "@/lib/api-client";
import { getSession } from "next-auth/react";
import type { AuthGetUserProfileRequest } from "../types/auth-requests.type";
import type { AuthUser } from "../types/auth.type";

export const createAuthGetUserProfileRequest =
  (): AuthGetUserProfileRequest => async () => {
    const session = await getSession();
    if (!session?.user) {
      return createErrorApiResponse<AuthUser>(
        { code: "unauthorized", message: "No active session" },
        401,
      );
    }

    return createSuccessApiResponse(session.user as AuthUser, 200);
  };
