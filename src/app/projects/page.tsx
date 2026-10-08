import { handleDashboardSignOut } from "@/app/actions/dashboard-sign-out.server";
import { ProjectsPageContainer } from "@/containers/projects-page";

export default function ProjectsPage() {
  return (
    <ProjectsPageContainer
      signOutAction={handleDashboardSignOut}
      initialProjects={[]}
    />
  );
}
