import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Menubar";

const meta = {
  title: "UI/navigation/Menubar",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Menubar>
      <UI.MenubarMenu>
        <UI.MenubarTrigger>File</UI.MenubarTrigger>
        <UI.MenubarContent>
          <UI.MenubarItem>
            New task <UI.MenubarShortcut>⌘N</UI.MenubarShortcut>
          </UI.MenubarItem>
          <UI.MenubarItem>Open project</UI.MenubarItem>
          <UI.MenubarSeparator />
          <UI.MenubarItem>Close</UI.MenubarItem>
        </UI.MenubarContent>
      </UI.MenubarMenu>
      <UI.MenubarMenu>
        <UI.MenubarTrigger>Edit</UI.MenubarTrigger>
        <UI.MenubarContent>
          <UI.MenubarItem>Undo</UI.MenubarItem>
          <UI.MenubarItem>Redo</UI.MenubarItem>
        </UI.MenubarContent>
      </UI.MenubarMenu>
    </UI.Menubar>
  ),
};
