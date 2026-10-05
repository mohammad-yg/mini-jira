import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Toggle";

const meta = { title: "UI/actions/Toggle", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Toggle aria-label="Bold" defaultPressed>
      <span className="font-bold">B</span>
    </UI.Toggle>
  ),
};
