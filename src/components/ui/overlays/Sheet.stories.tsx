import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Sheet'

const meta = { title: 'UI/overlays/Sheet', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Sheet /> ,
}

