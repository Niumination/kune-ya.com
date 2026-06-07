import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatWindow from "@/components/agents/ChatWindow";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gayo-50 dark:bg-gayo-950">
      {/* Dashboard Navbar */}
      <header className="border-b border-gayo-200 dark:border-gayo-800 bg-white/80 dark:bg-gayo-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icon.svg" alt="Kune-Ya" className="h-7 w-7" />
            <span className="text-lg font-heading font-bold text-gayo-900 dark:text-gayo-100">
              kune<span className="text-gayo-400">-ya</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`/dashboard/files`}
              className="text-sm text-gayo-950/60 dark:text-gayo-100/60 hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors"
            >
              File
            </a>
            <a
              href={`/${session.user.username || session.user.name || "profil"}`}
              className="text-sm text-gayo-950/60 dark:text-gayo-100/60 hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors"
            >
              Profil
            </a>
            <a
              href="/"
              className="text-sm text-gayo-950/60 dark:text-gayo-100/60 hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors"
            >
              Beranda
            </a>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <ChatWindow />
    </div>
  );
}
