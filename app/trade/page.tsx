"use client";

import { generateCandleData } from "@/utils/marketData";
import TradingChart from "@/components/dashboard/TradingChart";
import Watchlist from "@/components/dashboard/Watchlist";
import OrderForm from "@/components/dashboard/OrderForm";

export default function TradePage() {
    const chartData = generateCandleData(300);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Trade Header (Simplified for now) */}
            <header className="h-14 border-b border-border flex items-center px-4 justify-between bg-card">
                <div className="font-bold text-lg">Volex Trade Terminal</div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">BTC/USDT</span>
                    <span className="text-sm font-bold text-profit">$42,350.00</span>
                </div>
            </header>

            <main className="flex-1 p-2 overflow-hidden h-[calc(100vh-3.5rem)]">
                <div className="grid grid-cols-12 gap-2 h-full w-full">
                    {/* Left: Watchlist */}
                    <div className="col-span-2 hidden md:block h-full overflow-hidden rounded-sm border border-border bg-card">
                        <Watchlist />
                    </div>

                    {/* Center: Chart */}
                    <div className="col-span-12 md:col-span-7 h-full rounded-sm border border-border bg-card overflow-hidden">
                        <TradingChart data={chartData} />
                    </div>

                    {/* Right: Order Panel */}
                    <div className="col-span-12 md:col-span-3 h-full rounded-sm border border-border bg-card p-2 overflow-y-auto">
                        <OrderForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
