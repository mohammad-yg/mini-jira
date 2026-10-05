import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import * as UI from "./ButtonGroup";

const meta = {
  title: "UI/actions/ButtonGroup",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.ButtonGroup>
      <Button variant="outline">Today</Button>
      <Button variant="outline">This week</Button>
      <Button variant="outline">This month</Button>
    </UI.ButtonGroup>
  ),
};
