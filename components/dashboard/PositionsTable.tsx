"use client";

import React from 'react';

export default function PositionsTable() {
    // Static data to prevent build errors
    const positions = [
        { id: 1, symbol: "BTC/USDT", side: "Long", amount: "0.5", pnl: "+120.00" },
        { id: 2, symbol: "ETH/USDT", side: "Short", amount: "5.0", pnl: "-45.00" },
    ];

    return (
        <div className="w-full p-4 bg-secondary/10 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Open Positions (Demo)</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-secondary/20">
                        <tr>
                            <th className="px-4 py-2">Symbol</th>
                            <th className="px-4 py-2">Side</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">PNL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((pos) => (
                            <tr key={pos.id} className="border-b border-gray-700">
                                <td className="px-4 py-2">{pos.symbol}</td>
                                <td className="px-4 py-2">{pos.side}</td>
                                <td className="px-4 py-2">{pos.amount}</td>
                                <td className={`px-4 py-2 ${pos.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    {pos.pnl}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
