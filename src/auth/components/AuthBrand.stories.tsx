import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AuthBrand } from "./AuthBrand"

const meta = { title: "Auth/Components/Brand", component: AuthBrand, tags: ["autodocs"] } satisfies Meta<typeof AuthBrand>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
