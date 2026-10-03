import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Accordion'

const meta = { title: 'UI/data-display/Accordion', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Accordion /> ,
}

