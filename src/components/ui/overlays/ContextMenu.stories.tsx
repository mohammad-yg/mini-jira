import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './ContextMenu'

const meta = { title: 'UI/overlays/ContextMenu', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.ContextMenu><UI.ContextMenuTrigger className="grid h-40 w-full max-w-sm place-items-center rounded-lg border border-dashed text-sm text-muted-foreground">Right-click this project card</UI.ContextMenuTrigger><UI.ContextMenuContent><UI.ContextMenuItem>Open project</UI.ContextMenuItem><UI.ContextMenuItem>Copy link</UI.ContextMenuItem><UI.ContextMenuSeparator /><UI.ContextMenuItem variant="destructive">Archive project</UI.ContextMenuItem></UI.ContextMenuContent></UI.ContextMenu>,
}

