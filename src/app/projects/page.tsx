import { dashboardSignOut } from "@/app/actions/dashboard-sign-out";
import { ProjectsPageContainer } from "@/containers/projects-page";

export default function ProjectsPage() {
  return (
    <ProjectsPageContainer
      signOutAction={dashboardSignOut}
      initialProjects={[]}
    />
  );
}
