import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-profit selection:text-black">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-profit rounded-lg flex items-center justify-center font-bold text-black">V</div>
              <span className="text-xl font-bold tracking-tight">Volex<span className="text-profit">Trade</span></span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/trade" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Markets</Link>
              <Link href="/trade" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Spot</Link>
              <Link href="/trade" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Futures</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white hover:text-profit transition-colors">Log In</Link>
            <Link href="/signup">
              <Button className="bg-profit hover:bg-profit/90 text-black font-bold h-9 px-6 rounded-full transition-transform active:scale-95">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">

        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Trade Crypto & Forex <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-profit to-emerald-400">With Zero Latency</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            The world's most advanced terminal provider. Deep liquidity, professional tools, and bank-grade security for serious traders.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/trade">
              <Button className="h-12 px-8 text-lg bg-profit text-black hover:bg-profit/90 rounded-full font-bold shadow-[0_0_20px_rgba(46,213,115,0.3)]">
                Start Trading Now
              </Button>
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">2M+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$50B+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Q Vol</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">&lt;50ms</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Support</div>
            </div>
          </div>
        </section>

        {/* Live Market Ticker */}
        <section className="mb-24 px-6 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
            <TickerCard pair="BTC/USDT" price="42,350.20" change="+2.4%" positive />
            <TickerCard pair="ETH/USDT" price="2,240.15" change="+1.8%" positive />
            <TickerCard pair="SOL/USDT" price="98.45" change="-0.5%" positive={false} />
            <TickerCard pair="XAU/USD" price="2,035.80" change="+0.1%" positive />
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Professional Charts"
              desc="Powered by advanced engines for precise technical analysis."
              icon="📊"
            />
            <FeatureCard
              title="Bank-Grade Security"
              desc="Your assets are protected by industry-leading encryption protocols."
              icon="🛡️"
            />
            <FeatureCard
              title="Global Markets"
              desc="Access crypto, forex, and commodities from a single unified terminal."
              icon="🌍"
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-6 text-center py-20 bg-[#111111] rounded-3xl border border-white/5 mx-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start trading?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Be part of the financial revolution. Create an account in minutes.</p>
          <Link href="/signup">
            <Button className="h-12 px-10 bg-white text-black hover:bg-gray-200 rounded-full font-bold">
              Create Free Account
            </Button>
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-[#050505] text-sm text-gray-500">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Volex Trade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function TickerCard({ pair, price, change, positive }: { pair: string, price: string, change: string, positive: boolean }) {
  return (
    <Link href="/trade">
      <div className="bg-[#111111] border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors cursor-pointer group">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-gray-200 group-hover:text-profit transition-colors">{pair}</span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${positive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {change}
          </span>
        </div>
        <div className="text-2xl font-bold text-white">{price}</div>
      </div>
    </Link>
  )
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-profit/30 transition-all hover:translate-y-[-4px]">
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  )
}
