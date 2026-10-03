import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Marker'

const meta = { title: 'UI/data-display/Marker', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Marker /> ,
}

