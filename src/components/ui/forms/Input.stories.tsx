import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Input'

const meta = { title: 'UI/forms/Input', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <div className="grid w-full max-w-sm gap-2"><label htmlFor="story-email" className="text-sm font-medium">Email address</label><UI.Input id="story-email" type="email" placeholder="you@example.com" defaultValue="alex@northstar.dev" /></div>,
}

