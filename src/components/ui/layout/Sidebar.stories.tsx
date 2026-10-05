import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Sidebar";

const meta = { title: "UI/layout/Sidebar", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.SidebarProvider>
      <div className="flex min-h-64">
        <UI.Sidebar>
          <UI.SidebarHeader>Mini Jira</UI.SidebarHeader>
          <UI.SidebarContent />
        </UI.Sidebar>
        <main className="p-6">Workspace</main>
      </div>
    </UI.SidebarProvider>
  ),
};
