'use server';

/**
 * @fileOverview Recipe generation flow based on user-provided ingredients and dietary restrictions.
 *
 * - generateRecipe - A function that generates a recipe based on the input.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients available to the user.'),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe(
      'Any dietary restrictions the user has, such as vegetarian, gluten-free, or dairy-free.'
    ),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  instructions: z.string().describe('Detailed instructions for preparing the recipe.'),
  nutritionalInfo: z
    .string()
    .optional()
    .describe('Nutritional information for the recipe, if available.'),
  substitutedIngredients: z
    .string()
    .optional()
    .describe("list of substituted ingredients, to accomodate dietary restrictions and match available ingredients"),
  imageUrl: z.string().optional().describe("A URL for an image of the recipe."),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  // Switching to json mode is recommended for consistent object output.
  output: {schema: GenerateRecipeOutputSchema, format: 'json'},
  prompt: `You are a professional chef who specializes in creating recipes based on available ingredients and dietary restrictions.

  Please generate a recipe based on the following ingredients:
  Ingredients: {{{ingredients}}}

  Dietary Restrictions: {{#if dietaryRestrictions}}{{{dietaryRestrictions}}}{{else}}None{{/if}}

  The recipe should include a name, detailed instructions, and nutritional information if available. If unable to find exact ingredients, automatically provide reasonable ingredient substitutions.
  Make sure to list any ingredient substitutions that were used to generate the recipe, taking into consideration dietary restrictions.
  `,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate recipe');
    }

    const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
    const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;
    if (EDAMAM_APP_ID && EDAMAM_APP_KEY) {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${output.recipeName}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;
      console.log('Edamam API URL:', url);
      try {
        const response = await fetch(url, {
          headers: {
            'Edamam-Account-User': 'user1234', // Required by Edamam API
          }
        });
        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
          output.imageUrl = data.hits[0].recipe.image;
        }
      } catch (error) {
        console.error('Error fetching from Edamam API:', error);
      }
    }
    return output;
  }
);
