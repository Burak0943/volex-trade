"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        toast.success("Signed out successfully");
        router.push("/");
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-loss/10 text-loss hover:text-loss rounded-lg transition-colors text-sm"
        >
            <span>Sign Out</span>
        </button>
    );
}
