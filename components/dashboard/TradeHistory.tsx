"use client";

import React from 'react';

export default function TradeHistory() {
    // Static data to prevent build errors
    const history = [
        { id: 1, symbol: "BTC/USDT", side: "Long", entry: "42000", exit: "42500", pnl: "+250.00", date: "2024-01-15" },
        { id: 2, symbol: "ETH/USDT", side: "Short", entry: "2200", exit: "2180", pnl: "+100.00", date: "2024-01-14" },
    ];

    return (
        <div className="w-full p-4 bg-secondary/10 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Trade History (Demo)</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-secondary/20">
                        <tr>
                            <th className="px-4 py-2">Symbol</th>
                            <th className="px-4 py-2">Side</th>
                            <th className="px-4 py-2">Entry</th>
                            <th className="px-4 py-2">Exit</th>
                            <th className="px-4 py-2">PNL</th>
                            <th className="px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((trade) => (
                            <tr key={trade.id} className="border-b border-gray-700">
                                <td className="px-4 py-2">{trade.symbol}</td>
                                <td className="px-4 py-2">{trade.side}</td>
                                <td className="px-4 py-2">{trade.entry}</td>
                                <td className="px-4 py-2">{trade.exit}</td>
                                <td className={`px-4 py-2 ${trade.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    {trade.pnl}
                                </td>
                                <td className="px-4 py-2 text-gray-400">{trade.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
