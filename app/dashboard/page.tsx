import { createClient } from "@/utils/supabase/server";
import TradingChart from "@/components/dashboard/TradingChart";
import OrderForm from "@/components/dashboard/OrderForm";
import PositionsTable from "@/components/dashboard/PositionsTable";
import TradeHistory from "@/components/dashboard/TradeHistory";
import BottomPanel from "@/components/dashboard/BottomPanel";
import { generateCandleData } from "@/utils/marketData";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch profile data
    const { data: profile } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', user?.id)
        .single();

    const balance = profile?.balance ?? 10000.00; // Fallback if query fails momentarily
    const formattedBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(balance));

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
                    <p className="text-sm text-gray-400">Available Balance</p>
                    <p className="text-xl font-mono font-bold">{formattedBalance}</p>
                </div>
            </header>

            {/* Main Grid */}
            <div className="flex-1 flex flex-col gap-4 min-h-0">
                <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
                    {/* Chart Area */}
                    <div className="col-span-12 lg:col-span-9 bg-gray-900/30 border border-gray-800 rounded-xl p-4 flex flex-col">
                        <TradingChart data={chartData} />
                    </div>

                    {/* Order Book / Execute */}
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
                        <OrderForm />
                    </div>
                </div>

                {/* Bottom Panel (Positions & History) */}
                <div className="h-64 flex-shrink-0">
                    <BottomPanel
                        positions={<PositionsTable />}
                        history={<TradeHistory />}
                    />
                </div>
            </div>
        </div>
    );
}
