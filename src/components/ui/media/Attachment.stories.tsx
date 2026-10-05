import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as UI from "./Attachment";

const meta = {
  title: "UI/media/Attachment",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UI.AttachmentGroup>
      <UI.Attachment>
        <UI.AttachmentMedia>
          <span>PDF</span>
        </UI.AttachmentMedia>
        <UI.AttachmentContent>
          <UI.AttachmentTitle>Project brief.pdf</UI.AttachmentTitle>
          <UI.AttachmentDescription>
            2.4 MB · Uploaded just now
          </UI.AttachmentDescription>
        </UI.AttachmentContent>
        <UI.AttachmentActions>
          <UI.AttachmentAction aria-label="Remove attachment">
            ×
          </UI.AttachmentAction>
        </UI.AttachmentActions>
      </UI.Attachment>
    </UI.AttachmentGroup>
  ),
};
