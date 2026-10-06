import { dashboardSignOut } from "@/app/actions/dashboard-sign-out";
import { DashboardHome } from "@/modules/dashboard/containers";

export default function HomePage() {
  return <DashboardHome signOutAction={dashboardSignOut} />;
}
