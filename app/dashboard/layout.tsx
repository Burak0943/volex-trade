import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/auth/actions";
import DashboardToaster from "@/components/dashboard/Toaster";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <DashboardToaster />
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 bg-black/20 hidden md:flex flex-col">
                <div className="p-6">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Volex<span className="text-profit">Trade</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <NewLink href="/dashboard" label="Overview" active />
                    <NewLink href="/dashboard/markets" label="Markets" />
                    <NewLink href="/dashboard/portfolio" label="Portfolio" />
                    <NewLink href="/dashboard/activity" label="Activity" />
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 w-full px-4 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                            {user.email?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate w-32" title={user.email}>{user.email}</p>
                        </div>
                    </div>
                    <form action={signOut}>
                        <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-loss/10 text-loss hover:text-loss rounded-lg transition-colors text-sm">
                            <span>Sign Out</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Mobile Header would go here */}

                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NewLink({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active
                ? "bg-profit/10 text-profit border border-profit/20"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
        >
            <span>{label}</span>
        </Link>
    );
}
