"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomeCTA() {
    const { session, isLoading } = useAuth();
    const router = useRouter();

    if (isLoading) {
        return (
            <Button className="h-12 px-8 text-lg bg-profit text-black hover:bg-profit/90 rounded-full font-bold shadow-[0_0_20px_rgba(46,213,115,0.3)] opacity-50 cursor-not-allowed">
                Loading...
            </Button>
        );
    }

    if (session) {
        return (
            <Link href="/trade">
                <Button className="h-12 px-8 text-lg bg-profit text-black hover:bg-profit/90 rounded-full font-bold shadow-[0_0_20px_rgba(46,213,115,0.3)]">
                    Go to Terminal
                </Button>
            </Link>
        );
    }

    return (
        <Link href="/signup">
            <Button className="h-12 px-8 text-lg bg-profit text-black hover:bg-profit/90 rounded-full font-bold shadow-[0_0_20px_rgba(46,213,115,0.3)]">
                Start Trading Now
            </Button>
        </Link>
    );
}
