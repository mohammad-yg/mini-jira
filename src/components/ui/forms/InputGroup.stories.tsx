import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./InputGroup";

const meta = {
  title: "UI/forms/InputGroup",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="workspace-slug" className="text-sm font-medium">
        Workspace URL
      </label>
      <UI.InputGroup>
        <UI.InputGroupAddon>
          <UI.InputGroupText>minijira.app/</UI.InputGroupText>
        </UI.InputGroupAddon>
        <UI.InputGroupInput id="workspace-slug" defaultValue="northstar" />
        <UI.InputGroupAddon align="inline-end">
          <UI.InputGroupText>.team</UI.InputGroupText>
        </UI.InputGroupAddon>
      </UI.InputGroup>
    </div>
  ),
};
