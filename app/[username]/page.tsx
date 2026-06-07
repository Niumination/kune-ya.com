import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import ShareButton from "@/components/layout/ShareButton";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      image: true,
      bio: true,
      createdAt: true,
    },
  });

  if (!user) {
    notFound();
  }

  const isOwner = session?.user?.id === user.id;

  return (
    <div className="min-h-screen flex flex-col bg-gayo-50 dark:bg-gayo-950 transition-colors duration-300">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-gayo-900 to-gayo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl font-heading font-bold">
              {user.name?.[0] || user.username[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-heading font-bold">
                {user.name || user.username}
              </h1>
              <p className="text-white/70 mt-1">
                {user.role === "admin" ? "Administrator" : "Pengguna"}
              </p>
              {user.bio && (
                <p className="text-white/60 mt-2 text-sm max-w-lg">
                  {user.bio}
                </p>
              )}
              <p className="text-white/40 text-xs mt-2">
                Bergabung{" "}
                {new Date(user.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ShareButton username={user.username} />
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
            Agent AI {user.name || user.username}
          </h2>
          <p className="text-gayo-950/60 dark:text-gayo-100/60 mb-6 max-w-md mx-auto">
            {isOwner
              ? "Ini adalah area agent AI Anda. Mulai percakapan untuk membantu tugas ASN Anda."
              : `Mulai percakapan dengan agent AI ${user.name || user.username}.`}
          </p>
          <Link
            href={isOwner ? "/dashboard" : "#"}
            className="inline-flex items-center gap-2 bg-gayo-900 dark:bg-gayo-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gayo-700 dark:hover:bg-gayo-600 transition-all active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {isOwner ? "Buka Dashboard" : "Mulai Chat"}
          </Link>
        </div>
      </div>
    </div>
  );
}
