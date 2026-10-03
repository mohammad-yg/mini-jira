import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './InputOTP'

const meta = { title: 'UI/forms/InputOTP', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <div className="grid gap-2"><p className="text-sm font-medium">Enter verification code</p><UI.InputOTP maxLength={6} value="482"><UI.InputOTPGroup><UI.InputOTPSlot index={0} /><UI.InputOTPSlot index={1} /><UI.InputOTPSlot index={2} /><UI.InputOTPSeparator /><UI.InputOTPSlot index={3} /><UI.InputOTPSlot index={4} /><UI.InputOTPSlot index={5} /></UI.InputOTPGroup></UI.InputOTP></div>,
}

