import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Skeleton";

const meta = {
  title: "UI/data-display/Skeleton",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center gap-4">
      <UI.Skeleton className="size-12 rounded-full" />
      <div className="grid flex-1 gap-2">
        <UI.Skeleton className="h-4 w-3/4" />
        <UI.Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ),
};
