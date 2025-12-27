
import { generateCandleData } from "@/utils/marketData";
import TradingChart from "@/components/dashboard/TradingChart";
import OrderForm from "@/components/dashboard/OrderForm";
import OrderBook from "@/components/dashboard/OrderBook";
import MarketPairs from "@/components/dashboard/MarketPairs";
import RecentTrades from "@/components/dashboard/RecentTrades";
import PositionsTable from "@/components/dashboard/PositionsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TradePage() {
    const chartData = generateCandleData(300);

    return (
        <div className="h-screen bg-[#0b0e11] text-[#eaecef] flex flex-col overflow-hidden font-sans">
            {/* Header */}
            <header className="h-12 bg-[#181a20] border-b border-[#2b3139] flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-6">
                    <Link href="/">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="w-6 h-6 rounded-md overflow-hidden">
                                <img src="/logo.jpg" alt="ChartFlow" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-bold tracking-tight text-[#eaecef]">Chart<span className="text-[#FCD535]">Flow</span></span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <span className="text-[#FCD535] hover:text-[#FCD535] cursor-pointer">Markets</span>
                        <span className="text-[#eaecef] hover:text-[#FCD535] cursor-pointer">Trade</span>
                        <span className="text-[#eaecef] hover:text-[#FCD535] cursor-pointer">Derivatives</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold">BTC/USDT</span>
                        <span className="text-[#0ecb81] font-bold">42,350.00</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#eaecef] hover:text-[#FCD535]">Wallets</Button>
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="text-[#eaecef] hover:text-[#FCD535]">Exit</Button>
                    </Link>
                </div>
            </header>

            {/* Main Grid */}
            <main className="flex-1 flex min-h-0 bg-[#161a1e]">

                {/* Left Column: Order Book (20%) */}
                <div className="w-[20%] border-r border-[#2b3139] flex flex-col min-w-[250px]">
                    <OrderBook />
                </div>

                {/* Center Column: Chart & Order Form (60%) */}
                <div className="flex-1 flex flex-col min-w-[400px] border-r border-[#2b3139]">
                    {/* Chart Area (70%) */}
                    <div className="h-[65%] border-b border-[#2b3139] relative">
                        <TradingChart data={chartData} />
                    </div>

                    {/* Order Form Area (30%) */}
                    <div className="flex-1 bg-[#161a1e] p-2">
                        <OrderForm />
                    </div>
                </div>

                {/* Right Column: Market Pairs & Trades (20%) */}
                <div className="w-[20%] flex flex-col min-w-[250px]">
                    <div className="h-[50%] border-b border-[#2b3139]">
                        <MarketPairs />
                    </div>
                    <div className="flex-1">
                        <RecentTrades />
                    </div>
                </div>

            </main>

            {/* Bottom Panel: Open Orders (Collapsible/Overlay? For now fixed height) */}
            <div className="h-[200px] bg-[#161a1e] border-t border-[#2b3139] shrink-0">
                <PositionsTable />
            </div>
        </div>
    );
}
