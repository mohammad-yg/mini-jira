"use server";

import { signOut } from "@/auth.server";
import paths from "@/lib/paths.constants";

export async function handleDashboardSignOut() {
  await signOut({ redirectTo: paths.auth.signIn });
}
