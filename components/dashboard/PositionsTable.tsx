import { createClient } from "@/utils/supabase/server";
import CloseButton from "@/components/dashboard/CloseButton";

export default async function PositionsTable() {
    const supabase = await createClient();
    const { data: positions } = await supabase
        .from("positions")
        .select("*")
        .eq("status", "OPEN")
        .order("created_at", { ascending: false });

    if (!positions || positions.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                No open positions
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
                        <th className="px-6 py-3">Entry Price</th>
                        <th className="px-6 py-3">Profit</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {positions.map((pos) => (
                        <tr key={pos.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium">{pos.symbol}</td>
                            <td className={`px-6 py-4 font-bold ${pos.type === 'BUY' ? 'text-profit' : 'text-loss'}`}>
                                {pos.type}
                            </td>
                            <td className="px-6 py-4">{pos.volume}</td>
                            <td className="px-6 py-4">${Number(pos.entry_price).toFixed(2)}</td>
                            <td className="px-6 py-4 text-gray-500">--</td>
                            <td className="px-6 py-4">
                                <CloseButton positionId={pos.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
