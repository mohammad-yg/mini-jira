import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './NavigationMenu'

const meta = { title: 'UI/navigation/NavigationMenu', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.NavigationMenu><UI.NavigationMenuList><UI.NavigationMenuItem><UI.NavigationMenuTrigger>Product</UI.NavigationMenuTrigger><UI.NavigationMenuContent><div className="grid w-64 gap-2 p-4"><a href="#features" className="rounded-md p-2 hover:bg-muted">Features</a><a href="#roadmap" className="rounded-md p-2 hover:bg-muted">Roadmap</a></div></UI.NavigationMenuContent></UI.NavigationMenuItem><UI.NavigationMenuItem><UI.NavigationMenuLink href="#pricing">Pricing</UI.NavigationMenuLink></UI.NavigationMenuItem></UI.NavigationMenuList></UI.NavigationMenu>,
}

