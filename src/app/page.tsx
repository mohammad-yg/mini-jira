import { handleDashboardSignOut } from "@/app/actions/dashboard-sign-out.server";
import { DashboardHome } from "@/modules/dashboard/containers";

export default function HomePage() {
  return <DashboardHome signOutAction={handleDashboardSignOut} />;
}
