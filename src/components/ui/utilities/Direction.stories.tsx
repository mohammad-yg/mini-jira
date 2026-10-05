import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Direction";

const meta = {
  title: "UI/utilities/Direction",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.DirectionProvider direction="rtl">
      <p>متن راست‌چین</p>
    </UI.DirectionProvider>
  ),
};
