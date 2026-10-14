import { PlatformBrand } from "../components/PlatformBrand";
import { SelectedProjectMenu } from "../components/SelectedProjectMenu";
import { UserProfileMenu } from "../components/UserProfileMenu";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 px-3 backdrop-blur sm:px-6">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
        <div className="min-w-0 justify-self-start">
          <SelectedProjectMenu projects={[]} selectedProject={null} />
        </div>
        <PlatformBrand />
        <div className="justify-self-end">
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
}
