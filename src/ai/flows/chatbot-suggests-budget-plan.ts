'use server';
/**
 * @fileOverview A Genkit flow that suggests a budget plan based on user income and expenses.
 *
 * - chatbotSuggestsBudgetPlan - A function that suggests a budget plan based on user income and expenses.
 * - ChatbotSuggestsBudgetPlanInput - The input type for the chatbotSuggestsBudgetPlan function.
 * - ChatbotSuggestsBudgetPlanOutput - The return type for the chatbotSuggestsBudgetPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotSuggestsBudgetPlanInputSchema = z.object({
  monthlyIncome: z.number().describe('The user\'s monthly income.'),
  monthlyExpenses: z.number().describe('The user\'s monthly expenses.'),
});
export type ChatbotSuggestsBudgetPlanInput = z.infer<typeof ChatbotSuggestsBudgetPlanInputSchema>;

const ChatbotSuggestsBudgetPlanOutputSchema = z.object({
  budgetPlan: z.string().describe('A detailed budget plan based on the user\'s income and expenses.'),
});
export type ChatbotSuggestsBudgetPlanOutput = z.infer<typeof ChatbotSuggestsBudgetPlanOutputSchema>;

export async function chatbotSuggestsBudgetPlan(input: ChatbotSuggestsBudgetPlanInput): Promise<ChatbotSuggestsBudgetPlanOutput> {
  return chatbotSuggestsBudgetPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotSuggestsBudgetPlanPrompt',
  input: {schema: ChatbotSuggestsBudgetPlanInputSchema},
  output: {schema: ChatbotSuggestsBudgetPlanOutputSchema},
  prompt: `You are a personal finance advisor bot. A user will provide their income and expenses.
Based on their provided income and expenses, generate a detailed budget plan with specific recommendations for how they can save money and allocate their funds effectively.

Income: {{monthlyIncome}}
Expenses: {{monthlyExpenses}}`,
});

const chatbotSuggestsBudgetPlanFlow = ai.defineFlow(
  {
    name: 'chatbotSuggestsBudgetPlanFlow',
    inputSchema: ChatbotSuggestsBudgetPlanInputSchema,
    outputSchema: ChatbotSuggestsBudgetPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
