import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AuthLayout } from "./AuthLayout"

const meta = { title: "Auth/Pages/Layout", component: AuthLayout, tags: ["autodocs"] } satisfies Meta<typeof AuthLayout>
export default meta
type Story = StoryObj<typeof meta>
export const Preview: Story = { args: { children: null }, render: () => <AuthLayout><div className="rounded-xl border bg-card p-8"><h2 className="text-2xl font-semibold">Welcome back</h2><p className="mt-2 text-muted-foreground">Sign in to your workspace.</p></div></AuthLayout> }
