import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Kbd";

const meta = {
  title: "UI/data-display/Kbd",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <span className="flex items-center gap-2 text-sm">
      Open search{" "}
      <UI.KbdGroup>
        <UI.Kbd>⌘</UI.Kbd>
        <UI.Kbd>K</UI.Kbd>
      </UI.KbdGroup>
    </span>
  ),
};
