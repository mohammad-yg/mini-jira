import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Message'

const meta = { title: 'UI/feedback/Message', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Message /> ,
}

