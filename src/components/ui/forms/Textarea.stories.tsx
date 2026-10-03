import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Textarea'

const meta = { title: 'UI/forms/Textarea', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <div className="grid w-full max-w-sm gap-2"><label htmlFor="story-description" className="text-sm font-medium">Description</label><UI.Textarea id="story-description" placeholder="Describe the task..." defaultValue="Update the onboarding flow for new team members." /></div>,
}

