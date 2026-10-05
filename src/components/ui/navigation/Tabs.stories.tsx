import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Tabs";

const meta = { title: "UI/navigation/Tabs", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Tabs defaultValue="overview" className="w-full max-w-lg">
      <UI.TabsList>
        <UI.TabsTrigger value="overview">Overview</UI.TabsTrigger>
        <UI.TabsTrigger value="activity">Activity</UI.TabsTrigger>
        <UI.TabsTrigger value="members">Members</UI.TabsTrigger>
      </UI.TabsList>
      <UI.TabsContent
        value="overview"
        className="rounded-md border p-4 text-sm"
      >
        A summary of your project and its current progress.
      </UI.TabsContent>
      <UI.TabsContent
        value="activity"
        className="rounded-md border p-4 text-sm"
      >
        Recent project updates appear here.
      </UI.TabsContent>
      <UI.TabsContent value="members" className="rounded-md border p-4 text-sm">
        Manage your project members.
      </UI.TabsContent>
    </UI.Tabs>
  ),
};
