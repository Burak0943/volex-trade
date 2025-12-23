import Link from "next/link";
import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <Card className="w-full max-w-md border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">Log in to Volex Trade</CardTitle>
                    <CardDescription>
                        Enter your email and password to access your terminal.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={login} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required className="bg-black/50 border-gray-700" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                            <Input id="password" name="password" type="password" required className="bg-black/50 border-gray-700" />
                        </div>
                        {searchParams?.error && (
                            <p className="text-sm text-loss font-medium text-center">{searchParams.error}</p>
                        )}
                        <Button type="submit" className="w-full bg-profit text-black hover:bg-profit/90">
                            Log In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center text-sm">
                    <Link href="/signup" className="text-gray-400 hover:text-white transition-colors">
                        Don&apos;t ave an account? Sign Up
                    </Link>
                    <Link href="/" className="text-gray-500 hover:text-gray-400 underline">
                        Back to Home
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
