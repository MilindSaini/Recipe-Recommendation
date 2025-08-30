
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChefHat } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  
  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
  
    fetch('http://localhost:8080/api/auth/public/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'User registered successfully!') {
          // Optionally, redirect to login or auto-login
          // router.push('/login');
          alert('Signup successful! Please log in.');
          router.push('/login');
        } else {
          console.error('Signup failed:', data.message);
          alert(data.message || 'Signup failed');
        }
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        alert('Error during signup');
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
       <Link href="/" className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 group">
          <ChefHat className="w-8 h-8 text-primary group-hover:animate-pulse" />
          <h1 className="text-2xl font-headline font-bold text-primary">Dishcovery</h1>
        </Link>
      <div className="w-full max-w-md">
        <Card className="shadow-2xl shadow-primary/10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-headline !mt-6">Create an Account</CardTitle>
            <CardDescription>Join us to discover and create amazing recipes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSignup}>
               <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" placeholder="yourusername" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline text-primary font-semibold">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
