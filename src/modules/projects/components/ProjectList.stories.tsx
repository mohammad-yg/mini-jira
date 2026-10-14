import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SWRConfig } from "swr";
import { expect, within } from "storybook/test";
import type { ProjectListItem } from "../types";
import { ProjectList } from "./ProjectList";

const initialProjects: ProjectListItem[] = [
  {
    id: "mini-jira",
    name: "Mini Jira",
    key: "MJ",
    description: "Plan and track the work that moves your team forward.",
  },
  {
    id: "atlas-mobile",
    name: "Atlas Mobile",
    key: "AM",
    description: "A mobile workspace for the Atlas product team.",
  },
];

const meta = {
  title: "Projects/Project list",
  component: ProjectList,
  args: { initialValue: initialProjects },
  decorators: [
    (Story) => (
      <SWRConfig
        value={{
          provider: () => new Map(),
          revalidateOnMount: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          shouldRetryOnError: false,
        }}
      >
        <Story />
      </SWRConfig>
    ),
  ],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("list")).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Mini Jira" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Atlas Mobile" }),
    ).toBeVisible();
  },
};

export const Empty: Story = {
  args: { initialValue: [] },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText("No projects are available yet."),
    ).toBeVisible();
  },
};
