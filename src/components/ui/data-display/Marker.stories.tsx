import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Marker'

const meta = { title: 'UI/data-display/Marker', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Marker><UI.MarkerIcon><span className="size-2 rounded-full bg-emerald-500" /></UI.MarkerIcon><UI.MarkerContent>On track</UI.MarkerContent></UI.Marker>,
}

