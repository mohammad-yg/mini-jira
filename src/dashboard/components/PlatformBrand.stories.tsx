import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { PlatformBrand } from "./PlatformBrand";

const meta = {
  title: "Dashboard/Header/Platform brand",
  component: PlatformBrand,
  parameters: { layout: "centered" },
} satisfies Meta<typeof PlatformBrand>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const brandLink = within(canvasElement).getByRole("link", {
      name: "Mini Jira dashboard",
    });
    await expect(brandLink).toHaveAttribute("href", "/");
    await expect(brandLink).toHaveTextContent("mini Jira");
  },
};
