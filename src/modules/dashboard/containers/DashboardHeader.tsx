import type { ComponentProps } from "react";
import {
  dashboardProjects,
  dashboardUser,
  selectedDashboardProject,
} from "../data/dashboard-mock-data";
import { PlatformBrand } from "../components/PlatformBrand";
import { SelectedProjectMenu } from "../components/SelectedProjectMenu";
import { UserProfileMenu } from "../components/UserProfileMenu";

type Props = {
  signOutAction: NonNullable<ComponentProps<"form">["action"]>;
};

export function DashboardHeader({ signOutAction }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 px-3 backdrop-blur sm:px-6">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
        <div className="min-w-0 justify-self-start">
          <SelectedProjectMenu
            projects={dashboardProjects}
            selectedProject={selectedDashboardProject}
          />
        </div>
        <PlatformBrand />
        <div className="justify-self-end">
          <UserProfileMenu user={dashboardUser} signOutAction={signOutAction} />
        </div>
      </div>
    </header>
  );
}
