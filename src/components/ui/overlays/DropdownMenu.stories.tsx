import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./DropdownMenu";

const meta = {
  title: "UI/overlays/DropdownMenu",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.DropdownMenu>
      <UI.DropdownMenuTrigger
        render={<button className="rounded-md border px-4 py-2 text-sm" />}
      >
        Project actions
      </UI.DropdownMenuTrigger>
      <UI.DropdownMenuContent>
        <UI.DropdownMenuLabel>Website refresh</UI.DropdownMenuLabel>
        <UI.DropdownMenuItem>Edit project</UI.DropdownMenuItem>
        <UI.DropdownMenuItem>Invite members</UI.DropdownMenuItem>
        <UI.DropdownMenuSeparator />
        <UI.DropdownMenuItem>Archive project</UI.DropdownMenuItem>
      </UI.DropdownMenuContent>
    </UI.DropdownMenu>
  ),
};
