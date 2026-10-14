import { DashboardHome } from "@/modules/dashboard/containers";

export default async function HomePage() {
  return <DashboardHome projects={[]} selectedProject={null} />;
}
