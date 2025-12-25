"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { login, signup } from "@/app/auth/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthSlider() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white p-4">
            <div className="relative overflow-hidden w-full max-w-4xl h-[600px] bg-slate-900/50 rounded-2xl shadow-2xl border border-slate-800">

                {/* Sign Up Form Container */}
                <div className={`absolute top-0 h-full w-1/2 transition-all duration-500 ease-in-out z-10 ${isRightPanelActive ? "translate-x-full opacity-100" : "opacity-0 z-0"}`}>
                    <form action={signup} className="flex flex-col items-center justify-center h-full px-12 text-center bg-[#020617]">
                        <h1 className="text-3xl font-bold mb-6">Create Account</h1>
                        <div className="w-full space-y-4">
                            <Input name="email" type="email" placeholder="Email" required className="bg-slate-800/50 border-slate-700 focus:border-profit" />
                            <Input name="password" type="password" placeholder="Password" required className="bg-slate-800/50 border-slate-700 focus:border-profit" />

                            <div className="flex items-center gap-2 text-xs text-left w-full pl-1">
                                <input type="checkbox" id="terms" required className="rounded border-slate-700 bg-slate-800 text-profit focus:ring-profit" />
                                <label htmlFor="terms" className="text-slate-400">
                                    I agree to the <a href="#" className="underline hover:text-white">Terms</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>
                                </label>
                            </div>

                            <Button className="w-full bg-profit text-slate-950 hover:bg-profit/90 font-bold transition-transform active:scale-95">Sign Up</Button>
                        </div>
                    </form>
                </div>

                {/* Sign In Form Container */}
                <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-500 ease-in-out z-20 ${isRightPanelActive ? "translate-x-[100%] opacity-0" : "translate-x-0 opacity-100"}`}>
                    <form action={login} className="flex flex-col items-center justify-center h-full px-12 text-center bg-[#020617]">
                        <h1 className="text-3xl font-bold mb-6">ChartFlow</h1>
                        <div className="w-full space-y-4">
                            <Input name="email" type="email" placeholder="Email" required className="bg-slate-800/50 border-slate-700 focus:border-profit" />
                            <Input name="password" type="password" placeholder="Password" required className="bg-slate-800/50 border-slate-700 focus:border-profit" />
                            <Button className="w-full bg-profit text-slate-950 hover:bg-profit/90 font-bold transition-transform active:scale-95">Sign In</Button>
                        </div>
                        <a href="#" className="mt-4 text-sm text-slate-400 hover:text-white transition-colors">Forgot your password?</a>

                        <div className="mt-8 pt-4 border-t border-slate-800 w-full">
                            <p className="text-xs text-slate-500">
                                Need help? <a href="mailto:autostephelp@gmail.com" className="hover:text-profit transition-colors">autostephelp@gmail.com</a>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-50 ${isRightPanelActive ? "-translate-x-full" : "translate-x-0"}`}>
                    <div className={`relative -left-full h-full w-[200%] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 transform transition-transform duration-500 ease-in-out ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"}`}>

                        {/* Overlay Left */}
                        <div className={`absolute flex flex-col items-center justify-center w-1/2 h-full px-12 text-center transition-transform duration-500 ease-in-out ${isRightPanelActive ? "translate-x-0" : "-translate-x-[20%]"}`}>
                            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                            <p className="mb-8 text-slate-100">Access your professional trading terminal.</p>
                            <button
                                onClick={() => setIsRightPanelActive(false)}
                                className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-bold uppercase text-xs tracking-wider transition-transform active:scale-95 hover:bg-white/10"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Overlay Right */}
                        <div className={`absolute right-0 flex flex-col items-center justify-center w-1/2 h-full px-12 text-center transition-transform duration-500 ease-in-out ${isRightPanelActive ? "translate-x-[20%]" : "translate-x-0"}`}>
                            <h1 className="text-3xl font-bold mb-4">Join ChartFlow</h1>
                            <p className="mb-8 text-slate-100">Start your journey with advanced market analytics.</p>
                            <button
                                onClick={() => setIsRightPanelActive(true)}
                                className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-bold uppercase text-xs tracking-wider transition-transform active:scale-95 hover:bg-white/10"
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
