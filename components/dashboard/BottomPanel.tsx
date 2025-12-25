"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface BottomPanelProps {
    positions: React.ReactNode;
    history: React.ReactNode;
}

export default function BottomPanel({ positions, history }: BottomPanelProps) {
    const [activeTab, setActiveTab] = useState<"positions" | "history">("positions");

    return (
        <div className="flex flex-col h-full bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex border-b border-gray-800">
                <button
                    onClick={() => setActiveTab("positions")}
                    className={cn(
                        "px-6 py-3 text-sm font-medium transition-colors border-b-2",
                        activeTab === "positions"
                            ? "border-profit text-profit bg-profit/5"
                            : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                >
                    Open Positions
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={cn(
                        "px-6 py-3 text-sm font-medium transition-colors border-b-2",
                        activeTab === "history"
                            ? "border-profit text-profit bg-profit/5"
                            : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                >
                    Trade History
                </button>
            </div>

            <div className="flex-1 overflow-auto">
                {activeTab === "positions" ? positions : history}
            </div>
        </div>
    );
}
