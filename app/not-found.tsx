import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gayo-50 dark:bg-gayo-950 transition-colors duration-300">
      <div className="max-w-md text-center">
        {/* Ilustrasi */}
        <div className="mb-8">
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-32 mx-auto text-gayo-200 dark:text-gayo-800"
          >
            <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="2" />
            <path
              d="M40 45 L80 45 M40 60 L70 60 M40 75 L60 75"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="85" cy="35" r="12" fill="currentColor" />
            <text
              x="85"
              y="39"
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
            >
              ?
            </text>
          </svg>
        </div>

        <h1 className="text-6xl font-heading font-extrabold text-gayo-900 dark:text-gayo-100 mb-4">
          404
        </h1>
        <p className="text-lg text-gayo-950/60 dark:text-gayo-100/60 mb-8">
          Halaman yang Anda cari tidak ditemukan. Mungkin sudah dipindahkan atau
          dihapus.
        </p>
        <Link
          href="/"
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
