import { DashboardHeader } from "@/dashboard/components/DashboardHeader";
import { dashboardSignOut } from "@/dashboard/actions/sign-out";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader signOutAction={dashboardSignOut} />
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center p-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </main>
    </div>
  );
}
