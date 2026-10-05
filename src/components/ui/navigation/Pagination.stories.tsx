import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Pagination";

const meta = {
  title: "UI/navigation/Pagination",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Pagination>
      <UI.PaginationContent>
        <UI.PaginationItem>
          <UI.PaginationPrevious href="#previous" />
        </UI.PaginationItem>
        <UI.PaginationItem>
          <UI.PaginationLink href="#1">1</UI.PaginationLink>
        </UI.PaginationItem>
        <UI.PaginationItem>
          <UI.PaginationLink href="#2" isActive>
            2
          </UI.PaginationLink>
        </UI.PaginationItem>
        <UI.PaginationItem>
          <UI.PaginationLink href="#3">3</UI.PaginationLink>
        </UI.PaginationItem>
        <UI.PaginationItem>
          <UI.PaginationEllipsis />
        </UI.PaginationItem>
        <UI.PaginationItem>
          <UI.PaginationNext href="#next" />
        </UI.PaginationItem>
      </UI.PaginationContent>
    </UI.Pagination>
  ),
};
