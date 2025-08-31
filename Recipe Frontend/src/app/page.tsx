import { Header } from '@/components/header';
import { RecipeGenerator } from '@/components/recipe-generator';
import { SubstitutionSuggester } from '@/components/substitution-suggester';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-20 text-center bg-gradient-to-b from-background to-background/80">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
              Build Dishes to Your Plate
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70 font-body">
              Turn your random ingredients into culinary masterpieces. Dishcovery's AI chef is ready to create your next favorite meal.
            </p>
          </div>
        </section>

        <section id="generate" className="py-12 md:py-20 container mx-auto px-4">
          <RecipeGenerator />
        </section>

        <section className="py-12 md:py-20 bg-primary/5">
            <div className="container mx-auto px-4">
                <SubstitutionSuggester />
            </div>
        </section>
      </main>
      <footer className="py-6 border-t border-primary/10">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Recipe Generate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
