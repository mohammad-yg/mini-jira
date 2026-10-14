"use client";

import { ArrowUpRight, FolderKanban } from "lucide-react";
import type { ProjectListItem } from "../types";

type ProjectListProps = {
  initialValue: ProjectListItem[];
};

export function ProjectList({ initialValue }: ProjectListProps) {
  const projects = initialValue;

  return (
    <>
      {/* {error ? (
        <p className="mb-4 text-sm text-destructive" role="alert">
          Could not refresh the project list. Showing the initial projects.
        </p>
      ) : null} */}

      {projects.length === 0 ? (
        <p className="rounded-xl border bg-card p-6 text-muted-foreground">
          No projects are available yet.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
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
                    className="size-4 text-muted-foreground"
                  />
                </div>
                <h2 className="mt-5 font-semibold">{project.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {project.description ?? "No project description."}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                  <FolderKanban aria-hidden="true" className="size-4" />
                  Project
                </span>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
