import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Pagination'

const meta = { title: 'UI/navigation/Pagination', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Pagination /> ,
}

