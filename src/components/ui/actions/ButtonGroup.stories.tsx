import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './ButtonGroup'

const meta = { title: 'UI/actions/ButtonGroup', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.ButtonGroup /> ,
}

