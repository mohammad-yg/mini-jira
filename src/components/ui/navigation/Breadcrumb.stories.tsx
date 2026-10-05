import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Breadcrumb";

const meta = {
  title: "UI/navigation/Breadcrumb",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.Breadcrumb>
      <UI.BreadcrumbList>
        <UI.BreadcrumbItem>
          <UI.BreadcrumbLink href="#projects">Projects</UI.BreadcrumbLink>
        </UI.BreadcrumbItem>
        <UI.BreadcrumbSeparator />
        <UI.BreadcrumbItem>
          <UI.BreadcrumbLink href="#website">Website refresh</UI.BreadcrumbLink>
        </UI.BreadcrumbItem>
        <UI.BreadcrumbSeparator />
        <UI.BreadcrumbItem>
          <UI.BreadcrumbPage>Tasks</UI.BreadcrumbPage>
        </UI.BreadcrumbItem>
      </UI.BreadcrumbList>
    </UI.Breadcrumb>
  ),
};
