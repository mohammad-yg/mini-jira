import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  dashboardProjects,
  selectedDashboardProject,
} from "../data/dashboard-mock-data";
import { SelectedProjectMenu } from "./SelectedProjectMenu";

const meta = {
  title: "Dashboard/Header/Selected project",
  component: SelectedProjectMenu,
  args: {
    projects: dashboardProjects,
    selectedProject: selectedDashboardProject,
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof SelectedProjectMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: /selected project: mini jira/i }),
    );

    const menu = await within(document.body).findByRole("menu");
    await expect(
      within(menu).getByRole("menuitem", { name: /atlas mobile/i }),
    ).toHaveAttribute("href", "/projects#atlas-mobile");
    await expect(
      within(menu).getByRole("menuitem", { name: /browse all projects/i }),
    ).toHaveAttribute("href", "/projects");
  },
};
