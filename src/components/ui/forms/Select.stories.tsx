import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Select'

const meta = { title: 'UI/forms/Select', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Select /> ,
}

