import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Item";

const meta = {
  title: "UI/data-display/Item",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.ItemGroup className="w-full max-w-lg">
      <UI.Item>
        <UI.ItemMedia variant="icon">
          <span>📋</span>
        </UI.ItemMedia>
        <UI.ItemContent>
          <UI.ItemTitle>Update onboarding checklist</UI.ItemTitle>
          <UI.ItemDescription>
            Assigned to Alex · Due tomorrow
          </UI.ItemDescription>
        </UI.ItemContent>
        <UI.ItemActions>
          <span className="rounded-md bg-secondary px-2 py-1 text-xs">
            In progress
          </span>
        </UI.ItemActions>
      </UI.Item>
    </UI.ItemGroup>
  ),
};
