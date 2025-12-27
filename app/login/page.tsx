"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBROWSERClient } from "@/utils/supabase/client"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const supabase = createBROWSERClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        setLoading(false)
        if (error) {
            setError(error.message)
            return
        }
        router.push("/trade")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-slate-800/60 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Sign in to ChartFlow</h2>
                {error && <div className="mb-4 text-red-400">{error}</div>}
                <label className="block mb-3">
                    <span className="text-sm text-slate-300">Email</span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 block w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2" required />
                </label>
                <label className="block mb-4">
                    <span className="text-sm text-slate-300">Password</span>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 block w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2" required />
                </label>
                <button type="submit" className="w-full py-2 px-4 rounded bg-emerald-500 hover:bg-emerald-600 text-black font-semibold" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </div>
    )
}
