import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './AspectRatio'

const meta = { title: 'UI/data-display/AspectRatio', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.AspectRatio /> ,
}

