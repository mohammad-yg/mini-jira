import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Tooltip'

const meta = { title: 'UI/overlays/Tooltip', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Tooltip /> ,
}

