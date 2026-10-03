import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Bubble'

const meta = { title: 'UI/media/Bubble', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.BubbleGroup className="max-w-md"><UI.Bubble><UI.BubbleContent>Could someone review the latest mockups?</UI.BubbleContent></UI.Bubble><UI.Bubble align="end"><UI.BubbleContent>Done — I left a few notes on the board.</UI.BubbleContent><UI.BubbleReactions>👍 2</UI.BubbleReactions></UI.Bubble></UI.BubbleGroup>,
}

