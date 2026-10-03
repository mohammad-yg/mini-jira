import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Select'

const meta = { title: 'UI/forms/Select', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <div className="grid max-w-xs gap-2"><label className="text-sm font-medium">Task status</label><UI.Select defaultValue="in-progress"><UI.SelectTrigger className="w-full"><UI.SelectValue placeholder="Choose status" /></UI.SelectTrigger><UI.SelectContent><UI.SelectItem value="todo">To do</UI.SelectItem><UI.SelectItem value="in-progress">In progress</UI.SelectItem><UI.SelectItem value="done">Done</UI.SelectItem></UI.SelectContent></UI.Select></div>,
}

