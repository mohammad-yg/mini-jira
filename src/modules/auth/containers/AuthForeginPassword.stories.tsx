import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthForeginPassword } from "./AuthForeginPassword";

const meta = {
  title: "Auth/Pages/Forgot Password",
  component: AuthForeginPassword,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof AuthForeginPassword>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
