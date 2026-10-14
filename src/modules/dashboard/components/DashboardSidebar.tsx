import Link from "next/link";
import {
  BookOpenText,
  ChevronRight,
  CircleDot,
  FolderKanban,
  GitBranch,
  House,
  Layers3,
  ListTodo,
  MessageCircle,
  Settings2,
  SquareCheckBig,
} from "lucide-react";
import paths from "@/lib/paths.constants";

type Task = {
  key: string;
  title: string;
  isAssignedToCurrentUser: boolean;
};

type Issue = {
  key: string;
  title: string;
  tasks: Task[];
};

type Epic = {
  key: string;
  title: string;
  issues: Issue[];
};

const projectEpics: Epic[] = [
  {
    key: "MJ-1",
    title: "Platform foundation",
    issues: [
      {
        key: "MJ-12",
        title: "Authentication",
        tasks: [
          {
            key: "MJ-31",
            title: "Review sign-in flow",
            isAssignedToCurrentUser: true,
          },
          {
            key: "MJ-32",
            title: "Add session expiry state",
            isAssignedToCurrentUser: false,
          },
        ],
      },
      {
        key: "MJ-13",
        title: "API contracts",
        tasks: [
          {
            key: "MJ-33",
            title: "Document endpoint responses",
            isAssignedToCurrentUser: true,
          },
        ],
      },
    ],
  },
  {
    key: "MJ-2",
    title: "Workspace experience",
    issues: [
      {
        key: "MJ-21",
        title: "Dashboard navigation",
        tasks: [
          {
            key: "MJ-41",
            title: "Build project sidebar",
            isAssignedToCurrentUser: true,
          },
          {
            key: "MJ-42",
            title: "Polish mobile layout",
            isAssignedToCurrentUser: false,
          },
        ],
      },
    ],
  },
];

const assignedEpics = projectEpics
  .map((epic) => ({
    ...epic,
    issues: epic.issues
      .map((issue) => ({
        ...issue,
        tasks: issue.tasks.filter((task) => task.isAssignedToCurrentUser),
      }))
      .filter((issue) => issue.tasks.length > 0),
  }))
  .filter((epic) => epic.issues.length > 0);

const navigationItems = [
  { label: "Dashboard", href: paths.dashboard, icon: House, isActive: true },
  {
    label: "Projects",
    href: paths.projects,
    icon: FolderKanban,
    isActive: false,
  },
  {
    label: "My tasks",
    href: "#assigned-tasks",
    icon: ListTodo,
    isActive: false,
  },
  { label: "Settings", href: "/settings", icon: Settings2, isActive: false },
];

function TaskTree({
  epics,
  isAssignedView = false,
}: {
  epics: Epic[];
  isAssignedView?: boolean;
}) {
  return (
    <div className="space-y-1">
      {epics.map((epic) => (
        <details key={epic.key} className="group/epic" open>
          <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 rounded-md px-2 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-open/epic:bg-violet-500/10 group-open/epic:text-foreground [&::-webkit-details-marker]:hidden">
            <ChevronRight
              aria-hidden="true"
              className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-open/epic:rotate-90"
            />
            <Layers3
              aria-hidden="true"
              className="size-3.5 shrink-0 text-violet-500"
            />
            <span className="min-w-0 flex-1 truncate">{epic.title}</span>
            <span className="text-[10px] font-normal text-muted-foreground">
              {epic.key}
            </span>
          </summary>
          <div className="ml-3 border-l border-border/80 pl-2">
            {epic.issues.map((issue) => (
              <details key={issue.key} className="group/issue" open>
                <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-open/issue:bg-sky-500/10 group-open/issue:text-foreground [&::-webkit-details-marker]:hidden">
                  <ChevronRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 transition-transform duration-200 group-open/issue:rotate-90"
                  />
                  <CircleDot
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-sky-600"
                  />
                  <span className="min-w-0 flex-1 truncate">{issue.title}</span>
                  <span className="text-[10px]">{issue.key}</span>
                </summary>
                <ul className="ml-3 space-y-0.5 border-l border-border/80 pl-2">
                  {issue.tasks.map((task) => (
                    <li
                      key={task.key}
                      className={`flex min-h-8 items-center gap-2 rounded-md px-2 text-[11px] ${
                        task.isAssignedToCurrentUser
                          ? "bg-primary/8 font-medium text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <SquareCheckBig
                        aria-hidden="true"
                        className="size-3.5 shrink-0"
                      />
                      <span className="min-w-0 flex-1 truncate">
                        {task.title}
                      </span>
                      {task.isAssignedToCurrentUser ? (
                        <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">
                          You
                        </span>
                      ) : null}
                      <span className="shrink-0 text-[9px] text-muted-foreground">
                        {task.key}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </details>
      ))}
      {isAssignedView && epics.length === 0 ? (
        <p className="px-2 py-3 text-xs text-muted-foreground">
          No tasks assigned yet.
        </p>
      ) : null}
    </div>
  );
}

export function DashboardSidebar() {
  const totalTasks = projectEpics.reduce(
    (total, epic) =>
      total +
      epic.issues.reduce(
        (issueTotal, issue) => issueTotal + issue.tasks.length,
        0,
      ),
    0,
  );
  const assignedTasks = assignedEpics.reduce(
    (total, epic) =>
      total +
      epic.issues.reduce(
        (issueTotal, issue) => issueTotal + issue.tasks.length,
        0,
      ),
    0,
  );

  return (
    <aside className="flex min-h-[calc(100dvh-2rem)] w-full shrink-0 select-none flex-col rounded-2xl border bg-card p-3 text-card-foreground shadow-sm md:sticky md:top-4 md:h-[calc(100dvh-2rem)] md:w-72">
      <div className="flex items-center gap-3 px-2 py-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <SquareCheckBig aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">
            Mini Jira
          </p>
          <p className="truncate text-xs text-muted-foreground">
            MJ · Mini Jira
          </p>
        </div>
      </div>

      <nav aria-label="Main navigation" className="mt-5 space-y-1">
        <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Workspace
        </p>
        {navigationItems.map(({ label, href, icon: Icon, isActive }) => (
          <Link
            key={label}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">
        <section aria-labelledby="all-project-tasks-heading">
          <div className="mb-2 flex items-center justify-between px-2">
            <h2
              id="all-project-tasks-heading"
              className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Project tasks
            </h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {totalTasks}
            </span>
          </div>
          <TaskTree epics={projectEpics} />
        </section>

        <section id="assigned-tasks" aria-labelledby="assigned-tasks-heading">
          <div className="mb-2 flex items-center justify-between px-2">
            <h2
              id="assigned-tasks-heading"
              className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Assigned to me
            </h2>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {assignedTasks}
            </span>
          </div>
          <TaskTree epics={assignedEpics} isAssignedView />
        </section>
      </div>

      <footer className="mt-4 border-t pt-3">
        <a
          href="/terms"
          className="mb-1 flex min-h-8 items-center gap-2 rounded-md px-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <BookOpenText aria-hidden="true" className="size-3.5" />
          Terms &amp; policies
        </a>
        <a
          href="https://github.com/mohammad-yg/mini-jira"
          target="_blank"
          rel="noreferrer"
          className="mb-1 flex min-h-8 items-center gap-2 rounded-md px-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <GitBranch aria-hidden="true" className="size-3.5" />
          GitHub repository
        </a>
        <a
          href="https://github.com/mohammad-yg/mini-jira/issues"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-8 items-center gap-2 rounded-md px-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <MessageCircle aria-hidden="true" className="size-3.5" />
          Contact the developer
        </a>
      </footer>
    </aside>
  );
}
