import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { dashboardUser } from "../data/dashboard-mock-data";
import { UserProfileMenu } from "./UserProfileMenu";

const meta = {
  title: "Dashboard/Header/User profile",
  component: UserProfileMenu,
  args: {
    user: dashboardUser,
    signOutAction: async () => undefined,
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof UserProfileMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /alex morgan/i }));

    const menu = await within(document.body).findByRole("menu");
    await waitFor(async () => {
      await expect(
        within(menu).getByText("Workspace administrator"),
      ).toBeVisible();
      await expect(
        within(menu).getByText("alex.morgan@minijira.local"),
      ).toBeVisible();
      const profileImage = within(menu).getByRole("img", {
        name: "Alex Morgan",
      });
      await expect(profileImage).toBeVisible();
      await expect(profileImage.parentElement).toHaveAttribute(
        "data-size",
        "lg",
      );
      await expect(profileImage.parentElement).toHaveClass("size-14");
      await expect(
        within(menu).getByRole("menuitem", { name: /sign out/i }),
      ).toBeVisible();
    });
  },
};
