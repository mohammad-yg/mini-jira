import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './ScrollArea'

const meta = { title: 'UI/layout/ScrollArea', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.ScrollArea className="h-56 w-64 rounded-md border"><div className="p-4"><h3 className="mb-3 text-sm font-semibold">Project activity</h3>{["Alex created a task", "Sam updated a label", "Mina completed a sprint", "Alex invited a teammate", "Sam moved a task"].map((item, index) => <div key={item} className="border-b py-3 text-sm text-muted-foreground">{item}<span className="block text-xs">{index + 1}h ago</span></div>)}</div></UI.ScrollArea>,
}

