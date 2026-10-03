import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './ToggleGroup'

const meta = { title: 'UI/actions/ToggleGroup', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.ToggleGroup /> ,
}

