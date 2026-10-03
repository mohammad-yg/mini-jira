import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Alert'

const meta = { title: 'UI/feedback/Alert', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Alert /> ,
}

