import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/actions/Button";
import { DashboardHeader } from "@/modules/dashboard/containers";
import { ProjectList as ProjectListView } from "@/modules/projects/components";
import type { ProjectListItem } from "@/modules/projects/types";
import paths from "@/lib/paths.constants";

type Props = {
  initialProjects: ProjectListItem[];
};

export function ProjectsPageContainer({ initialProjects }: Props) {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Workspace
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Projects
            </h1>
            <p className="mt-2 text-muted-foreground">
              Choose a project to continue working with your team.
            </p>
          </div>
          <Button render={<Link href={paths.dashboard} />} variant="outline">
            <ArrowUpRight aria-hidden="true" />
            Dashboard
          </Button>
        </div>
        <ProjectListView initialValue={initialProjects} />
      </main>
    </div>
  );
}
