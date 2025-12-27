"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

const pairs = [
    { name: "BTC/USDT", price: "42,350.20", change: "+2.4%" },
    { name: "ETH/USDT", price: "2,240.15", change: "+1.8%" },
    { name: "SOL/USDT", price: "98.45", change: "-0.5%" },
    { name: "BNB/USDT", price: "315.20", change: "+0.2%" },
    { name: "XRP/USDT", price: "0.5420", change: "-1.1%" },
    { name: "ADA/USDT", price: "0.5120", change: "+0.5%" },
    { name: "AVAX/USDT", price: "35.20", change: "+4.2%" },
    { name: "DOGE/USDT", price: "0.0820", change: "-0.8%" },
];

export default function MarketPairs() {
    const [search, setSearch] = useState("");

    const filtered = pairs.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="h-1/2 flex flex-col bg-[#111] border border-white/5 rounded-sm overflow-hidden text-xs">
            <div className="p-2 border-b border-white/5">
                <Input
                    placeholder="Search"
                    className="h-7 bg-white/5 border-white/10 text-xs"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="flex justify-between px-2 py-1 text-gray-500 text-[10px] uppercase bg-white/5">
                <span>Pair</span>
                <span>Price</span>
                <span>Chg%</span>
            </div>
            <div className="flex-1 overflow-y-auto">
                {filtered.map(pair => (
                    <div key={pair.name} className="flex justify-between px-2 py-2 hover:bg-white/5 cursor-pointer">
                        <span className="font-bold text-gray-300">{pair.name}</span>
                        <span className="text-gray-400">{pair.price}</span>
                        <span className={pair.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{pair.change}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
