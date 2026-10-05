import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./MessageScroller";

const meta = {
  title: "UI/feedback/MessageScroller",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.MessageScrollerProvider>
      <UI.MessageScroller className="h-80 max-w-lg rounded-lg border p-4">
        <UI.MessageScrollerViewport>
          <UI.MessageScrollerContent>
            <UI.MessageScrollerItem>
              <div className="rounded-lg bg-muted p-3 text-sm">
                Welcome to the project channel.
              </div>
            </UI.MessageScrollerItem>
            <UI.MessageScrollerItem>
              <div className="ml-auto max-w-[80%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                Thanks! I’ve reviewed the backlog.
              </div>
            </UI.MessageScrollerItem>
            <UI.MessageScrollerItem>
              <div className="rounded-lg bg-muted p-3 text-sm">
                Great. Let’s start with the onboarding tasks.
              </div>
            </UI.MessageScrollerItem>
          </UI.MessageScrollerContent>
        </UI.MessageScrollerViewport>
      </UI.MessageScroller>
    </UI.MessageScrollerProvider>
  ),
};
