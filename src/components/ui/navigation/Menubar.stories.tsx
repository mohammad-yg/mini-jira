import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Menubar'

const meta = { title: 'UI/navigation/Menubar', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Menubar /> ,
}

