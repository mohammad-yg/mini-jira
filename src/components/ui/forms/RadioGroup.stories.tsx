import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./RadioGroup";

const meta = {
  title: "UI/forms/RadioGroup",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.RadioGroup defaultValue="board" className="grid gap-3">
      <label className="flex items-center gap-2 text-sm">
        <UI.RadioGroupItem value="board" />
        Board view
      </label>
      <label className="flex items-center gap-2 text-sm">
        <UI.RadioGroupItem value="list" />
        List view
      </label>
    </UI.RadioGroup>
  ),
};
