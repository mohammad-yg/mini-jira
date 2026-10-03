import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Collapsible'

const meta = { title: 'UI/layout/Collapsible', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Collapsible /> ,
}

