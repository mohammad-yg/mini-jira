import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Textarea'

const meta = { title: 'UI/forms/Textarea', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Textarea /> ,
}

