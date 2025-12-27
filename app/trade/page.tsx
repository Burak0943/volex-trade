"use client"

import { useState } from "react"

function OrderBook() {
  const bids = Array.from({ length: 8 }).map((_, i) => ({ price: (50000 - i * 10).toFixed(2), size: (Math.random() * 2).toFixed(4) }))
  const asks = Array.from({ length: 8 }).map((_, i) => ({ price: (50000 + i * 10).toFixed(2), size: (Math.random() * 2).toFixed(4) }))
  return (
    <div className="p-4 bg-slate-900 rounded">
      <h3 className="text-lg font-semibold mb-2">Order Book</h3>
      <div className="text-sm grid grid-cols-2 gap-2">
        <div>
          <div className="text-xs text-red-300">Asks</div>
          {asks.map((a, idx) => (
            <div key={idx} className="flex justify-between text-red-400">
              <span>{a.price}</span>
              <span className="text-slate-300">{a.size}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs text-green-300">Bids</div>
          {bids.map((b, idx) => (
            <div key={idx} className="flex justify-between text-green-400">
              <span>{b.price}</span>
              <span className="text-slate-300">{b.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Chart() {
  return (
    <div className="p-4 bg-slate-900 rounded h-full flex items-center justify-center">
      <div className="text-slate-300">TradingView Chart (placeholder)</div>
    </div>
  )
}

function OrderForm() {
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // For now just log
    console.log('Order', { side, price, amount })
    setPrice('')
    setAmount('')
  }

  return (
    <div className="p-4 bg-slate-900 rounded">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setSide('buy')} className={`flex-1 py-2 rounded ${side === 'buy' ? 'bg-emerald-500' : 'bg-slate-700'}`}>Buy</button>
        <button onClick={() => setSide('sell')} className={`flex-1 py-2 rounded ${side === 'sell' ? 'bg-red-500' : 'bg-slate-700'}`}>Sell</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm text-slate-300">Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded px-3 py-2 bg-slate-800 border border-slate-700" />
        <label className="block text-sm text-slate-300">Amount</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded px-3 py-2 bg-slate-800 border border-slate-700" />
        <button type="submit" className={`w-full py-2 rounded font-semibold ${side === 'buy' ? 'bg-emerald-500 text-black' : 'bg-red-500'}`}>Place {side.toUpperCase()}</button>
      </form>
    </div>
  )
}

export default function TradePage() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-4">
        <aside className="col-span-3">
          <OrderBook />
        </aside>
        <section className="col-span-6 h-[600px]">
          <Chart />
        </section>
        <aside className="col-span-3">
          <OrderForm />
        </aside>
      </div>
    </div>
  )
}

            {/* Header */}
            <header className="h-12 bg-[#181a20] border-b border-[#2b3139] flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-6">
                    <Link href="/">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="w-6 h-6 rounded-md overflow-hidden">
                                <img src="/logo.jpg" alt="ChartFlow" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-bold tracking-tight text-[#eaecef]">Chart<span className="text-[#FCD535]">Flow</span></span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <span className="text-[#FCD535] hover:text-[#FCD535] cursor-pointer">Markets</span>
                        <span className="text-[#eaecef] hover:text-[#FCD535] cursor-pointer">Trade</span>
                        <span className="text-[#eaecef] hover:text-[#FCD535] cursor-pointer">Derivatives</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold">BTC/USDT</span>
                        <span className="text-[#0ecb81] font-bold">42,350.00</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#eaecef] hover:text-[#FCD535]">Wallets</Button>
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="text-[#eaecef] hover:text-[#FCD535]">Exit</Button>
                    </Link>
                </div>
            </header>

            {/* Main Grid */}
            <main className="flex-1 flex min-h-0 bg-[#161a1e]">

                {/* Left Column: Order Book (20%) */}
                <div className="w-[20%] border-r border-[#2b3139] flex flex-col min-w-[250px]">
                    <OrderBook />
                </div>

                {/* Center Column: Chart & Order Form (60%) */}
                <div className="flex-1 flex flex-col min-w-[400px] border-r border-[#2b3139]">
                    {/* Chart Area (70%) */}
                    <div className="h-[65%] border-b border-[#2b3139] relative">
                        <TradingChart data={chartData} />
                    </div>

                    {/* Order Form Area (30%) */}
                    <div className="flex-1 bg-[#161a1e] p-2">
                        <OrderForm />
                    </div>
                </div>

                {/* Right Column: Market Pairs & Trades (20%) */}
                <div className="w-[20%] flex flex-col min-w-[250px]">
                    <div className="h-[50%] border-b border-[#2b3139]">
                        <MarketPairs />
                    </div>
                    <div className="flex-1">
                        <RecentTrades />
                    </div>
                </div>

            </main>

            {/* Bottom Panel: Mock Positions (No Database) */}
            <div className="h-[200px] bg-[#161a1e] border-t border-[#2b3139] shrink-0 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Open Positions (Demo Mode - No Database)</p>
            </div>
        </div>
    );
}
