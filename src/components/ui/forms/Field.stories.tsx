import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Field'

const meta = { title: 'UI/forms/Field', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.FieldSet className="max-w-sm"><UI.FieldLegend>Profile</UI.FieldLegend><UI.Field><UI.FieldLabel htmlFor="display-name">Display name</UI.FieldLabel><input id="display-name" className="h-9 rounded-md border bg-background px-3 text-sm" defaultValue="Alex Morgan" /><UI.FieldDescription>This name is visible to your teammates.</UI.FieldDescription></UI.Field></UI.FieldSet>,
}

