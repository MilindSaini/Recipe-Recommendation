
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface Recipe {
  recipeName: string;
  instructions: string;
  nutritionalInfo?: string | null;
  substitutedIngredients?: string | null;
  ingredients: string;
  dietaryRestrictions?: string;
}

export default function HistoryPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        setIsLoggedIn(true);
        try {
          const token = JSON.parse(loggedInUser).token; // Assuming the user object in localStorage has a 'token' field
          const response = await fetch('http://localhost:8080/api/history', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setRecipes(data);
          } else {
            // Handle error, e.g., unauthorized, server error
            console.error('Failed to fetch recipe history');
            router.push('/login'); // Redirect if fetching fails
          }
        } catch (error) {
          console.error('Error fetching recipe history:', error);
          router.push('/login'); // Redirect on error
        }
      } else {
        router.push('/login');
      }
    };

    fetchHistory();

  }, [router]);

  if (!isLoggedIn) {
 return (
 <div className="flex flex-col min-h-screen items-center justify-center">
 <p>Redirecting to login...</p>
 </div>
 );
  }

 return (
 <div className="flex flex-col min-h-screen">
 <Header />
 <main className="flex-1">
 <section className="py-12 md:py-20 container mx-auto px-4">
 <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight text-center">
            Your Recipe History
 </h1>
 <p className="mt-4 max-w-3xl mx-auto text-lg text-center md:text-xl text-foreground/70 font-body">
            Here are all the delicious recipes you've generated.
 </p>

 <div className="mt-12">
          {recipes.length > 0 ? (
 <div className="grid gap-8">
              {recipes.map((recipe, index) => (
 <Card key={index} className="shadow-lg">
 <CardHeader>
 <CardTitle className="font-headline text-2xl text-primary">{recipe.recipeName}</CardTitle>
                      <CardDescription>
 Based on: {recipe.ingredients}
 {recipe.dietaryRestrictions && recipe.dietaryRestrictions !== 'none' && ` | ${recipe.dietaryRestrictions}`}
                      </CardDescription>
 </CardHeader>
 <CardContent>
 <div>
 <h3 className="text-xl font-headline font-semibold mb-2">Instructions</h3>
 <div className="space-y-2 text-foreground/80 font-body">
                          {recipe.instructions.split('\n').filter(line => line.trim() !== '').map((line, i) => (
 <p key={i}>{line}</p>
 ))}
 </div>
 </div>
                      {recipe.nutritionalInfo && (
 <>
 <Separator className="my-6" />
 <div>
 <h3 className="text-xl font-headline font-semibold mb-2">Nutritional Information</h3>
 <p className="text-foreground/80 font-body">{recipe.nutritionalInfo}</p>
 </div>
 </>
 )}
                      {recipe.substitutedIngredients && (
 <>
 <Separator className="my-6" />
 <div>
 <h3 className="text-xl font-headline font-semibold mb-2">Substitutions Made</h3>
 <p className="text-foreground/80 font-body">Used substitutions for: {recipe.substitutedIngredients}</p>
 </div>
 </>
 )}
 </CardContent>
 </Card>
 ))}
 </div>
 ) : (
 <div className="text-center py-16 border-2 border-dashed border-primary/20 rounded-lg">
 <h2 className="text-2xl font-headline">No Recipes Yet!</h2>
 <p className="text-foreground/60 mt-2 font-body">You haven't generated any recipes. Let's create one!</p>
 <Button asChild className="mt-6">
 <Link href="/#generate">Generate a Recipe</Link>
 </Button>
 </div>
 )}
 </div>
 </section>
 </main>
      <footer className="py-6 border-t border-primary/10">
 <div className="container mx-auto text-center text-sm text-muted-foreground">
 <p>&copy; {new Date().getFullYear()} Dishcovery. All rights reserved.</p>
 </div>
 </footer>
 </div>
  );
}
