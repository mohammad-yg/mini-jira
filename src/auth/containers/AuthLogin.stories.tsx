import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AuthLogin } from "./AuthLogin"

const meta = { title: "Auth/Pages/Sign In", component: AuthLogin, parameters: { layout: "fullscreen" }, tags: ["autodocs"] } satisfies Meta<typeof AuthLogin>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
