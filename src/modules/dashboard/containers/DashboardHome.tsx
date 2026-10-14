import { Project, ProjectListItem } from "@/modules/projects";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface Props {
  projects: ProjectListItem[];
  selectedProject: Project | null;
}

export function DashboardHome(props: Props) {
  return (
    <div className="min-h-screen bg-muted/30 p-3 sm:p-4">
      <DashboardHeader
        projects={props.projects}
        selectedProject={props.selectedProject}
      />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 pt-4 md:flex-row">
        <DashboardSidebar />
        <main
          id="dashboard"
          className="flex min-h-[calc(100dvh-6rem)] min-w-0 flex-1 items-center justify-center rounded-2xl border bg-card p-8 shadow-sm"
        >
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        </main>
      </div>
    </div>
  );
}
