"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan");
        setLoading(false);
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Gagal terhubung ke server");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gayo-50 dark:bg-gayo-950">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/icon.svg" alt="Kune-Ya" className="h-10 w-10 mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-gayo-900 dark:text-gayo-100">
            Daftar Akun Baru
          </h1>
          <p className="text-sm text-gayo-950/60 dark:text-gayo-100/60 mt-1">
            Buat akun untuk mulai menggunakan Kune-Ya
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-xl px-4 py-2.5">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gayo-950/70 dark:text-gayo-100/70 mb-1"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2.5 rounded-xl border border-gayo-200 dark:border-gayo-800 bg-white dark:bg-gayo-900 text-gayo-950 dark:text-gayo-100 focus:outline-none focus:ring-2 focus:ring-gayo-400 transition-colors"
              placeholder="Nama Anda"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gayo-950/70 dark:text-gayo-100/70 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gayo-200 dark:border-gayo-800 bg-white dark:bg-gayo-900 text-gayo-950 dark:text-gayo-100 focus:outline-none focus:ring-2 focus:ring-gayo-400 transition-colors"
              placeholder="username-anda"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gayo-950/70 dark:text-gayo-100/70 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gayo-200 dark:border-gayo-800 bg-white dark:bg-gayo-900 text-gayo-950 dark:text-gayo-100 focus:outline-none focus:ring-2 focus:ring-gayo-400 transition-colors"
              placeholder="asn@acehtengahkab.go.id"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gayo-950/70 dark:text-gayo-100/70 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength={8}
              className="w-full px-4 py-2.5 rounded-xl border border-gayo-200 dark:border-gayo-800 bg-white dark:bg-gayo-900 text-gayo-950 dark:text-gayo-100 focus:outline-none focus:ring-2 focus:ring-gayo-400 transition-colors"
              placeholder="Min. 8 karakter"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gayo-900 dark:bg-gayo-700 text-white py-2.5 rounded-xl font-semibold hover:bg-gayo-700 dark:hover:bg-gayo-600 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-sm text-gayo-950/50 dark:text-gayo-100/50 mt-6">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-gayo-700 dark:text-gayo-400 font-medium hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
