"use client";

import { useState } from "react";
import { toast } from "sonner";
import { closePosition } from "@/app/dashboard/actions";

export default function CloseButton({ positionId }: { positionId: string }) {
    const [loading, setLoading] = useState(false);

    async function handleClose() {
        setLoading(true);
        // For demo purposes, we're not passing the real-time price here yet, 
        // but the server action will simulate or accept a price. 
        // Let's pass a mock current price or let server handle it.
        // In a real app we'd pass the current chart price.
        const currentPrice = 48230.50; // Mock current price matching our chart data start

        const result = await closePosition(positionId, currentPrice);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.message);
        }
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
