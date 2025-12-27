"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function OrderBook() {
    const asks = Array.from({ length: 15 }).map((_, i) => ({
        price: (42350 + i * 5).toFixed(2),
        amount: (Math.random() * 2).toFixed(4),
        total: (Math.random() * 5).toFixed(4),
    })).reverse();

    const bids = Array.from({ length: 15 }).map((_, i) => ({
        price: (42350 - i * 5).toFixed(2),
        amount: (Math.random() * 2).toFixed(4),
        total: (Math.random() * 5).toFixed(4),
    }));

    return (
        <div className="h-full flex flex-col bg-[#111] border border-white/5 rounded-sm overflow-hidden text-xs">
            <div className="p-2 border-b border-white/5 font-bold text-gray-400">Order Book</div>

            <div className="flex-1 flex flex-col min-h-0">
                {/* Header */}
                <div className="flex justify-between px-2 py-1 text-gray-500 text-[10px] uppercase">
                    <span>Price(USDT)</span>
                    <span>Amount(BTC)</span>
                    <span>Total</span>
                </div>

                {/* Asks (Sells) */}
                <div className="flex-1 overflow-hidden relative">
                    <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                        {asks.map((ask, i) => (
                            <div key={i} className="flex justify-between px-2 py-[2px] hover:bg-white/5 cursor-pointer relative">
                                <span className="text-red-500">{ask.price}</span>
                                <span className="text-gray-300">{ask.amount}</span>
                                <span className="text-gray-500">{ask.total}</span>
                                <div className="absolute right-0 top-0 h-full bg-red-500/10" style={{ width: `${Math.random() * 40}%` }}></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Price */}
                <div className="py-2 px-2 text-center my-1 border-y border-white/5 bg-white/5">
                    <div className="text-lg font-bold text-green-500">42,350.50 <span className="text-xs text-gray-400">↑</span></div>
                    <div className="text-[10px] text-gray-400">≈ $42,350.50</div>
                </div>

                {/* Bids (Buys) */}
                <div className="flex-1 overflow-hidden relative">
                    <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                        {bids.map((bid, i) => (
                            <div key={i} className="flex justify-between px-2 py-[2px] hover:bg-white/5 cursor-pointer relative">
                                <span className="text-green-500">{bid.price}</span>
                                <span className="text-gray-300">{bid.amount}</span>
                                <span className="text-gray-500">{bid.total}</span>
                                <div className="absolute right-0 top-0 h-full bg-green-500/10" style={{ width: `${Math.random() * 40}%` }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
