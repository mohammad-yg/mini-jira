import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as UI from './Questionnaire'

const meta = { title: 'UI/feedback/Questionnaire', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UI.Questionnaire className="max-w-lg"><UI.QuestionnaireProgress>Question 1 of 2</UI.QuestionnaireProgress><UI.QuestionnaireItem><UI.QuestionnaireTitle>Which view do you use most?</UI.QuestionnaireTitle><UI.QuestionnaireDescription>Choose the view you’d like to see first when opening a project.</UI.QuestionnaireDescription><UI.QuestionnaireChoices><UI.QuestionnaireChoice value="board">Board<UI.QuestionnaireChoiceDescription>Track work across columns.</UI.QuestionnaireChoiceDescription></UI.QuestionnaireChoice><UI.QuestionnaireChoice value="list">List<UI.QuestionnaireChoiceDescription>Review tasks in a compact table.</UI.QuestionnaireChoiceDescription></UI.QuestionnaireChoice></UI.QuestionnaireChoices><UI.QuestionnaireActions><UI.QuestionnaireSkip /><UI.QuestionnaireSubmit /></UI.QuestionnaireActions></UI.QuestionnaireItem></UI.Questionnaire>,
}

