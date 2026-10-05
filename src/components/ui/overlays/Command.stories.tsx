import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Command";

const meta = {
  title: "UI/overlays/Command",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Command className="w-full max-w-md rounded-lg border shadow-md">
      <UI.CommandInput placeholder="Search tasks and projects..." />
      <UI.CommandList>
        <UI.CommandEmpty>No results found.</UI.CommandEmpty>
        <UI.CommandGroup heading="Projects">
          <UI.CommandItem>
            Website refresh <UI.CommandShortcut>⌘1</UI.CommandShortcut>
          </UI.CommandItem>
          <UI.CommandItem>Mobile app</UI.CommandItem>
        </UI.CommandGroup>
        <UI.CommandSeparator />
        <UI.CommandGroup heading="Tasks">
          <UI.CommandItem>Update onboarding checklist</UI.CommandItem>
          <UI.CommandItem>Review dashboard mockups</UI.CommandItem>
        </UI.CommandGroup>
      </UI.CommandList>
    </UI.Command>
  ),
};
