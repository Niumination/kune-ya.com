import ThemeToggle from "@/components/layout/ThemeToggle";
import AuthButton from "@/components/layout/AuthButton";
import Link from "next/link";

const fitur = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Buat Dokumen",
    desc: "Susun laporan, notulen, surat dinas, dan dokumen administrasi lainnya dengan bantuan AI — cepat dan rapi.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Analisis Kebijakan",
    desc: "Input draf kebijakan atau peraturan, AI akan merangkum, membandingkan, dan memberikan rekomendasi.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Presentasi Cepat",
    desc: "Buat slide presentasi dalam hitungan menit dari data dan poin-poin yang Anda miliki.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Sosialisasi & Konten",
    desc: "Hasilkan materi sosialisasi, konten media sosial, dan pengumuman yang sesuai dengan gaya bahasa ASN.",
  },
];

const useCases = [
  {
    title: "Bendahara / Keuangan",
    description: "Membantu menyusun laporan keuangan, notulen rapat anggaran, dan rekonsiliasi data.",
  },
  {
    title: "Bidang Informatika",
    description: "Membantu analisis kebijakan IT, dokumentasi teknis, dan penyusunan SOP sistem.",
  },
  {
    title: "Bidang Persandian",
    description: "Membantu merangkum regulasi keamanan informasi dan menyusun laporan keamanan siber.",
  },
  {
    title: "Bidang Komunikasi",
    description: "Membantu membuat siaran pers, konten sosialisasi program pemerintah, dan penyusunan materi kampanye.",
  },
  {
    title: "Sekretariat",
    description: "Membantu penjadwalan, notulen rapat, surat menyurat, dan pengelolaan agenda pimpinan.",
  },
  {
    title: "Unit Layanan",
    description: "Membantu menjawab pertanyaan publik, membuat SOP pelayanan, dan laporan kinerja.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b border-gayo-200 dark:border-gayo-800 bg-white/80 dark:bg-gayo-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icon.svg" alt="Kune-Ya" className="h-8 w-8" />
            <span className="text-xl font-heading font-bold text-gayo-900 dark:text-gayo-100">
              kune<span className="text-gayo-400">-ya</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gayo-950/70 dark:text-gayo-100/70">
            <a href="#fitur" className="hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors">
              Fitur
            </a>
            <a href="#use-case" className="hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors">
              Use Case
            </a>
            <a href="#kontak" className="hover:text-gayo-900 dark:hover:text-gayo-100 transition-colors">
              Kontak
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex items-center justify-center px-4 py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gayo-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-gayo-100 dark:bg-gayo-900 border border-gayo-200 dark:border-gayo-800 rounded-full px-4 py-1.5 text-sm text-gayo-950/60 dark:text-gayo-100/60 mb-8">
            <span className="w-2 h-2 rounded-full bg-gayo-400 animate-pulse" />
            AI Agentic untuk ASN Aceh Tengah
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-gayo-950 dark:text-gayo-100 leading-tight mb-6">
            Bantu Tugas ASN Lebih{" "}
            <span className="bg-gradient-to-r from-gayo-900 to-gayo-400 bg-clip-text text-transparent">
              Cepat &amp; Cerdas
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gayo-950/60 dark:text-gayo-100/60 max-w-2xl mx-auto mb-10">
            Platform AI Agentic untuk Dinas Kominfo Aceh Tengah —
            administrasi, analisis kebijakan, laporan, presentasi, dan
            sosialisasi, semua dalam satu tempat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-gayo-900 dark:bg-gayo-700 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-gayo-700 dark:hover:bg-gayo-600 transition-all active:scale-95 shadow-lg shadow-gayo-900/20 w-full sm:w-auto text-center"
            >
              Coba Gratis
            </Link>
            <Link
              href="/login"
              className="border border-gayo-300 dark:border-gayo-700 text-gayo-950 dark:text-gayo-100 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-gayo-100 dark:hover:bg-gayo-800 transition-all active:scale-95 w-full sm:w-auto text-center"
            >
              Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="py-20 sm:py-28 bg-gayo-100/50 dark:bg-gayo-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gayo-900 dark:text-gayo-100 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-gayo-950/60 dark:text-gayo-100/60 max-w-xl mx-auto">
              Dibangun khusus untuk kebutuhan ASN Diskominfo Aceh Tengah
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fitur.map((f, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gayo-900 border border-gayo-200 dark:border-gayo-800 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gayo-100 dark:bg-gayo-800 text-gayo-700 dark:text-gayo-400 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-heading font-semibold text-gayo-900 dark:text-gayo-100 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gayo-950/60 dark:text-gayo-100/60 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case */}
      <section id="use-case" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gayo-900 dark:text-gayo-100 mb-4">
              Untuk Siapa?
            </h2>
            <p className="text-gayo-950/60 dark:text-gayo-100/60 max-w-xl mx-auto">
              Setiap bidang di Diskominfo Aceh Tengah bisa terbantu
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="border border-gayo-200 dark:border-gayo-800 rounded-2xl p-6 hover:border-gayo-400 dark:hover:border-gayo-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gayo-100 dark:bg-gayo-800 text-gayo-400 flex items-center justify-center font-heading font-bold text-sm mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-heading font-semibold text-gayo-900 dark:text-gayo-100 mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm text-gayo-950/60 dark:text-gayo-100/60 leading-relaxed">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="py-20 sm:py-28 bg-gayo-100/50 dark:bg-gayo-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gayo-900 dark:text-gayo-100 mb-4">
            Tertarik Mencoba?
          </h2>
          <p className="text-gayo-950/60 dark:text-gayo-100/60 max-w-xl mx-auto mb-10">
            Hubungi kami untuk demo atau informasi lebih lanjut tentang
            implementasi Kune-Ya di lingkungan Diskominfo Aceh Tengah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@kune-ya.com"
              className="inline-flex items-center gap-2 bg-gayo-900 dark:bg-gayo-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gayo-700 dark:hover:bg-gayo-600 transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              hello@kune-ya.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gayo-200 dark:border-gayo-800 py-8 text-center text-sm text-gayo-950/50 dark:text-gayo-100/50">
        &copy; 2026 Kune-Ya. Dibangun untuk ASN Aceh Tengah.
      </footer>
    </div>
  );
}
