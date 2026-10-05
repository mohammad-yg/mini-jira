import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Carousel";

const meta = { title: "UI/media/Carousel", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Carousel className="mx-auto w-full max-w-lg">
      <UI.CarouselContent>
        {["Design", "Build", "Review"].map((title, index) => (
          <UI.CarouselItem key={title}>
            <div className="grid h-48 place-items-center rounded-xl border bg-muted text-xl font-semibold">
              {index + 1}. {title}
            </div>
          </UI.CarouselItem>
        ))}
      </UI.CarouselContent>
      <UI.CarouselPrevious />
      <UI.CarouselNext />
    </UI.Carousel>
  ),
};
