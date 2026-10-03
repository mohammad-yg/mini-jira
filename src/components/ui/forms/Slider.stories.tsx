import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Slider'

const meta = { title: 'UI/forms/Slider', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Slider /> ,
}

