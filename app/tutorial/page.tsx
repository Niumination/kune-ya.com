import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tutorial Chat AI — Kune-Ya",
  description:
    "Panduan lengkap menggunakan fitur chat AI di dashboard Kune-Ya untuk membantu tugas ASN sehari-hari.",
};

export default function TutorialPage() {
  return (
    <div className="min-h-screen bg-gayo-50 dark:bg-gayo-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gayo-900 to-gayo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Tutorial Penggunaan AI Chat
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Pelajari cara menggunakan fitur chat AI di dashboard Kune-Ya untuk
            membantu tugas ASN Anda sehari-hari.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 pb-20">
        {/* Daftar Isi */}
        <div className="bg-white dark:bg-gayo-900 rounded-2xl border border-gayo-200 dark:border-gayo-800 p-6 mb-10">
          <h2 className="font-heading font-semibold text-gayo-900 dark:text-gayo-100 mb-4">
            Daftar Isi
          </h2>
          <ol className="space-y-2 text-sm">
            {sections.map((s, i) => (
              <li key={i}>
                <a
                  href={`#${s.id}`}
                  className="text-gayo-700 dark:text-gayo-400 hover:underline"
                >
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        {sections.map((section, i) => (
          <section key={i} id={section.id} className="mb-12 scroll-mt-20">
            <div className="bg-white dark:bg-gayo-900 rounded-2xl border border-gayo-200 dark:border-gayo-800 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-gayo-100 dark:bg-gayo-800 text-gayo-700 dark:text-gayo-400 flex items-center justify-center text-sm font-heading font-bold">
                  {i + 1}
                </span>
                <h2 className="text-xl font-heading font-bold text-gayo-900 dark:text-gayo-100">
                  {section.title}
                </h2>
              </div>
              <div className="prose prose-gayo dark:prose-invert max-w-none">
                {section.content}
              </div>
            </div>
          </section>
        ))}

        {/* Tombol Aksi */}
        <div className="text-center mt-8">
          <p className="text-gayo-950/60 dark:text-gayo-100/60 mb-6">
            Siap mencoba? Mulai chat dengan AI Agent sekarang.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gayo-900 dark:bg-gayo-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gayo-700 dark:hover:bg-gayo-600 transition-all active:scale-95 shadow-lg shadow-gayo-900/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Buka Dashboard Chat
          </Link>
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    id: "akses-dashboard",
    title: "Akses Dashboard Chat",
    content: (
      <>
        <p>
          Setelah login, Anda akan diarahkan ke halaman Dashboard. Dashboard
          adalah pusat kendali utama Kune-Ya, tempat Anda bisa berinteraksi
          dengan AI Agent.
        </p>
        <p>Cara mengakses:</p>
        <ol>
          <li>
            Klik tombol <strong>&ldquo;Coba Gratis&rdquo;</strong> di halaman
            utama, atau
          </li>
          <li>
            Klik <strong>&ldquo;Masuk&rdquo;</strong> jika sudah punya akun
          </li>
          <li>
            Setelah login, Anda otomatis masuk ke halaman Dashboard
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "memilih-persona",
    title: "Memilih Persona Agent",
    content: (
      <>
        <p>
          Persona adalah karakter/kepribadian AI Agent yang menentukan gaya
          dan keahlian jawaban. Kune-Ya memiliki <strong>5 persona</strong>{" "}
          yang bisa dipilih:
        </p>
        <table>
          <thead>
            <tr>
              <th>Persona</th>
              <th>Emoji</th>
              <th>Keahlian</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ASN Assistant</td>
              <td>🤖</td>
              <td>Administrasi umum, presentasi, laporan</td>
            </tr>
            <tr>
              <td>Analis Kebijakan</td>
              <td>📊</td>
              <td>Analisis peraturan dan kebijakan</td>
            </tr>
            <tr>
              <td>Pembuat Dokumen</td>
              <td>📝</td>
              <td>Surat dinas, notulen, dokumen resmi</td>
            </tr>
            <tr>
              <td>Komunikasi</td>
              <td>📢</td>
              <td>Konten sosialisasi dan media sosial</td>
            </tr>
            <tr>
              <td>Bendahara</td>
              <td>💰</td>
              <td>Keuangan dan anggaran</td>
            </tr>
          </tbody>
        </table>
        <p>
          Cara memilih: Klik nama persona di bagian atas chat. Persona yang
          aktif akan berwarna hijau gelap.
        </p>
      </>
    ),
  },
  {
    id: "memulai-chat",
    title: "Memulai Chat",
    content: (
      <>
        <p>Ada dua cara untuk memulai chat:</p>
        <h3>Cara 1: Ketik Pertanyaan Sendiri</h3>
        <ol>
          <li>Klik kotak input &ldquo;Ketik pesan Anda...&rdquo;</li>
          <li>Ketik pertanyaan atau perintah Anda</li>
          <li>
            Tekan <strong>Enter</strong> atau klik ikon kirim (✈️)
          </li>
        </ol>
        <h3>Cara 2: Gunakan Pertanyaan Cepat</h3>
        <p>
          Jika Anda baru pertama kali menggunakan, Anda bisa klik salah satu
          pertanyaan cepat yang tersedia:
        </p>
        <ul>
          <li>&ldquo;Bantu saya menyusun laporan kegiatan&rdquo;</li>
          <li>&ldquo;Analisis kebijakan ini untuk saya&rdquo;</li>
          <li>&ldquo;Buatkan notulen rapat&rdquo;</li>
          <li>&ldquo;Susun materi sosialisasi&rdquo;</li>
        </ul>
      </>
    ),
  },
  {
    id: "membaca-streaming",
    title: "Membaca Jawaban Streaming",
    content: (
      <>
        <p>
          Kune-Ya menggunakan teknologi <strong>streaming</strong> untuk
          menampilkan jawaban secara real-time. Artinya:
        </p>
        <ul>
          <li>
            ✅ Jawaban muncul <strong>karakter per karakter</strong> seperti
            sedang diketik
          </li>
          <li>
            ✅ Anda tidak perlu menunggu jawaban selesai untuk mulai membaca
          </li>
          <li>
            ✅ Proses lebih cepat secara keseluruhan
          </li>
        </ul>
        <p>
          Selama streaming berlangsung, Anda akan melihat animasi{" "}
          <strong>3 titik berkedip</strong> sebagai indikator.
        </p>
      </>
    ),
  },
  {
    id: "upload-dokumen",
    title: "Upload Dokumen (Knowledge Base)",
    content: (
      <>
        <p>
          Fitur Knowledge Base memungkinkan Anda mengupload dokumen yang akan
          digunakan sebagai referensi oleh AI.
        </p>
        <h3>Cara Upload:</h3>
        <ol>
          <li>
            Klik ikon buku <strong>(📖)</strong> di pojok kanan atas dashboard
          </li>
          <li>Panel Knowledge Base akan terbuka dari sisi kanan</li>
          <li>
            Klik area upload atau drag-and-drop file (PDF, DOCX, atau TXT)
          </li>
          <li>
            Tunggu proses selesai (ekstraksi teks + embedding, biasanya
            3-10 detik)
          </li>
        </ol>
        <h3>Ketentuan:</h3>
        <ul>
          <li>Format: <strong>PDF</strong>, <strong>DOCX</strong>, atau <strong>TXT</strong></li>
          <li>Maksimal: <strong>10MB</strong> per file</li>
          <li>Dokumen akan otomatis terdeteksi untuk pertanyaan relevan</li>
        </ul>
      </>
    ),
  },
  {
    id: "mengelola-riwayat",
    title: "Mengelola Riwayat Chat",
    content: (
      <>
        <p>
          Semua percakapan Anda tersimpan secara otomatis dan bisa diakses
          kapan saja melalui sidebar.
        </p>
        <h3>Fitur Riwayat:</h3>
        <ul>
          <li>
            <strong>Melihat riwayat</strong> — Klik menu hamburger (☰) di
            pojok kiri atas untuk membuka sidebar
          </li>
          <li>
            <strong>Melanjutkan chat</strong> — Klik percakapan di sidebar
            untuk melanjutkan
          </li>
          <li>
            <strong>Percakapan baru</strong> — Klik &ldquo;Percakapan Baru&rdquo;
            di sidebar
          </li>
          <li>
            <strong>Menghapus</strong> — Hover pada percakapan dan klik ikon
            tong sampah
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "tips",
    title: "Tips Penggunaan Optimal",
    content: (
      <>
        <ul>
          <li>
            <strong>Semakin spesifik, semakin baik</strong> — Berikan konteks
            yang jelas. Daripada &ldquo;buat surat&rdquo;, lebih baik
            &ldquo;buat surat undangan rapat koordinasi SPBE tanggal 15 Juni
            2026 kepada 10 UPT&rdquo;
          </li>
          <li>
            <strong>Upload dokumen dulu</strong> — Jika Anda ingin bertanya
            tentang isi dokumen, upload dulu sebelum bertanya
          </li>
          <li>
            <strong>Ganti persona sesuai tugas</strong> — Persona yang tepat
            akan memberikan jawaban yang lebih relevan
          </li>
          <li>
            <strong>Iterasi</strong> — Jika jawaban kurang tepat, tanyakan
            ulang dengan lebih detail, atau minta revisi
          </li>
          <li>
            <strong>Jangan ragu coba-coba</strong> — Tidak ada batasan
            percakapan, eksplorasi semua fitur
          </li>
          <li>
            <strong>Keamanan data</strong> — Jangan upload dokumen yang
            mengandung informasi rahasia atau sensitif
          </li>
        </ul>
      </>
    ),
  },
];
