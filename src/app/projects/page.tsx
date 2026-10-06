import Link from "next/link";
import { ArrowUpRight, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/actions/Button";
import { DashboardHeader } from "@/dashboard/components/DashboardHeader";
import { dashboardSignOut } from "@/dashboard/actions/sign-out";
import { dashboardProjects } from "@/dashboard/data/dashboard-mock-data";
import paths from "@/lib/paths";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader signOutAction={dashboardSignOut} />
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
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardProjects.map((project) => (
            <li key={project.id}>
              <article
                id={project.id}
                className="h-full rounded-xl border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                    {project.key}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <h2 className="mt-5 font-semibold">{project.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                  <FolderKanban aria-hidden="true" className="size-4" />
                  Open project
                </span>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
