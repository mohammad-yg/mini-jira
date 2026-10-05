import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./AlertDialog";

const meta = {
  title: "UI/overlays/AlertDialog",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.AlertDialog>
      <UI.AlertDialogTrigger
        render={
          <button className="rounded-md border border-destructive px-4 py-2 text-sm text-destructive" />
        }
      >
        Delete project
      </UI.AlertDialogTrigger>
      <UI.AlertDialogContent>
        <UI.AlertDialogHeader>
          <UI.AlertDialogTitle>Delete this project?</UI.AlertDialogTitle>
          <UI.AlertDialogDescription>
            This action cannot be undone. All tasks and project activity will be
            removed.
          </UI.AlertDialogDescription>
        </UI.AlertDialogHeader>
        <UI.AlertDialogFooter>
          <UI.AlertDialogCancel>Cancel</UI.AlertDialogCancel>
          <UI.AlertDialogAction>Delete project</UI.AlertDialogAction>
        </UI.AlertDialogFooter>
      </UI.AlertDialogContent>
    </UI.AlertDialog>
  ),
};
