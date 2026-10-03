import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Button'

const meta = { title: 'UI/actions/Button', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Button /> ,
}

