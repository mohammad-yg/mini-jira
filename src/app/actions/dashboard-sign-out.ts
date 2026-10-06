"use server";

import { signOut } from "@/auth";
import paths from "@/lib/paths";

export async function dashboardSignOut() {
  await signOut({ redirectTo: paths.auth.signIn });
}
