import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthRegister } from "./AuthRegister";

const meta = {
  title: "Auth/Pages/Sign Up",
  component: AuthRegister,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof AuthRegister>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
