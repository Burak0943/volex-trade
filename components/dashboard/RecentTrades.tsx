"use client";

export default function RecentTrades() {
    const trades = Array.from({ length: 20 }).map((_, i) => ({
        price: (42350 + (Math.random() - 0.5) * 50).toFixed(2),
        amount: (Math.random() * 0.5).toFixed(4),
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: Math.random() > 0.5 ? 'buy' : 'sell'
    }));

    return (
        <div className="h-1/2 flex flex-col bg-[#111] border border-white/5 rounded-sm overflow-hidden text-xs mt-1">
            <div className="p-2 border-b border-white/5 font-bold text-gray-400">Market Trades</div>
            <div className="flex justify-between px-2 py-1 text-gray-500 text-[10px] uppercase bg-white/5">
                <span>Price</span>
                <span>Amount</span>
                <span>Time</span>
            </div>
            <div className="flex-1 overflow-y-auto">
                {trades.map((trade, i) => (
                    <div key={i} className="flex justify-between px-2 py-1 hover:bg-white/5 cursor-pointer">
                        <span className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>{trade.price}</span>
                        <span className="text-gray-400">{trade.amount}</span>
                        <span className="text-gray-500">{trade.time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
