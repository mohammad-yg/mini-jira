import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Popover'

const meta = { title: 'UI/overlays/Popover', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Popover /> ,
}

