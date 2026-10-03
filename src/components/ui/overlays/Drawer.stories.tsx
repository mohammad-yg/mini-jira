import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Drawer'

const meta = { title: 'UI/overlays/Drawer', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Drawer /> ,
}

