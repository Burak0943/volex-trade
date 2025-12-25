import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const WATCHLIST_DATA = [
    { symbol: "BTC/USD", price: 48230.50, change: 2.45, isUp: true },
    { symbol: "ETH/USD", price: 3450.12, change: -1.20, isUp: false },
    { symbol: "AAPL", price: 175.40, change: 0.85, isUp: true },
    { symbol: "TSLA", price: 240.50, change: -3.10, isUp: false },
    { symbol: "NVDA", price: 890.00, change: 4.50, isUp: true },
    { symbol: "AMZN", price: 180.20, change: 1.10, isUp: true },
];

export default function Watchlist() {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                <h2 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Market Watch</h2>
            </div>
            <div className="flex-1 overflow-auto">
                {WATCHLIST_DATA.map((item) => (
                    <div key={item.symbol} className="flex items-center justify-between p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-200 group-hover:text-white transition-colors">{item.symbol}</span>
                            <span className="text-xs text-slate-500">Vol: 24M</span>
                        </div>
                        <div className="text-right">
                            <div className="font-mono font-medium text-slate-200">${item.price.toFixed(2)}</div>
                            <div className={`flex items-center justify-end gap-1 text-xs font-bold ${item.isUp ? "text-profit" : "text-loss"}`}>
                                {item.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {item.change > 0 ? "+" : ""}{item.change}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
