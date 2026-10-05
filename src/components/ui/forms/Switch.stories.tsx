import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Switch";

const meta = { title: "UI/forms/Switch", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <label className="flex items-center gap-3">
      <UI.Switch defaultChecked />
      <span>
        <span className="block text-sm font-medium">Email notifications</span>
        <span className="block text-xs text-muted-foreground">
          Receive updates about your assigned tasks.
        </span>
      </span>
    </label>
  ),
};
