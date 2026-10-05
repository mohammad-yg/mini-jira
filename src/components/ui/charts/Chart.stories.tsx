import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Chart";

const meta = { title: "UI/charts/Chart", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.ChartContainer
      config={{ series: { label: "Tasks", color: "hsl(var(--chart-1))" } }}
      className="h-64 w-full"
    >
      <div className="flex h-full items-center justify-center rounded-md border">
        نمودار نمونه
      </div>
    </UI.ChartContainer>
  ),
};
