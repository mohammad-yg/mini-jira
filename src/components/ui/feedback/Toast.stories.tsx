import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Toast'

const meta = { title: 'UI/feedback/Toast', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Toaster />,
}


