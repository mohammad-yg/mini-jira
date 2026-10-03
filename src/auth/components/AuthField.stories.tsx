import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AuthField } from "./AuthField"

const meta = { title: "Auth/Components/Field", component: AuthField, tags: ["autodocs"] } satisfies Meta<typeof AuthField>
export default meta
type Story = StoryObj<typeof meta>
export const Email: Story = { args: { id: "email", label: "Email address", type: "email", placeholder: "you@example.com" } }
