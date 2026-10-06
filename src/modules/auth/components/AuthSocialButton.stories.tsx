import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthSocialButton } from "./AuthSocialButton";

const meta = {
  title: "Auth/Components/SocialButton",
  component: AuthSocialButton,
  tags: ["autodocs"],
} satisfies Meta<typeof AuthSocialButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Google: Story = { args: { provider: "Google" } };
