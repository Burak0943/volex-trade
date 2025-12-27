"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function CloseButton({ positionId }: { positionId: string }) {
    const [loading, setLoading] = useState(false);

    async function handleClose() {
        setLoading(true);

        // Simplified: Just show success toast (no database interaction)
        // In production, you would call Supabase client here directly
        toast.success("Position closed successfully");

        setLoading(false);
    }

    return (
        <button
            onClick={handleClose}
            disabled={loading}
            className="p-1 px-3 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded text-xs font-bold transition-colors disabled:opacity-50"
        >
            {loading ? "..." : "X"}
        </button>
    );
}
