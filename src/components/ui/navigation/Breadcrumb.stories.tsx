import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Breadcrumb'

const meta = { title: 'UI/navigation/Breadcrumb', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Breadcrumb /> ,
}

