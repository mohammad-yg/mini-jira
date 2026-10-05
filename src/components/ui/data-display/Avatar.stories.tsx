import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Avatar";

const meta = {
  title: "UI/data-display/Avatar",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <UI.Avatar>
        <UI.AvatarImage
          src="https://i.pravatar.cc/96?img=12"
          alt="Alex Morgan"
        />
        <UI.AvatarFallback>AM</UI.AvatarFallback>
      </UI.Avatar>
      <span className="text-sm font-medium">Alex Morgan</span>
    </div>
  ),
};
