import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Drawer";

const meta = { title: "UI/overlays/Drawer", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Drawer>
      <UI.DrawerTrigger
        render={<button className="rounded-md border px-4 py-2 text-sm" />}
      >
        Open task details
      </UI.DrawerTrigger>
      <UI.DrawerContent>
        <UI.DrawerHeader>
          <UI.DrawerTitle>Update onboarding checklist</UI.DrawerTitle>
          <UI.DrawerDescription>
            Task · Assigned to Alex Morgan
          </UI.DrawerDescription>
        </UI.DrawerHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          Review the first-run experience and document any missing steps.
        </div>
      </UI.DrawerContent>
    </UI.Drawer>
  ),
};
