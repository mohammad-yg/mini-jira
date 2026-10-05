import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Badge";

const meta = {
  title: "UI/data-display/Badge",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <UI.Badge>In progress</UI.Badge>
      <UI.Badge variant="secondary">Design</UI.Badge>
      <UI.Badge variant="outline">Backlog</UI.Badge>
    </div>
  ),
};
