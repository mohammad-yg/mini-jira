import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Accordion'

const meta = { title: 'UI/data-display/Accordion', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Accordion className="max-w-lg"><UI.AccordionItem value="overview"><UI.AccordionTrigger>Project overview</UI.AccordionTrigger><UI.AccordionContent>Plan and track the work your team needs to deliver.</UI.AccordionContent></UI.AccordionItem><UI.AccordionItem value="members"><UI.AccordionTrigger>Team members</UI.AccordionTrigger><UI.AccordionContent>Invite teammates and manage project access.</UI.AccordionContent></UI.AccordionItem></UI.Accordion>,
}

