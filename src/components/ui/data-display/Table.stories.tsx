import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Table'

const meta = { title: 'UI/data-display/Table', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Table /> ,
}

