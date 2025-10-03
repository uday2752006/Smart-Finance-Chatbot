'use server';

/**
 * @fileOverview A Genkit flow for providing personalized savings tips via a chatbot.
 *
 * - getSavingsTips - A function that takes user input and returns personalized savings tips.
 * - SavingsTipsInput - The input type for the getSavingsTips function.
 * - SavingsTipsOutput - The return type for the getSavingsTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SavingsTipsInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input or question related to savings tips.'),
  financialSituation: z
    .string()
    .optional()
    .describe('Optional description of the user\u0027s current financial situation.'),
});
export type SavingsTipsInput = z.infer<typeof SavingsTipsInputSchema>;

const SavingsTipsOutputSchema = z.object({
  savingsTips: z.array(z.string()).describe('A list of personalized savings tips.'),
});
export type SavingsTipsOutput = z.infer<typeof SavingsTipsOutputSchema>;

export async function getSavingsTips(input: SavingsTipsInput): Promise<SavingsTipsOutput> {
  return savingsTipsFlow(input);
}

const savingsTipsPrompt = ai.definePrompt({
  name: 'savingsTipsPrompt',
  input: {schema: SavingsTipsInputSchema},
  output: {schema: SavingsTipsOutputSchema},
  prompt: `You are a helpful financial advisor chatbot. A user is asking for savings tips.

User input: {{{userInput}}}

{{#if financialSituation}}
User's financial situation: {{{financialSituation}}}
{{/if}}

Provide a list of personalized and actionable savings tips based on the user input and their financial situation, if provided. Be concise and avoid being too verbose.

Format your response as a JSON array of strings.`,
});

const savingsTipsFlow = ai.defineFlow(
  {
    name: 'savingsTipsFlow',
    inputSchema: SavingsTipsInputSchema,
    outputSchema: SavingsTipsOutputSchema,
  },
  async input => {
    const {output} = await savingsTipsPrompt(input);
    return output!;
  }
);
