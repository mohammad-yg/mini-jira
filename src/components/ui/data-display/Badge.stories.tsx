import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Badge'

const meta = { title: 'UI/data-display/Badge', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Badge /> ,
}

