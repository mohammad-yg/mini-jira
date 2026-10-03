import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './ContextMenu'

const meta = { title: 'UI/overlays/ContextMenu', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.ContextMenu /> ,
}

