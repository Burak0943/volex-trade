"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { createBROWSERClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        const supabase = createBROWSERClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/settings`,
        });

        if (error) {
            toast.error(error.message);
        } else {
            setIsSent(true);
            toast.success("Reset link sent!");
        }
        setIsLoading(false);
    }

    return (
        <div className="flex h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900/50 p-8 border border-slate-800 shadow-xl">
                {!isSent ? (
                    <>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
                            <p className="mt-2 text-sm text-slate-400">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-200">Email Address</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="m@example.com"
                                    className="bg-slate-800/50 border-slate-700 focus:border-profit"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-profit text-slate-950 font-bold hover:bg-profit/90"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-profit/10 text-profit text-3xl">
                            ✉️
                        </div>
                        <h2 className="text-2xl font-bold text-white">Check your email</h2>
                        <p className="text-slate-400">
                            We have sent a password reset link to your email address.
                        </p>
                        <Button asChild className="w-full bg-slate-800 hover:bg-slate-700">
                            <Link href="/login">Back to Login</Link>
                        </Button>
                    </div>
                )}

                {!isSent && (
                    <div className="text-center mt-4">
                        <Link href="/login" className="text-sm text-slate-400 hover:text-white flex items-center justify-center gap-2">
                            ← Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
