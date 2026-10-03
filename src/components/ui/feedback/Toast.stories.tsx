import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Toast'

const storyToastManager = UI.createToastManager()

const meta = { title: 'UI/feedback/Toast', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Toaster toastManager={storyToastManager}><button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground" onClick={() => storyToastManager.add({ title: 'Task created', description: 'Your task is ready in the backlog.', type: 'success' })}>Show success toast</button></UI.Toaster>,
}


