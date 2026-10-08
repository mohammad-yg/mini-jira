import Link from "next/link";
import { Check, ChevronDown, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/actions/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/overlays/DropdownMenu";
import paths from "@/lib/paths.constants";
import type { DashboardProject } from "../types";

type Props = {
  projects: DashboardProject[];
  selectedProject: DashboardProject;
};

export function SelectedProjectMenu({ projects, selectedProject }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-10 min-w-0 max-w-44 justify-start gap-2 px-2 sm:max-w-56"
            aria-label={`Open project menu. Selected project: ${selectedProject.name}`}
          />
        }
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
          {selectedProject.key}
        </span>
        <span className="hidden min-w-0 truncate text-sm font-medium sm:block">
          {selectedProject.name}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Switch project</DropdownMenuLabel>
          {projects.map((project) => (
            <DropdownMenuItem
              key={project.id}
              render={<Link href={`${paths.projects}#${project.id}`} />}
              className="min-h-11"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-xs font-semibold">
                {project.key}
              </span>
              <span className="min-w-0 flex-1 truncate">{project.name}</span>
              {project.id === selectedProject.id ? (
                <Check
                  aria-label="Selected project"
                  className="size-4 text-primary"
                />
              ) : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href={paths.projects} />}>
          <FolderKanban aria-hidden="true" />
          Browse all projects
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
