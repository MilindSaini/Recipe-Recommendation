
'use server';

import { generateRecipe, GenerateRecipeInput, GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { suggestSubstitutions, SuggestSubstitutionsInput, SuggestSubstitutionsOutput } from '@/ai/flows/suggest-substitutions';
import { z } from 'zod';

const recipeSchema = z.object({
  ingredients: z.string().min(10, { message: 'Please enter at least 10 characters for ingredients.' }),
  dietaryRestrictions: z.string().optional(),
});

type RecipeState = {
  recipe: (GenerateRecipeOutput & GenerateRecipeInput) | null;
  error: string | null;
  ingredients?: string;
  dietaryRestrictions?: string;
};

export async function generateRecipeAction(
  prevState: RecipeState,
  formData: FormData
): Promise<RecipeState> {
  const validatedFields = recipeSchema.safeParse({
    ingredients: formData.get('ingredients'),
    dietaryRestrictions: formData.get('dietaryRestrictions'),
  });

  if (!validatedFields.success) {
    return {
      recipe: null,
      error: validatedFields.error.flatten().fieldErrors.ingredients?.[0] || 'Invalid input.',
    };
  }

  try {
    const recipeOutput = await generateRecipe(validatedFields.data as GenerateRecipeInput);
    if (!recipeOutput.recipeName) {
      return { recipe: null, error: "Could not generate a recipe. Please try refining your ingredients." };
    }
    
    // Combine input and output for the state
    const recipe = {
      ...recipeOutput,
      ingredients: validatedFields.data.ingredients,
      dietaryRestrictions: validatedFields.data.dietaryRestrictions,
    };

    return { recipe, error: null };
  } catch (error) {
    console.error(error);
    return { recipe: null, error: 'Failed to generate recipe. Please try again later.' };
  }
}

const substitutionSchema = z.object({
  ingredient: z.string().min(3, { message: 'Please enter an ingredient.' }),
  dietaryRestrictions: z.string().optional(),
  availableIngredients: z.string().optional(),
});


export async function suggestSubstitutionsAction(
  prevState: any,
  formData: FormData
): Promise<{ substitutions: SuggestSubstitutionsOutput | null; error: string | null; }> {
  const validatedFields = substitutionSchema.safeParse({
    ingredient: formData.get('ingredient'),
    dietaryRestrictions: formData.get('dietaryRestrictions'),
    availableIngredients: formData.get('availableIngredients'),
  });

  if (!validatedFields.success) {
    return {
      substitutions: null,
      error: validatedFields.error.flatten().fieldErrors.ingredient?.[0] || 'Invalid input.',
    };
  }

  try {
    const result = await suggestSubstitutions(validatedFields.data as SuggestSubstitutionsInput);
    if (!result.substitutions) {
        return { substitutions: null, error: "Could not find any substitutions." };
    }
    return { substitutions: result, error: null };
  } catch (error) {
    console.error(error);
    return { substitutions: null, error: 'Failed to suggest substitutions. Please try again later.' };
  }
}
