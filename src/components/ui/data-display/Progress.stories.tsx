import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Progress'

const meta = { title: 'UI/data-display/Progress', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Progress value={64} className="w-full max-w-sm"><UI.ProgressLabel>Sprint completion</UI.ProgressLabel><UI.ProgressValue /></UI.Progress>,
}

