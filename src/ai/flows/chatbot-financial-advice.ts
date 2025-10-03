'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing financial advice via a chatbot.
 *
 * It includes:
 * - `getFinancialAdvice`: A function to get financial advice based on user input.
 * - `FinancialAdviceInput`: The input type for the `getFinancialAdvice` function.
 * - `FinancialAdviceOutput`: The output type for the `getFinancialAdvice` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialAdviceInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input asking for financial advice or guidance.'),
});
export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;

const FinancialAdviceOutputSchema = z.object({
  advice: z.string().describe('The financial advice provided by the chatbot.'),
});
export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function getFinancialAdvice(input: FinancialAdviceInput): Promise<FinancialAdviceOutput> {
  return financialAdviceFlow(input);
}

const financialAdvicePrompt = ai.definePrompt({
  name: 'financialAdvicePrompt',
  input: {schema: FinancialAdviceInputSchema},
  output: {schema: FinancialAdviceOutputSchema},
  prompt: `You are a helpful finance assistant chatbot. A user will ask a question and you should answer it with helpful financial advice.

User question: {{{userInput}}}`,
});

const financialAdviceFlow = ai.defineFlow(
  {
    name: 'financialAdviceFlow',
    inputSchema: FinancialAdviceInputSchema,
    outputSchema: FinancialAdviceOutputSchema,
  },
  async input => {
    const {output} = await financialAdvicePrompt(input);
    return output!;
  }
);
