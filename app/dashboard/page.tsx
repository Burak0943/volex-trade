"use client";

import TradingChart from "@/components/dashboard/TradingChart";
import OrderForm from "@/components/dashboard/OrderForm";
import Watchlist from "@/components/dashboard/Watchlist";
import { generateCandleData } from "@/utils/marketData";

export default function DashboardPage() {
    // Mock data - no database connection
    const balance = 10000.00;
    const formattedBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);

    // Generate chart data
    const chartData = generateCandleData(300);

    return (
        <div className="h-full flex flex-col p-4 gap-4">
            {/* Top Bar: Asset Info & Balance */}
            <header className="flex justify-between items-end border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        BTC/USD
                        <span className="text-sm font-normal text-profit bg-profit/10 px-2 py-0.5 rounded">+2.45%</span>
                    </h1>
                    <p className="text-gray-400 text-sm">$48,230.50</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-400">Available Balance (Demo)</p>
                    <p className="text-xl font-mono font-bold">{formattedBalance}</p>
                </div>
            </header>

            {/* Main Grid */}
            <div className="flex-1 flex flex-col gap-4 min-h-0">
                <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
                    {/* Chart Area (Center) */}
                    <div className="col-span-12 lg:col-span-9 bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col shadow-inner">
                        <TradingChart data={chartData} />
                    </div>

                    {/* Right Sidebar: Watchlist & Order Book */}
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 min-h-0">
                        {/* Watchlist takes remaining space */}
                        <div className="flex-1 min-h-0">
                            <Watchlist />
                        </div>
                        {/* Order Form fixed height */}
                        <div className="flex-shrink-0">
                            <OrderForm />
                        </div>
                    </div>
                </div>

                {/* Bottom Panel (Positions & History) - Demo Mode */}
                <div className="h-64 flex-shrink-0 bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center justify-center">
                    <p className="text-gray-500">Positions & History (Demo Mode - No Database)</p>
                </div>
            </div>
        </div>
    );
}
