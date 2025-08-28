"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { suggestSubstitutionsAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface Substitutions {
    substitutions: string;
    reasoning: string;
}

const initialState: {
    substitutions: Substitutions | null;
    error: string | null;
} = {
  substitutions: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" variant="secondary" disabled={pending}>
      {pending ? <Loader2 className="animate-spin mr-2" /> : null}
      Find Substitutions
    </Button>
  );
}

export function SubstitutionSuggester() {
  const [state, formAction] = useActionState(suggestSubstitutionsAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg border-accent/20">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Find Ingredient Substitutions</CardTitle>
            <CardDescription>
              Need to swap an ingredient? We've got you covered.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ingredient">Ingredient to Substitute</Label>
              <Input
                id="ingredient"
                name="ingredient"
                placeholder="e.g., butter"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions (optional)</Label>
              <Input
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                placeholder="e.g., vegan, dairy-free"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availableIngredients">Available Ingredients (optional)</Label>
              <Input
                id="availableIngredients"
                name="availableIngredients"
                placeholder="e.g., olive oil, coconut oil, flour"
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      {state.substitutions && (
        <Card className="mt-6 border-accent/20">
          <CardHeader>
            <CardTitle className="font-headline">Suggested Substitutions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-wrap gap-2">
                {state.substitutions.substitutions.split(',').map(sub => <Badge key={sub} variant="outline" className="border-accent text-accent-foreground">{sub.trim()}</Badge>)}
            </div>
            <div>
                <h4 className="font-semibold font-headline mt-4">Reasoning</h4>
                <p className="text-sm text-muted-foreground font-body">{state.substitutions.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
