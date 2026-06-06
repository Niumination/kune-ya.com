# Kune-Ya.com — Roadmap Pembangunan Platform

> Proyek ini terinspirasi dari [korinai.com] — platform AI Agentic berbasis Next.js.
> Folder ini akan menjadi basis pengembangan platform serupa dengan konteks & gaya sendiri.

---

## Tahapan Pembuatan Platform (Zero to Production)

### Fase 0: Riset & Perencanaan
- [x] Definisikan niche / target pasar (beda dari KorinAI)
- [x] Tentukan fitur inti (minimal 3 use case)
- [ ] Buat mockup UI (Figma/Excalidraw)
- [x] Pilih tech stack final

### Fase 1: Foundation — Next.js + Infra
- [x] Inisialisasi Next.js (App Router) + TypeScript
- [x] Setup Turbopack (dev bundler)
- [x] Konfigurasi Tailwind CSS / CSS Modules
- [x] Setup ESLint + Prettier
- [x] Theme system (light/dark mode)
- [x] Font setup (Inter, Plus Jakarta Sans)
- [ ] Deploy ke Vercel / hosting pilihan

### Fase 2: Landing Page & Branding
- [x] Halaman beranda dengan hero section
- [x] Desain logo & favicon (SVG)
- [x] Manifest.json (PWA)
- [x] Metadata SEO (title, description, Open Graph)
- [x] Sitemap.xml + robots.txt
- [x] Halaman 404 kustom

### Fase 3: Routing & Auth
- [x] `[username]` catch-all route untuk profil user
- [ ] Sistem autentikasi (NextAuth.js / Clerk / custom)
- [ ] Middleware untuk proteksi route
- [ ] Halaman profil pengguna (agent page)

### Fase 4: AI Agent Engine
- [ ] Integrasi LLM API (OpenAI, Anthropic, atau lokal)
- [ ] Sistem Persona (karakter/kepribadian agen)
- [ ] Knowledge Base (RAG — upload dokumen)
- [ ] Multilingual support
- [ ] Summarization engine
- [ ] File upload & processing

### Fase 5: Dokumentasi (Docs)
- [ ] `/docs` layout + sidebar navigasi
- [ ] Halaman getting-started
- [ ] Halaman use case (min. 4 use case)
- [ ] MDX atau CMS untuk konten docs

### Fase 6: Fitur Tambahan
- [ ] Dashboard user
- [ ] Riwayat chat/percakapan
- [ ] Manajemen file
- [ ] Sharing / embed agent
- [ ] Analytics dasar

### Fase 7: Production Readiness
- [ ] SEO audit & improvement
- [ ] Performance optimization (SSR/ISR)
- [ ] Security hardening
- [ ] Error monitoring (Sentry)
- [ ] CI/CD pipeline
- [ ] SSL optimization

---

## Tech Stack yang Direkomendasikan

| Layer | Pilihan |
|---|---|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Database** | PostgreSQL (Neon / Supabase) |
| **ORM** | Prisma / Drizzle |
| **Auth** | NextAuth.js / Clerk |
| **AI/LLM** | OpenAI API / Anthropic / Google Gemini |
| **Vector DB** | Pinecone / Supabase pgvector |
| **File Storage** | Uploadthing / AWS S3 / Cloudflare R2 |
| **Deployment** | Vercel |
| **Monitoring** | Sentry + PostHog |

---

> **Catatan**: Detail implementasi, kode, dan konfigurasi akan ditambahkan di file terpisah saat pembangunan dimulai.
