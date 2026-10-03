import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Switch'

const meta = { title: 'UI/forms/Switch', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Switch /> ,
}

