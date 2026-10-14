"use client";

import { getSession } from "next-auth/react";
import type { AuthRefreshRequest } from "../types/auth-requests.type";

/** Reading the session runs Auth.js's JWT callback, including token refresh. */
export const createAuthRefreshRequest = (): AuthRefreshRequest => () =>
  getSession();
