import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dokumentasi — Kune-Ya",
  description:
    "Pelajari cara menggunakan Kune-Ya, platform AI Agentic untuk ASN Diskominfo Aceh Tengah.",
};

const nav = [
  {
    section: "Panduan",
    items: [
      { href: "/docs", label: "Pengantar" },
      { href: "/docs/getting-started", label: "Memulai" },
    ],
  },
  {
    section: "Use Case",
    items: [
      { href: "/docs/use-case", label: "Ikhtisar" },
      { href: "/docs/use-case/administrasi", label: "Administrasi & Dokumen" },
      { href: "/docs/use-case/analisis", label: "Analisis Kebijakan" },
      { href: "/docs/use-case/presentasi", label: "Presentasi & Laporan" },
      { href: "/docs/use-case/sosialisasi", label: "Sosialisasi & Konten" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gayo-50 dark:bg-gayo-950">
      {/* Navbar */}
      <header className="border-b border-gayo-200 dark:border-gayo-800 bg-white/80 dark:bg-gayo-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/icon.svg" alt="Kune-Ya" className="h-7 w-7" />
            <span className="text-lg font-heading font-bold text-gayo-900 dark:text-gayo-100">
              kune<span className="text-gayo-400">-ya</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/docs"
              className="text-gayo-900 dark:text-gayo-100 font-medium"
            >
              Dokumen
            </Link>
            <Link
              href="/"
              className="text-gayo-950/50 dark:text-gayo-100/50 hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors"
            >
              Beranda
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 py-10 pr-8 border-r border-gayo-200 dark:border-gayo-800">
          <nav className="space-y-6">
            {nav.map((section) => (
              <div key={section.section}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gayo-950/40 dark:text-gayo-100/40 mb-2">
                  {section.section}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-sm py-1.5 text-gayo-950/60 dark:text-gayo-100/60 hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 py-10 pb-20 min-w-0">
          <div className="prose prose-gayo dark:prose-invert max-w-none">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gayo-200 dark:border-gayo-800 py-6 text-center text-sm text-gayo-950/40 dark:text-gayo-100/40">
        &copy; 2026 Kune-Ya. Dokumentasi untuk ASN Aceh Tengah.
      </footer>
    </div>
  );
}
