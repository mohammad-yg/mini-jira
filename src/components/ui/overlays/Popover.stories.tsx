import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Popover";

const meta = {
  title: "UI/overlays/Popover",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Popover>
      <UI.PopoverTrigger
        render={<button className="rounded-md border px-4 py-2 text-sm" />}
      >
        Show project details
      </UI.PopoverTrigger>
      <UI.PopoverContent>
        <UI.PopoverHeader>
          <UI.PopoverTitle>Website refresh</UI.PopoverTitle>
          <UI.PopoverDescription>
            Updated by Alex · 2 hours ago
          </UI.PopoverDescription>
        </UI.PopoverHeader>
        <p className="text-sm">A new look for the marketing website.</p>
      </UI.PopoverContent>
    </UI.Popover>
  ),
};
