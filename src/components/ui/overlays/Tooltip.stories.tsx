import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Tooltip";

const meta = {
  title: "UI/overlays/Tooltip",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.TooltipProvider>
      <UI.Tooltip>
        <UI.TooltipTrigger
          render={<button className="rounded-md border px-3 py-2 text-sm" />}
        >
          Copy task link
        </UI.TooltipTrigger>
        <UI.TooltipContent>Copy link to clipboard</UI.TooltipContent>
      </UI.Tooltip>
    </UI.TooltipProvider>
  ),
};
