"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={`/${session.user.email?.split("@")[0] || "dashboard"}`}
          className="text-sm text-gayo-950/70 dark:text-gayo-100/70 hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors"
        >
          {session.user.name || "Profil"}
        </Link>
        <button
          onClick={() => signOut()}
          className="border border-gayo-300 dark:border-gayo-700 text-gayo-950 dark:text-gayo-100 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gayo-100 dark:hover:bg-gayo-800 transition-all"
        >
          Keluar
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="text-sm text-gayo-950/70 dark:text-gayo-100/70 hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors"
      >
        Masuk
      </Link>
      <Link
        href="/register"
        className="bg-gayo-900 dark:bg-gayo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gayo-700 dark:hover:bg-gayo-600 transition-all"
      >
        Daftar
      </Link>
    </div>
  );
}
