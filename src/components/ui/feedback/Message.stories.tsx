import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Message";

const meta = {
  title: "UI/feedback/Message",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.MessageGroup className="max-w-lg">
      <UI.Message>
        <UI.MessageAvatar aria-label="Alex Morgan">AM</UI.MessageAvatar>
        <UI.MessageContent>
          Can we move the review to tomorrow morning?
        </UI.MessageContent>
        <UI.MessageFooter>Alex · 10:42 AM</UI.MessageFooter>
      </UI.Message>
      <UI.Message>
        <UI.MessageAvatar aria-label="You">YO</UI.MessageAvatar>
        <UI.MessageContent>
          Sure, I’ll update the sprint plan.
        </UI.MessageContent>
        <UI.MessageFooter>You · 10:45 AM</UI.MessageFooter>
      </UI.Message>
    </UI.MessageGroup>
  ),
};
