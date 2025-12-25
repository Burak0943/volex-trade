import { createClient } from "@/utils/supabase/server";

export default async function TradeHistory() {
    const supabase = await createClient();
    const { data: history } = await supabase
        .from("positions")
        .select("*")
        .eq("status", "CLOSED")
        .order("created_at", { ascending: false });

    if (!history || history.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                No trade history
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-black/20 text-gray-400 font-medium">
                    <tr>
                        <th className="px-6 py-3">Symbol</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Volume</th>
                        <th className="px-6 py-3">Entry</th>
                        <th className="px-6 py-3">Exit</th>
                        <th className="px-6 py-3">Profit</th>
                        <th className="px-6 py-3">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {history.map((pos) => (
                        <tr key={pos.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium">{pos.symbol}</td>
                            <td className={`px-6 py-4 font-bold ${pos.type === 'BUY' ? 'text-profit' : 'text-loss'}`}>
                                {pos.type}
                            </td>
                            <td className="px-6 py-4">{pos.volume}</td>
                            <td className="px-6 py-4">${Number(pos.entry_price).toFixed(2)}</td>
                            <td className="px-6 py-4">${Number(pos.exit_price).toFixed(2)}</td>
                            <td className={`px-6 py-4 font-bold ${pos.profit >= 0 ? 'text-profit' : 'text-loss'}`}>
                                {pos.profit >= 0 ? '+' : ''}{Number(pos.profit).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-xs">
                                {new Date(pos.created_at).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
