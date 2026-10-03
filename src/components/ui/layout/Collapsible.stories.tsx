import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Collapsible'

const meta = { title: 'UI/layout/Collapsible', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Collapsible className="w-full max-w-md"><div className="flex items-center justify-between rounded-md border px-4 py-3"><span className="text-sm font-medium">Sprint details</span><UI.CollapsibleTrigger className="text-sm text-primary">Toggle</UI.CollapsibleTrigger></div><UI.CollapsibleContent className="px-4 py-3 text-sm text-muted-foreground">Sprint 12 · Oct 5–16 · 8 tasks</UI.CollapsibleContent></UI.Collapsible>,
}

