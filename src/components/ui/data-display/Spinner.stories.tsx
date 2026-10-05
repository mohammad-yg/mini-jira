import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Spinner";

const meta = {
  title: "UI/data-display/Spinner",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <UI.Spinner />
      <span className="text-sm text-muted-foreground">Loading tasks…</span>
    </div>
  ),
};
