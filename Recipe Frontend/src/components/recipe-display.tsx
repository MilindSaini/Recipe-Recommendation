import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Recipe {
  recipeName: string;
  instructions: string;
  nutritionalInfo?: string | null;
  substitutedIngredients?: string | null;
  imageUrl?: string | null;
}

interface RecipeDisplayProps {
  recipe: Recipe;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <Card className="w-full mt-8 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">{recipe.recipeName}</CardTitle>
        {recipe.substitutedIngredients && (
            <CardDescription>
                Using substitutions for: {recipe.substitutedIngredients}
            </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={recipe.imageUrl || "https://picsum.photos/800/600"}
            alt={recipe.recipeName}
            fill
            className="object-cover"
            data-ai-hint="recipe food"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-headline font-semibold">Instructions</h3>
          <div className="space-y-2">
            {recipe.instructions.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                <p key={index} className="font-body text-foreground/80 leading-relaxed">{line}</p>
            ))}
          </div>
        </div>

        {recipe.nutritionalInfo && (
          <div className="space-y-4">
            <h3 className="text-2xl font-headline font-semibold">Nutritional Information</h3>
            <p className="font-body text-foreground/80">{recipe.nutritionalInfo}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
