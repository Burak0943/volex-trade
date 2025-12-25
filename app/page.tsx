import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { generateCandleData } from "@/utils/marketData";
import TradingChart from "@/components/dashboard/TradingChart";
import Watchlist from "@/components/dashboard/Watchlist";
import OrderForm from "@/components/dashboard/OrderForm";

export default function Home() {
  const chartData = generateCandleData(300);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <header className="fixed w-full z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="ChartFlow Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-slate-500">
              Chart<span className="text-profit">Flow</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm font-medium hover:text-profit transition-colors hidden md:block">Privacy</Link>
            <Link href="/terms" className="text-sm font-medium hover:text-profit transition-colors hidden md:block">Terms</Link>
            <ModeToggle />
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-medium transition-colors hover:text-profit">
                Log In
              </button>
            </Link>
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-bold bg-profit text-slate-950 rounded-lg hover:bg-profit/90 transition-transform active:scale-95">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section / Trading Interface Preview */}
      <main className="flex-1 pt-20 pb-10 px-4 flex flex-col gap-6 container mx-auto">

        {/* Hero Text */}
        <section className="text-center py-10 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Trade Global Markets with <span className="text-profit">Confidence</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced charting, real-time execution, and professional tools for everyone.
          </p>
        </section>

        {/* Live Interface Preview Grid */}
        <div className="grid grid-cols-12 gap-4 h-[600px] w-full border border-border rounded-xl bg-card shadow-2xl overflow-hidden p-2 ring-1 ring-border/50">

          {/* Left: Watchlist */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2 hidden md:block h-full overflow-hidden rounded-lg border border-border">
            <Watchlist />
          </div>

          {/* Center: Chart */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7 h-full rounded-lg border border-border bg-card overflow-hidden">
            <div className="h-full w-full">
              <TradingChart data={chartData} />
            </div>
          </div>

          {/* Right: Order Panel */}
          <div className="col-span-12 lg:col-span-3 hidden lg:block h-full rounded-lg border border-border bg-card p-4">
            <div className="h-full flex flex-col">
              <div className="font-bold text-lg mb-4">Place Order</div>
              <OrderForm />
              <div className="mt-auto p-4 bg-muted/20 rounded-lg text-xs text-muted-foreground text-center">
                Login to execute trades on the live market.
              </div>
            </div>
          </div>

        </div>

        {/* Feature Highlights (Pseudo Recent Trades / Activity) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <FeatureCard
            title="Real-Time Data"
            desc="blazing fast updates via WebSocket connection."
            icon="⚡"
          />
          <FeatureCard
            title="Secure Wallets"
            desc="Bank-grade security for your digital assets."
            icon="🔒"
          />
          <FeatureCard
            title="24/7 Support"
            desc="Dedicated team ready to help you anytime."
            icon="🎧"
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 ChartFlow. All rights reserved. <br />
            Support: <a href="mailto:autostephelp@gmail.com" className="text-profit hover:underline">autostephelp@gmail.com</a>
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card hover:border-profit/50 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  )
}
