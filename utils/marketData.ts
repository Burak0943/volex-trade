export interface CandleData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export function generateCandleData(numberOfCandles: number = 300, startPrice: number = 48000): CandleData[] {
    const data: CandleData[] = [];
    let currentPrice = startPrice;
    const now = new Date();
    // Start from 'numberOfCandles' minutes ago
    let currentTime = new Date(now.getTime() - numberOfCandles * 60 * 1000).getTime() / 1000;

    for (let i = 0; i < numberOfCandles; i++) {
        const volatility = 20 + Math.random() * 30; // Random volatility
        const change = (Math.random() - 0.5) * volatility;
        const open = currentPrice;
        const close = currentPrice + change;
        const high = Math.max(open, close) + Math.random() * 10;
        const low = Math.min(open, close) - Math.random() * 10;

        data.push({
            time: currentTime,
            open: Number(open.toFixed(2)),
            high: Number(high.toFixed(2)),
            low: Number(low.toFixed(2)),
            close: Number(close.toFixed(2)),
        });

        currentPrice = close;
        currentTime += 60; // Add 1 minute
    }

    return data;
}
