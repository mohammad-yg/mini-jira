import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Input'

const meta = { title: 'UI/forms/Input', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Input /> ,
}

