"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="w-8 h-8 rounded-lg overflow-hidden">
                                <img src="/logo.jpg" alt="ChartFlow" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Chart<span className="text-profit">Flow</span></span>
                        </div>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/trade" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Markets</Link>
                        <Link href="/trade" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Spot</Link>
                        <Link href="/trade" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Futures</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-white hover:text-profit transition-colors">Log In</Link>
                    <Link href="/signup">
                        <Button className="bg-profit hover:bg-profit/90 text-black font-bold h-9 px-6 rounded-full transition-transform active:scale-95">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
