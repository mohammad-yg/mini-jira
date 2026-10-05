import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Sheet";

const meta = { title: "UI/overlays/Sheet", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Sheet>
      <UI.SheetTrigger
        render={<button className="rounded-md border px-4 py-2 text-sm" />}
      >
        Open notifications
      </UI.SheetTrigger>
      <UI.SheetContent>
        <UI.SheetHeader>
          <UI.SheetTitle>Notifications</UI.SheetTitle>
          <UI.SheetDescription>
            Recent updates from your projects.
          </UI.SheetDescription>
        </UI.SheetHeader>
        <div className="grid gap-4 px-4 text-sm">
          <p>
            <strong>Alex</strong> assigned you a task · 10 min ago
          </p>
          <p>
            <strong>Sam</strong> commented on a task · 1 hour ago
          </p>
        </div>
      </UI.SheetContent>
    </UI.Sheet>
  ),
};
