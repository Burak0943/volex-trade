"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function OrderForm() {
    const [price, setPrice] = useState("48230.50");
    const [volume, setVolume] = useState("0.1");
    const [pending, setPending] = useState(false);

    async function handleSubmit(type: "BUY" | "SELL") {
        setPending(true);

        // Simplified: Just show success toast (no database interaction)
        // In production, you would call Supabase client here directly
        toast.success(`Order Opened: ${type} ${volume} Lot BTCUSD`);

        setPending(false);
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 flex-1">
                <h2 className="text-sm font-semibold text-gray-400 mb-4">Order Book</h2>
                <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-loss"><span>48,235.50</span><span>0.523</span></div>
                    <div className="flex justify-between text-loss"><span>48,235.00</span><span>1.205</span></div>
                    <div className="flex justify-between text-loss"><span>48,234.50</span><span>0.050</span></div>
                    <div className="my-2 border-t border-gray-800"></div>
                    <div className="flex justify-between text-profit"><span>48,230.50</span><span>2.100</span></div>
                    <div className="flex justify-between text-profit"><span>48,230.00</span><span>5.450</span></div>
                    <div className="flex justify-between text-profit"><span>48,229.50</span><span>0.330</span></div>
                </div>
            </div>

            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => handleSubmit("BUY")}
                        disabled={pending}
                        className="flex-1 py-2 bg-profit text-black font-bold rounded hover:bg-opacity-90 transition disabled:opacity-50"
                    >
                        {pending ? "..." : "Buy"}
                    </button>
                    <button
                        onClick={() => handleSubmit("SELL")}
                        disabled={pending}
                        className="flex-1 py-2 bg-gray-800 text-gray-300 font-bold rounded hover:bg-gray-700 transition disabled:opacity-50"
                    >
                        {pending ? "..." : "Sell"}
                    </button>
                </div>
                <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400">Price (USD)</label>
                        <Input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="bg-black/50 border-gray-700 text-white focus:border-profit"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400">Amount (BTC)</label>
                        <Input
                            type="text"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="bg-black/50 border-gray-700 text-white focus:border-profit"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
