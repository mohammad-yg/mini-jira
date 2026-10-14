import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { DashboardHeader } from "./DashboardHeader";

const meta = {
  title: "Dashboard/Header",
  component: DashboardHeader,
  args: { projects: [], selectedProject: null },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DashboardHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: /selected project: mini jira/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "Mini Jira dashboard" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: /alex morgan/i }),
    ).toBeVisible();
  },
};
