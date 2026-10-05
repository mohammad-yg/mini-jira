import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Empty";

const meta = {
  title: "UI/data-display/Empty",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Empty className="min-h-64">
      <UI.EmptyHeader>
        <UI.EmptyMedia variant="icon">
          <span className="text-2xl">✦</span>
        </UI.EmptyMedia>
        <UI.EmptyTitle>No projects yet</UI.EmptyTitle>
        <UI.EmptyDescription>
          Create your first project to start organizing work with your team.
        </UI.EmptyDescription>
      </UI.EmptyHeader>
      <UI.EmptyContent>
        <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
          Create project
        </button>
      </UI.EmptyContent>
    </UI.Empty>
  ),
};
