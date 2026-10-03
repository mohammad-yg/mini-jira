import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './AspectRatio'

const meta = { title: 'UI/data-display/AspectRatio', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.AspectRatio ratio={16 / 9} className="grid max-w-xl place-items-center rounded-xl bg-muted text-muted-foreground">16:9 preview</UI.AspectRatio>,
}

