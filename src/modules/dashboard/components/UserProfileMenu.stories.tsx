import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { UserProfileMenu } from "./UserProfileMenu";

const meta = {
  title: "Dashboard/Header/User profile",
  component: UserProfileMenu,
  parameters: { layout: "padded" },
} satisfies Meta<typeof UserProfileMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /user menu/i }));

    const menu = await within(document.body).findByRole("menu");
    await expect(
      within(menu).getByRole("menuitem", { name: /sign out/i }),
    ).toBeVisible();
  },
};
