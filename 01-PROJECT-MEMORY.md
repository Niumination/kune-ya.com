# Project Memory — Kune-Ya.com

> File ini berfungsi sebagai "memori proyek" agar konteks tidak hilang saat dilanjutkan di lain waktu.

---

## Referensi Utama

| Item | Detail |
|---|---|
| **Inspirasi** | [korinai.com](https://korinai.com) |
| **Direktori Proyek (macOS)** | `/Users/zaryu/Desktop/Niumination/kune-ya.com` |
| **GitHub** | `https://github.com/Niumination/kune-ya.com` |
| **Vercel Live** | `https://kune-ya-com.vercel.app` |
| **Database** | Neon PostgreSQL (`muddy-poetry-36397257`) |
| **AI Provider** | OpenCode AI Zen (`deepseek-v4-flash-free`) |
| **User / Developer** | Zhall / archk4lis

---

## Apa itu KorinAI? (Dianalisis 12 Mei 2026)

- **Platform**: AI Agentic Platform — "The #1 AI-Powered Simplified Agentic Platform"
- **Tech Stack**: Next.js (App Router) + Turbopack + React + TypeScript
- **Rendering**: Client-Side Rendering (CSR) — konten dimuat via JS
- **Routing**: `[username]` catch-all route untuk halaman profil agent
- **Bahasa**: Indonesia
- **Use Case**: English Tutor, Sales, Company Docs, Religious Study
- **Fitur AI**: Persona, Knowledge Base, Multilingual, Summarization
- **Hosting**: IP `66.241.124.111` (kemungkinan Vercel/Cloudflare)

### Kekurangan KorinAI yang Bisa Ditingkatkan
1. Terlalu bergantung pada client-side JS (buruk untuk SEO)
2. Halaman `/docs` dan sub-halaman tidak di-SSR (404 di server)
3. SSL handshake lambat (~1.15 detik)
4. Tidak ada robots.txt
5. `user-scalable=no` mengurangi aksesibilitas

---

## Visi Kune-Ya.com

Platform serupa KorinAI tapi dengan:
- **Konteks & gaya sendiri** (milik Zhall)
- **SSR/ISR lebih baik** untuk SEO optimal
- **Docs yang fully server-rendered**
- **Fitur pembeda** dari KorinAI (belum ditentukan)

---

## Catatan untuk Dilanjutkan

Saat kembali ke proyek ini, langkah selanjutnya:

1. Tentukan niche & branding Kune-Ya
2. Desain logo & palet warna
3. Inisialisasi Next.js project
4. Implementasi landing page
5. Setup routing `[username]`
6. Integrasi AI / LLM
7. Dan seterusnya sesuai roadmap

---

*Terakhir diperbarui: 12 Mei 2026*
