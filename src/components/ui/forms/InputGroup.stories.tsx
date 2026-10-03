import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './InputGroup'

const meta = { title: 'UI/forms/InputGroup', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.InputGroup /> ,
}

