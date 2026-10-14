import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardSidebar } from "./DashboardSidebar";

const meta = {
  title: "Dashboard/Sidebar",
  component: DashboardSidebar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DashboardSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
