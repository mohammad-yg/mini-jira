import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Calendar'

const meta = { title: 'UI/calendar/Calendar', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Calendar /> ,
}

