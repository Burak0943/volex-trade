import Link from "next/link";
import { signup } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function SignupPage({ searchParams }: { searchParams: { error?: string } }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <Card className="w-full max-w-md border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
                    <CardDescription>
                        Join Volex Trade and start trading today.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={signup} className="space-y-4">
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
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center text-sm">
                    <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                        Already have an account? Log In
                    </Link>
                    <Link href="/" className="text-gray-500 hover:text-gray-400 underline">
                        Back to Home
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
