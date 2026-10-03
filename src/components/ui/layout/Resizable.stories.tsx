import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Resizable'

const meta = { title: 'UI/layout/Resizable', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.ResizablePanelGroup orientation="horizontal" className="min-h-40 rounded-lg border"><UI.ResizablePanel defaultSize={50}><div className="p-6">پنل اول</div></UI.ResizablePanel><UI.ResizableHandle /><UI.ResizablePanel defaultSize={50}><div className="p-6">پنل دوم</div></UI.ResizablePanel></UI.ResizablePanelGroup>,
}


