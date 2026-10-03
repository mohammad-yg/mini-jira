import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './HoverCard'

const meta = { title: 'UI/overlays/HoverCard', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.HoverCard><UI.HoverCardTrigger render={<a href="#alex" className="font-medium underline underline-offset-4" />}>Alex Morgan</UI.HoverCardTrigger><UI.HoverCardContent><div className="font-medium">Alex Morgan</div><p className="text-sm text-muted-foreground">Product designer · Joined this month</p></UI.HoverCardContent></UI.HoverCard>,
}

