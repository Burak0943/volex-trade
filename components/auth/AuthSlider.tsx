"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthSlider() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const router = useRouter();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            toast.error(error.message);
            setIsLoading(false);
        } else {
            toast.success("Welcome back!");
            router.push("/trade");
            router.refresh();
        }
    }

    async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!acceptedTerms) {
            toast.error("You must agree to the Terms and Privacy Policy.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const username = formData.get("username") as string;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        const supabase = createClient();

        // Check if username exists
        const { data: existingUser } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', username)
            .single();

        if (existingUser) {
            toast.error("Username is already taken.");
            setIsLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
            },
        });

        if (error) {
            toast.error(error.message);
            setIsLoading(false);
        } else {
            toast.success("Account created! Redirecting...");
            router.push("/trade");
            router.refresh();
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#000000] text-white p-4">
            <div className="relative overflow-hidden w-full max-w-4xl h-[600px] bg-[#0a0a0a] rounded-3xl shadow-2xl border border-white/5">

                {/* Sign Up Form Container (Right Side) */}
                <div
                    className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-500 ease-in-out flex flex-col items-center justify-center
                    ${isRightPanelActive ? "translate-x-full opacity-100 z-20 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"}
                    `}
                >
                    <form onSubmit={handleSignup} className="flex flex-col items-center justify-center h-full w-full px-12 text-center">
                        <h1 className="text-3xl font-bold mb-6 text-white">Create Account</h1>
                        <div className="w-full space-y-3">
                            <Input name="username" type="text" placeholder="Username" required className="bg-white/5 border-white/10 focus:border-profit placeholder:text-gray-500 text-white" />
                            <Input name="email" type="email" placeholder="Email" required className="bg-white/5 border-white/10 focus:border-profit placeholder:text-gray-500 text-white" />
                            <Input name="password" type="password" placeholder="Password" required className="bg-white/5 border-white/10 focus:border-profit placeholder:text-gray-500 text-white" />
                            <Input name="confirmPassword" type="password" placeholder="Confirm Password" required className="bg-white/5 border-white/10 focus:border-profit placeholder:text-gray-500 text-white" />

                            <div className="flex items-center gap-2 text-xs text-left w-full pl-1 mt-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="rounded border-white/20 bg-white/5 text-profit focus:ring-profit accent-profit h-4 w-4 cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-gray-400 cursor-pointer select-none">
                                    I agree to the <Link href="/terms" className="underline hover:text-profit">Terms</Link> and <Link href="/privacy" className="underline hover:text-profit">Privacy Policy</Link>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading || !acceptedTerms}
                                className="w-full bg-profit text-black hover:bg-profit/90 font-bold h-10 mt-4"
                            >
                                {isLoading ? "Creating..." : "Sign Up"}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Sign In Form Container (Left Side) */}
                <div
                    className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-500 ease-in-out flex flex-col items-center justify-center
                 ${isRightPanelActive ? "translate-x-[100%] opacity-0 z-0 pointer-events-none" : "translate-x-0 opacity-100 z-20 pointer-events-auto"}
                 `}
                >
                    <form onSubmit={handleLogin} className="flex flex-col items-center justify-center h-full w-full px-12 text-center">
                        <div className="mb-6 flex flex-col items-center">
                            <div className="w-10 h-10 bg-profit rounded-lg flex items-center justify-center font-bold text-black text-xl mb-2">V</div>
                            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                        </div>

                        <div className="w-full space-y-4">
                            <Input name="email" type="email" placeholder="Email" required className="bg-white/5 border-white/10 focus:border-profit placeholder:text-gray-500 text-white" />
                            <Input name="password" type="password" placeholder="Password" required className="bg-white/5 border-white/10 focus:border-profit placeholder:text-gray-500 text-white" />
                            <Button type="submit" disabled={isLoading} className="w-full bg-profit text-black hover:bg-profit/90 font-bold h-10">
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Button>
                        </div>
                        <Link href="/forgot-password" className="mt-4 text-sm text-gray-400 hover:text-profit transition-colors">Forgot your password?</Link>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-50 ${isRightPanelActive ? "-translate-x-full" : "translate-x-0"}`}>
                    <div className={`relative -left-full h-full w-[200%] bg-[#111] transform transition-transform duration-500 ease-in-out ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"}`}>

                        {/* Overlay Pattern / Decoration */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-profit/40 via-[#0a0a0a] to-[#0a0a0a]"></div>

                        {/* Overlay Left (Visible when RightPanel is Active) */}
                        <div className={`absolute flex flex-col items-center justify-center w-1/2 h-full px-12 text-center transition-transform duration-500 ease-in-out ${isRightPanelActive ? "translate-x-0" : "-translate-x-[20%]"}`}>
                            <h1 className="text-3xl font-bold mb-4 text-white">Already a trader?</h1>
                            <p className="mb-8 text-gray-400">Log in to your terminal and manage your portfolio.</p>
                            <button
                                onClick={() => setIsRightPanelActive(false)}
                                className="px-8 py-3 bg-transparent border border-white/20 rounded-full font-bold uppercase text-xs tracking-wider transition-all hover:bg-white hover:text-black hover:border-white"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Overlay Right (Visible when RightPanel is Inactive/Default) */}
                        <div className={`absolute right-0 flex flex-col items-center justify-center w-1/2 h-full px-12 text-center transition-transform duration-500 ease-in-out ${isRightPanelActive ? "translate-x-[20%]" : "translate-x-0"}`}>
                            <h1 className="text-3xl font-bold mb-4 text-white">New here?</h1>
                            <p className="mb-8 text-gray-400">Join 2M+ traders on the world's most advanced interface.</p>
                            <button
                                onClick={() => setIsRightPanelActive(true)}
                                className="px-8 py-3 bg-transparent border border-white/20 rounded-full font-bold uppercase text-xs tracking-wider transition-all hover:bg-white hover:text-black hover:border-white"
                            >
                                Sign Up
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

