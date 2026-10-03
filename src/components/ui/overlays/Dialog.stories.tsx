import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Dialog'

const meta = { title: 'UI/overlays/Dialog', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Dialog><UI.DialogTrigger render={<button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground" />}>Edit profile</UI.DialogTrigger><UI.DialogContent><UI.DialogHeader><UI.DialogTitle>Edit profile</UI.DialogTitle><UI.DialogDescription>Update the name shown to your teammates.</UI.DialogDescription></UI.DialogHeader><div className="grid gap-2"><label htmlFor="profile-name" className="text-sm font-medium">Name</label><input id="profile-name" className="h-9 rounded-md border bg-background px-3 text-sm" defaultValue="Alex Morgan" /></div><UI.DialogFooter><UI.DialogClose render={<button className="rounded-md border px-4 py-2 text-sm" />}>Cancel</UI.DialogClose><button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Save</button></UI.DialogFooter></UI.DialogContent></UI.Dialog>,
}

