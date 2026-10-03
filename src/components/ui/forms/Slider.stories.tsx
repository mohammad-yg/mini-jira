import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Slider'

const meta = { title: 'UI/forms/Slider', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <div className="grid w-full max-w-sm gap-3"><div className="flex justify-between text-sm"><span>Sprint capacity</span><span className="text-muted-foreground">70%</span></div><UI.Slider defaultValue={[70]} max={100} step={5} /></div>,
}

