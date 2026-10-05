import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Checkbox";

const meta = { title: "UI/forms/Checkbox", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm">
      <UI.Checkbox defaultChecked />
      Notify me when a task is assigned
    </label>
  ),
};
