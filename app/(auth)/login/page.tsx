"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email atau password salah");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gayo-50 dark:bg-gayo-950">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/icon.svg" alt="Kune-Ya" className="h-10 w-10 mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-gayo-900 dark:text-gayo-100">
            Masuk ke Kune-Ya
          </h1>
          <p className="text-sm text-gayo-950/60 dark:text-gayo-100/60 mt-1">
            Silakan masuk dengan akun Anda
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
              className="w-full px-4 py-2.5 rounded-xl border border-gayo-200 dark:border-gayo-800 bg-white dark:bg-gayo-900 text-gayo-950 dark:text-gayo-100 focus:outline-none focus:ring-2 focus:ring-gayo-400 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gayo-900 dark:bg-gayo-700 text-white py-2.5 rounded-xl font-semibold hover:bg-gayo-700 dark:hover:bg-gayo-600 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-sm text-gayo-950/50 dark:text-gayo-100/50 mt-6">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-gayo-700 dark:text-gayo-400 font-medium hover:underline"
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
