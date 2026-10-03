import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './RadioGroup'

const meta = { title: 'UI/forms/RadioGroup', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.RadioGroup /> ,
}

