import type { DashboardProject, DashboardUser } from "../types";

export const dashboardProjects: DashboardProject[] = [
  {
    id: "mini-jira",
    name: "Mini Jira",
    key: "MJ",
    description: "Plan and track the work that moves your team forward.",
  },
  {
    id: "atlas-mobile",
    name: "Atlas Mobile",
    key: "AM",
    description: "A mobile workspace for the Atlas product team.",
  },
  {
    id: "horizon-web",
    name: "Horizon Web",
    key: "HW",
    description: "A refreshed web experience for Horizon customers.",
  },
];

export const selectedDashboardProject = dashboardProjects[0];

export const dashboardUser: DashboardUser = {
  name: "Alex Morgan",
  role: "Workspace administrator",
  email: "alex.morgan@minijira.local",
  avatarUrl: "/images/dashboard-user.svg",
};
