
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { generateRecipeAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RecipeDisplay } from "./recipe-display";
import { Loader2 } from "lucide-react";
import type { GenerateRecipeInput, GenerateRecipeOutput } from "@/ai/flows/generate-recipe";

interface Recipe extends GenerateRecipeOutput, GenerateRecipeInput {}

const initialState: {
    recipe: Recipe | null,
    error: string | null
} = {
  recipe: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full font-bold" disabled={pending}>
      {pending ? <Loader2 className="animate-spin mr-2" /> : null}
      Generate Recipe
    </Button>
  );
}

export function RecipeGenerator() {
  const [state, formAction] = useActionState(generateRecipeAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
    if (state.recipe) {
      toast({
        title: "Recipe Generated!",
        description: `We've cooked up a "${state.recipe.recipeName}" for you.`,
      });
      
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        const newRecipes = [state.recipe, ...storedRecipes];
        localStorage.setItem('recipes', JSON.stringify(newRecipes));
      }
    }
  }, [state, toast]);
  
  const handleFormAction = (formData: FormData) => {
    const ingredients = formData.get('ingredients') as string;
    const dietaryRestrictions = formData.get('dietaryRestrictions') as string;
    
    // Augment the state passed to the action with the raw inputs
    const augmentedAction = (prevState: any) => generateRecipeAction(
      { ...prevState, ingredients, dietaryRestrictions },
      formData
    );
    
    formAction(formData);
  };


  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg border-primary/20">
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Create a Recipe</CardTitle>
            <CardDescription>
              Enter the ingredients you have, and we'll create a delicious recipe for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                placeholder="e.g., chicken breast, broccoli, garlic, olive oil"
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
              <Select name="dietaryRestrictions" defaultValue="none">
                <SelectTrigger id="dietaryRestrictions" className="w-full">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                  <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.recipe && <RecipeDisplay recipe={state.recipe} />}
    </div>
  );
}
