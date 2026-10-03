import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Tabs'

const meta = { title: 'UI/navigation/Tabs', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Tabs /> ,
}

