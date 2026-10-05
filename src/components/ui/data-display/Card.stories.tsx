import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Card";

const meta = {
  title: "UI/data-display/Card",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Card className="max-w-sm">
      <UI.CardHeader>
        <UI.CardTitle>Website refresh</UI.CardTitle>
        <UI.CardDescription>Project · Updated 2 hours ago</UI.CardDescription>
      </UI.CardHeader>
      <UI.CardContent>
        <p className="text-muted-foreground">
          Redesign the marketing site and improve the onboarding flow.
        </p>
      </UI.CardContent>
      <UI.CardFooter>
        <span className="text-xs text-muted-foreground">8 open tasks</span>
      </UI.CardFooter>
    </UI.Card>
  ),
};
