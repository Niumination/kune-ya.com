# AGENTS.md — Kune-Ya.com Project Rules

> File ini dibaca otomatis oleh OpenCode setiap sesi.
> Berisi aturan, konteks, dan panduan untuk membangun platform ini.

---

## 📋 Identitas Proyek

- **Nama**: Kune-Ya.com
- **Tujuan**: Platform AI Agentic (terinspirasi dari korinai.com)
- **Tech Stack Utama**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Database**: PostgreSQL (Supabase/Neon) + Prisma/Drizzle ORM
- **AI/LLM**: OpenAI / Anthropic API
- **Deployment**: Vercel
- **Domain**: kune-ya.com (belum dibeli)
- **User/Developer**: Zhall
- **Folder Proyek**: `C:\Users\Admin\Zhall-Dev\kune-ya.com`

---

## 🎯 Aturan Umum

1. Gunakan TypeScript secara strict di semua file
2. Ikuti pola App Router Next.js (file-based routing di `app/`)
3. Komponen React menggunakan fungsi, bukan kelas
4. Semua state management pakai React hooks (useState, useContext, dll)
5. Jangan gunakan `any` di TypeScript — buat tipe yang sesuai
6. Setiap fitur baru harus memiliki fallback/error state
7. Testing: minimal untuk komponen kritis
8. SEO: pastikan setiap halaman memiliki metadata yang proper
9. Aksesibilitas: gunakan semantic HTML, ARIA labels
10. Jangan commit secrets/keys ke Git — pakai `.env.local`

---

## 🏗️ Struktur Proyek (Rencana)

```
kune-ya.com/
├── app/                    # Next.js App Router
│   ├── (landing)/          # Landing page group
│   │   └── page.tsx
│   ├── (dashboard)/        # Dashboard group (auth protected)
│   │   └── page.tsx
│   ├── [username]/         # User profile / agent page
│   │   └── page.tsx
│   ├── docs/               # Dokumentasi
│   │   ├── getting-started/
│   │   └── usecase/
│   ├── layout.tsx
│   └── globals.css
├── components/             # Shared components
│   ├── ui/                 # shadcn/ui atau komponen dasar
│   ├── layout/             # Navbar, Footer, Sidebar
│   └── agents/             # Agent-related components
├── lib/                    # Utility functions
│   ├── db.ts               # Database connection
│   ├── ai.ts               # AI/LLM integration
│   └── utils.ts
├── types/                  # TypeScript type definitions
├── public/                 # Static assets (logo, favicon, dll)
├── docs/                   # Dokumentasi tambahan (opsional)
├── .env.local              # Environment variables (tidak di-commit)
├── opencode.json           # OpenCode config
├── AGENTS.md               # File ini
└── 00-ROADMAP.md           # Roadmap proyek
```

---

## 🚀 Alur Kerja

1. Sebelum memulai fitur baru, baca dulu `00-ROADMAP.md` untuk lihat progress
2. Tanyakan dulu sebelum menghapus atau mengubah file yang sudah ada
3. Jalankan `npm run lint` setelah selesai menulis kode
4. Komit pesan: `"feat: ..."` / `"fix: ..."` / `"refactor: ..."`
5. Push ke GitHub secara berkala

---

## 📚 Referensi Penting

| File | Isi |
|---|---|
| `00-ROADMAP.md` | Tahapan pembangunan dari nol hingga production |
| `01-PROJECT-MEMORY.md` | Memori proyek, referensi KorinAI |
| `02-AKSES-DAN-TOOLS.md` | Panduan akses & tools eksternal |
| `AGENTS.md` | **File ini** — aturan untuk AI |
| `memory/INDEX.md` | Indeks semua sesi & history |
| `memory/decisions.md` | Keputusan arsitektur penting |
| `memory/sessions/` | Folder berisi log per sesi |

---

## 📝 Aturan Tracking Sesi (WAJIB)

Setiap sesi OpenCode harus dicatat. Ini aturannya:

### Kapan mencatat
- **Akhir sesi**: Saat user selesai (mengucapkan "selesai", "bye", "lanjut nanti", dll)
- **Keputusan besar**: Segera setelah ada keputusan arsitektur/fitur
- **Tahap selesai**: Setelah menyelesaikan satu fase di roadmap

### Cara mencatat
1. Buat file di `memory/sessions/` dengan format `YYYY-MM-DD-sesi-{nomor}.md`
2. Gunakan template di `memory/sessions/TEMPLATE.md`
3. Isi: apa yang dilakukan, file yang diubah, keputusan, rencana selanjutnya
4. Update `memory/INDEX.md` — tambah baris baru di tabel daftar sesi
5. Jika ada keputusan arsitektur, catat juga di `memory/decisions.md`

### ⚠️ Prosedur Awal Sesi (WAJIB)

Setiap kali sesi OpenCode dimulai di folder ini, AI **WAJIB** melakukan ini sebelum memulai pekerjaan apa pun:

1. **Buka `memory/INDEX.md`** — lihat daftar sesi
2. **Baca sesi terakhir** dari `memory/sessions/` — file dengan nomor tertinggi
3. **Tampilkan ringkasan progres** ke user dengan format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 RINGKASAN SESI TERAKHIR

Progres saat ini: [fase/tahap]
Terakhir dikerjakan: [tanggal sesi terakhir]
Yang sudah selesai: [poin-poin dari sesi terakhir]
Rencana selanjutnya: [dari sesi terakhir]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

4. Tanya user: "Lanjut dari rencana terakhir atau ada perubahan?"

### Prosedur Akhir Sesi (WAJIB)
- Di akhir sesi, AI **wajib menawarkan diri** untuk membuat ringkasan sesi
- Jika user setuju, buat file sesi baru dan update INDEX.md
- Jika koneksi terputus mendadak, progress terakhir tetap tersimpan di file sesi sebelumnya

---

## 🧠 Catatan untuk AI (OpenCode)

- Prioritas utama: **SSR/ISR lebih baik dari KorinAI** (jangan pure CSR)
- Docs harus fully server-rendered (tidak seperti KorinAI yang return 404 di server)
- Gunakan komponen yang sudah ada sebelum membuat yang baru
- Jika ragu tentang arsitektur, tanya dulu ke user (Zhall)
- Jangan generate file yang tidak diminta
- Setelah deploy production, jalankan audit performa & SEO

---

*Dibuat: 12 Mei 2026 | Project: Kune-Ya.com*
