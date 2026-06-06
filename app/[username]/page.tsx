import { notFound } from "next/navigation";

// Sementara pakai static param — akan diganti dengan DB query nanti
function getUser(username: string) {
  const users: Record<string, { name: string; role: string }> = {
    "zhall": { name: "Zhall", role: "Developer" },
  };
  return users[username.toLowerCase()] ?? null;
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gayo-50 dark:bg-gayo-950 transition-colors duration-300">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-gayo-900 to-gayo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl font-heading font-bold">
              {user.name[0]}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold">
                {user.name}
              </h1>
              <p className="text-white/70 mt-1">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Area */}
      <div className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white dark:bg-gayo-900 rounded-2xl border border-gayo-200 dark:border-gayo-800 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gayo-100 dark:bg-gayo-800 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-8 h-8 text-gayo-400"
            >
              <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="16" r="6" />
            </svg>
          </div>
          <h2 className="text-xl font-heading font-semibold text-gayo-900 dark:text-gayo-100 mb-2">
            Agent AI {user.name}
          </h2>
          <p className="text-gayo-950/60 dark:text-gayo-100/60">
            Area agent akan segera hadir. Mulai percakapan dengan AI agent
            untuk membantu tugas ASN Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
