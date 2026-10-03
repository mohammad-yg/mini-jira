import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Combobox'

const meta = { title: 'UI/forms/Combobox', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Combobox items={["Alex Morgan", "Sam Lee", "Mina Patel"]}><label className="mb-2 block text-sm font-medium">Assign to</label><UI.ComboboxInput placeholder="Search teammates..." /><UI.ComboboxContent><UI.ComboboxList><UI.ComboboxItem value="Alex Morgan">Alex Morgan</UI.ComboboxItem><UI.ComboboxItem value="Sam Lee">Sam Lee</UI.ComboboxItem><UI.ComboboxItem value="Mina Patel">Mina Patel</UI.ComboboxItem><UI.ComboboxEmpty>No teammate found.</UI.ComboboxEmpty></UI.ComboboxList></UI.ComboboxContent></UI.Combobox>,
}

