import { ErrorFullPage } from "@/containers/errors";
import { Button } from "@/components/ui/actions/Button";
import { serverProjectsRegistry } from "@/modules/projects/server/projects-registry.server";
import { DashboardStoreProvider } from "@/providers/store-provider";
import { PropsWithChildren } from "react";

const refreshAction = (
  <form action="/dashboard" method="get">
    <Button type="submit" variant="outline">
      Refresh page
    </Button>
  </form>
);

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const projectsRegistry = await serverProjectsRegistry();

  const projectsListResult = await projectsRegistry.getProjectsListQuery();

  if (!projectsListResult.success)
    return (
      <ErrorFullPage
        title="Could not load your projects"
        description="The project list could not be retrieved. Refresh the page to try again."
        actions={refreshAction}
      />
    );

  const selectedProject = projectsListResult.data.find(() => true) || null;
  const getTasksResult = selectedProject
    ? await projectsRegistry.getProjectTasksQuery(selectedProject.id)
    : null;

  if (getTasksResult && !getTasksResult.success)
    return (
      <ErrorFullPage
        title="Could not load project tasks"
        description="Tasks for the selected project could not be retrieved. Refresh the page to try again."
        actions={refreshAction}
      />
    );

  return (
    <DashboardStoreProvider
      initialState={{
        projectsList: projectsListResult.data,
        selectedProject: selectedProject,
        selectedProjectTasks: getTasksResult?.data || null,
      }}
    >
      {children}
    </DashboardStoreProvider>
  );
}
