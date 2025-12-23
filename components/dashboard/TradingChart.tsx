"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, Time, CandlestickSeries } from "lightweight-charts";
import { CandleData } from "@/utils/marketData";

export default function TradingChart({ data }: { data: CandleData[] }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: "#94a3b8", // slate-400
            },
            grid: {
                vertLines: { color: "#1e293b" }, // slate-800
                horzLines: { color: "#1e293b" },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            timeScale: {
                borderColor: "#334155",
                timeVisible: true,
            },
            rightPriceScale: {
                borderColor: "#334155",
            },
        });

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: "#0ecc83", // Profit Green
            downColor: "#fa3c58", // Loss Red
            borderVisible: false,
            wickUpColor: "#0ecc83",
            wickDownColor: "#fa3c58",
        });

        // Cast data timestamp to Time type if necessary, lightweight-charts expects sorted data
        // Assuming generated data is sorted
        candlestickSeries.setData(data as unknown as CandlestickData<Time>[]);

        chart.timeScale().fitContent();

        chartRef.current = chart;
        seriesRef.current = candlestickSeries;

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight
                });
            }
        };

        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(chartContainerRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
    }, [data]);

    return (
        <div ref={chartContainerRef} className="w-full h-full min-h-[400px]" />
    );
}
