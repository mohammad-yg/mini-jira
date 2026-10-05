import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./ToggleGroup";

const meta = {
  title: "UI/actions/ToggleGroup",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.ToggleGroup defaultValue={["board"]} aria-label="View mode">
      <UI.ToggleGroupItem value="board">Board</UI.ToggleGroupItem>
      <UI.ToggleGroupItem value="list">List</UI.ToggleGroupItem>
    </UI.ToggleGroup>
  ),
};
