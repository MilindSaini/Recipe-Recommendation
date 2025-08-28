'use server';

/**
 * @fileOverview A flow that suggests ingredient substitutions based on dietary restrictions or ingredient availability.
 *
 * - suggestSubstitutions - A function that handles the ingredient substitution process.
 * - SuggestSubstitutionsInput - The input type for the suggestSubstitutions function.
 * - SuggestSubstitutionsOutput - The return type for the suggestSubstitutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSubstitutionsInputSchema = z.object({
  ingredient: z.string().describe('The ingredient to find a substitution for.'),
  dietaryRestrictions: z
    .string()
    .describe(
      'Dietary restrictions to consider when suggesting substitutions, such as vegetarian, gluten-free, etc.'
    ),
  availableIngredients: z
    .string()
    .describe('A comma-separated list of ingredients that are currently available.'),
});
export type SuggestSubstitutionsInput = z.infer<typeof SuggestSubstitutionsInputSchema>;

const SuggestSubstitutionsOutputSchema = z.object({
  substitutions: z
    .string()
    .describe(
      'A comma-separated list of suggested substitutions for the ingredient, considering dietary restrictions and available ingredients.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested substitutions.'),
});
export type SuggestSubstitutionsOutput = z.infer<typeof SuggestSubstitutionsOutputSchema>;

export async function suggestSubstitutions(
  input: SuggestSubstitutionsInput
): Promise<SuggestSubstitutionsOutput> {
  return suggestSubstitutionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSubstitutionsPrompt',
  input: {schema: SuggestSubstitutionsInputSchema},
  output: {schema: SuggestSubstitutionsOutputSchema},
  prompt: `You are a helpful assistant that suggests ingredient substitutions based on dietary restrictions and ingredient availability.

  Ingredient: {{{ingredient}}}
  Dietary Restrictions: {{{dietaryRestrictions}}}
  Available Ingredients: {{{availableIngredients}}}

  Suggest substitutions for the ingredient, considering the dietary restrictions and available ingredients. Provide a clear reasoning for each suggestion.

  Substitutions:`,
});

const suggestSubstitutionsFlow = ai.defineFlow(
  {
    name: 'suggestSubstitutionsFlow',
    inputSchema: SuggestSubstitutionsInputSchema,
    outputSchema: SuggestSubstitutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
