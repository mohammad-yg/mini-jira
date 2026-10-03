import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Table'

const meta = { title: 'UI/data-display/Table', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <div className="w-full max-w-2xl"><UI.Table><UI.TableCaption>Recent tasks in the current sprint</UI.TableCaption><UI.TableHeader><UI.TableRow><UI.TableHead>Task</UI.TableHead><UI.TableHead>Assignee</UI.TableHead><UI.TableHead>Status</UI.TableHead></UI.TableRow></UI.TableHeader><UI.TableBody><UI.TableRow><UI.TableCell className="font-medium">Design sign-in page</UI.TableCell><UI.TableCell>Alex Morgan</UI.TableCell><UI.TableCell>In progress</UI.TableCell></UI.TableRow><UI.TableRow><UI.TableCell className="font-medium">Set up CI pipeline</UI.TableCell><UI.TableCell>Sam Lee</UI.TableCell><UI.TableCell>To do</UI.TableCell></UI.TableRow></UI.TableBody></UI.Table></div>,
}

