import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="absolute top-0 w-full z-10">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Volex<span className="text-profit">Trade</span>
          </div>
          <nav>
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Log In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              Trade Global <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-profit to-teal-400">
                Markets
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Experience the next generation of trading with Volex.
              Real-time analytics, institutional-grade execution, and zero compromise.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-full bg-profit text-black font-semibold hover:bg-opacity-90 transition-transform active:scale-95"
              >
                Start Trading
              </Link>
              <button className="px-8 py-4 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors">
                View Markets
              </button>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-profit/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </section>

        {/* Feature Highlights */}
        <section className="py-20 border-t border-gray-900/50 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-profit/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-profit" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
                <p className="text-gray-400">Lightning fast market updates and live charting engines.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-loss" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-gray-400">Bank-grade encryption and secure asset custody.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-400">Deep market insights and professional trading tools.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-900 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Volex Trade. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
