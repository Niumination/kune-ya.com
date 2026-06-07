# Cara Mengakses & Melanjutkan Proyek + Tools yang Dibutuhkan

---

## 1. Cara Mengakses Proyek di Lain Waktu

### Yang Perlu Disimpan / Dicatat

| Item | Lokasi / Catatan |
|---|---|
| **Folder proyek** | `/Users/zaryu/Desktop/Niumination/kune-ya.com` |
| **GitHub remote** | `https://github.com/Niumination/kune-ya.com` |
| **Vercel dashboard** | [kune-ya-com di Vercel](https://vercel.com/archk4lis-projects/kune-ya-com) |
| **Neon database** | PostgreSQL — `muddy-poetry-36397257` |
| **API Key AI** | OpenCode AI Zen (key di `.env`) |
| **Dokumentasi proyek** | File `.md` di root & folder `docs/` |

### Prasyarat

| Tools | Version | Cek |
|-------|---------|-----|
| **Node.js** | v18+ | `node --version` |
| **npm** | v10+ | `npm --version` |
| **Git** | v2+ | `git --version` |
| **Vercel CLI** | v48+ | `vercel --version` |
| **Prisma** | v6 | `npx prisma --version` |

### Cara Melanjutkan

```bash
# 1. Clone repo
git clone https://github.com/Niumination/kune-ya.com.git
cd kune-ya.com

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env   # atau salin dari Vercel: vercel env pull

# 4. Setup database
npx prisma migrate dev --name init

# 5. Jalankan dev server
npm run dev
# Buka http://localhost:3000
```

---

## 2. Tools & Layanan yang Digunakan

| Tools | Fungsi | Status |
|-------|--------|--------|
| **Next.js 15** | Framework web (App Router + Turbopack) | ✅ Terinstall |
| **Tailwind CSS v4** | Styling + custom theme Gayo | ✅ Aktif |
| **TypeScript** | Type safety | ✅ Strict mode |
| **Prisma 6** | ORM database | ✅ PostgreSQL |
| **Neon** | Database PostgreSQL serverless | ✅ Aktif |
| **NextAuth.js v5** | Autentikasi (Credentials + JWT) | ✅ Aktif |
| **OpenAI SDK** | AI/LLM integration | ✅ Terhubung ke OpenCode AI Zen |
| **OpenCode AI Zen** | LLM provider (deepseek-v4-flash-free) | ✅ Gratis |
| **Vercel** | Hosting & deployment | ✅ Aktif |
| **GitHub** | Version control | ✅ Terhubung |
| **@tailwindcss/typography** | Styling konten docs | ✅ Aktif |
| **bcryptjs** | Password hashing | ✅ Aktif |
| **pdf-parse / mammoth** | Ekstraksi teks dokumen (RAG) | ✅ Aktif |

### API Keys & Credentials

| Variable | Lokasi | Diperlukan Untuk |
|----------|--------|------------------|
| `DATABASE_URL` | `.env` + Vercel env | Koneksi Neon PostgreSQL |
| `AUTH_SECRET` | `.env` + Vercel env | JWT signing (NextAuth) |
| `OPENAI_API_KEY` | `.env` + Vercel env | AI chat + embedding (RAG) |
| `OPENAI_BASE_URL` | `.env` + Vercel env | Endpoint AI Zen |
| `OPENAI_MODEL` | `.env` + Vercel env | Model AI yang dipakai |

---

## 3. Struktur Proyek (Final)

```
kune-ya.com/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages group
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/              # Dashboard group (auth protected)
│   │   └── dashboard/
│   │       ├── page.tsx          # Chat utama
│   │       └── files/            # Manajemen file
│   ├── [username]/page.tsx       # Profil publik
│   ├── api/                      # API routes
│   │   ├── auth/                 # Auth endpoints
│   │   ├── chat/route.ts         # Chat streaming
│   │   ├── conversations/        # Riwayat chat
│   │   ├── documents/            # Upload RAG
│   │   └── analytics/route.ts   # Tracking
│   ├── docs/                     # Dokumentasi (7 halaman)
│   ├── tutorial/page.tsx         # Tutorial AI chat
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── not-found.tsx             # 404 custom
│   └── sitemap.ts                # SEO sitemap
├── components/
│   ├── agents/                   # ChatWindow, ChatSidebar, DocumentsPanel
│   └── layout/                   # ThemeToggle, AuthButton, AnalyticsTracker, etc
├── lib/                          # Utility libraries
│   ├── ai.ts                     # OpenAI client + 5 Persona
│   ├── auth.ts                   # NextAuth config
│   ├── chat.ts                   # Tipe data chat
│   ├── db.ts                     # Prisma client
│   └── rag.ts                    # Text extraction + embedding
├── prisma/
│   └── schema.prisma             # Database model
├── public/                       # Assets
├── types/                        # TypeScript declarations
├── docs/                         # Dokumentasi tambahan
│   └── AI-DATA-REQUIREMENTS.md   # AI data planning
├── memory/                       # Session logs + project memory
├── middleware.ts                 # Security headers
├── next.config.ts
├── vercel.json
├── DEPLOY.md
└── AGENTS.md                     # Aturan untuk AI OpenCode
```

---

## 4. Alur Kerja

```
OpenCode / VS Code (menulis kode)
    → Terminal (npm run dev, git, vercel)
        → Browser localhost:3000 (lihat hasil)
            → Code lagi (perbaiki)
                → Git commit & push
                    → Vercel auto-deploy 🚀
```

### Perintah Penting

```bash
npm run dev          # Jalankan dev server (Turbopack)
npm run build        # Build production
npm run lint         # Cek ESLint
npx prisma studio    # Buka database UI
vercel --prod        # Deploy ke production
vercel env pull      # Pull env vars dari Vercel
```

---

## 5. Environment Variables (Lokal)

File `.env` di root proyek:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."
OPENAI_API_KEY="sk-..."
OPENAI_BASE_URL="https://opencode.ai/zen/v1"
OPENAI_MODEL="deepseek-v4-flash-free"
```

---

## 6. Rencana Pengembangan AI Mendatang

Lihat file terpisah: [`docs/AI-DATA-REQUIREMENTS.md`](./AI-DATA-REQUIREMENTS.md)

Prioritas utama:
1. Upload dokumen regulasi + template ke RAG
2. Context-aware RAG (persona-based)
3. Citation & sumber jawaban
4. Template engine untuk dokumen
5. Multi-step agent (draft → review → final)
6. Document generator (ekspor DOCX/PDF)
