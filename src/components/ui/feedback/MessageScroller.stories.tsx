import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './MessageScroller'

const meta = { title: 'UI/feedback/MessageScroller', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.MessageScroller /> ,
}

