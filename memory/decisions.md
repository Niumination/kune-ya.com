# Keputusan Arsitektur — Kune-Ya.com

> Catatan keputusan penting selama pembangunan proyek.
> Setiap keputusan besar dicatat beserta alasan dan alternatif yang dipertimbangkan.

---

## Keputusan #1: Tech Stack

**Tanggal**: 12 Mei 2026  
**Status**: ✅ Final

**Keputusan**:
- Framework: Next.js (App Router) + TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Database: PostgreSQL (Supabase/Neon) + Prisma ORM
- AI/LLM: OpenAI / Anthropic API
- Deployment: Vercel

**Alasan**:
- Sesuai dengan tech stack yang digunakan KorinAI (Next.js)
- Performa baik, ekosistem besar, mudah maintenance
- SSR/ISR untuk SEO optimal

**Alternatif yang Dipertimbangkan**:
- Remix vs Next.js → Next.js menang karena ekosistem lebih besar
- MySQL vs PostgreSQL → PostgreSQL karena fitur vector untuk RAG
- Tailwind vs CSS Modules → Tailwind untuk kecepatan development

---

## Keputusan #2: Routing Pattern

**Tanggal**: 12 Mei 2026  
**Status**: ✅ Final

**Keputusan**:
- Menggunakan `[username]` catch-all route untuk halaman profil agent
- Docs menggunakan route group terpisah dengan SSR penuh

**Alasan**:
- KorinAI menggunakan pola yang sama, terbukti efektif
- Setiap user punya halaman profil unik
- Docs perlu SSR untuk SEO

---

## Keputusan #3: Rendering Strategy

**Tanggal**: 12 Mei 2026  
**Status**: ✅ Final

**Keputusan**:
- Landing page: SSG (Static Site Generation) + ISR
- Halaman profil: SSR (Server-Side Rendering)
- Docs: SSG + ISR
- Dashboard: CSR (Client-Side Rendering) — karena perlu auth

**Alasan**:
- Hindari kelemahan KorinAI yang pure CSR
- Halaman publik harus cepat dan SEO-friendly
- Dashboard membutuhkan interaktivitas tinggi dan data real-time user

---
