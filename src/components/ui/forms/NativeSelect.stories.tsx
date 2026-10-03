import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './NativeSelect'

const meta = { title: 'UI/forms/NativeSelect', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <div className="grid max-w-xs gap-2"><label className="text-sm font-medium">Priority</label><UI.NativeSelect defaultValue="medium"><UI.NativeSelectOption value="low">Low</UI.NativeSelectOption><UI.NativeSelectOption value="medium">Medium</UI.NativeSelectOption><UI.NativeSelectOption value="high">High</UI.NativeSelectOption></UI.NativeSelect></div>,
}

