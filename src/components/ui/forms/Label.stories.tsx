import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Label";

const meta = { title: "UI/forms/Label", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid max-w-xs gap-2">
      <UI.Label htmlFor="team-name">Team name</UI.Label>
      <input
        id="team-name"
        className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm"
        defaultValue="Northstar"
      />
    </div>
  ),
};
