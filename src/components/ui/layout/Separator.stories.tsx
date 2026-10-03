import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Separator'

const meta = { title: 'UI/layout/Separator', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <div className="w-64 space-y-3 text-sm"><p>Project settings</p><UI.Separator /><p className="text-muted-foreground">Manage members and access.</p></div>,
}

