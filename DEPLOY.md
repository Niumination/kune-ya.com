# Deploy Kune-Ya.com ke Vercel

Panduan lengkap untuk mendeploy Kune-Ya.com ke Vercel.

---

## Prasyarat

1. **Akun Vercel** — Daftar di [vercel.com](https://vercel.com)
2. **GitHub** — Repo sudah terhubung (`github.com/Niumination/kune-ya.com`)
3. **Environment Variables** — Siapkan nilai berikut:

| Variable | Contoh | Keterangan |
|----------|--------|------------|
| `DATABASE_URL` | `file:./dev.db` | SQLite untuk dev. Ganti PostgreSQL untuk production |
| `AUTH_SECRET` | `generate-with-openssl-rand-64` | Rahasia untuk JWT. Generate: `openssl rand -base64 64` |
| `OPENAI_API_KEY` | `sk-...` | API key dari OpenCode AI Zen atau OpenAI |
| `OPENAI_BASE_URL` | `https://opencode.ai/zen/v1` | Optional. Untuk OpenAI-compatible provider |
| `OPENAI_MODEL` | `deepseek-v4-flash-free` | Nama model yang digunakan |

## Langkah Deploy

### Opsi 1: Deploy via Vercel Dashboard (Mudah)

1. Buka [vercel.com/new](https://vercel.com/new)
2. Import repositori `Niumination/kune-ya.com`
3. Tambahkan **Environment Variables** (lihat tabel di atas)
4. Klik **Deploy**
5. Vercel otomatis mendeteksi Next.js dan menjalankan build

### Opsi 2: Deploy via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

Vercel akan meminta mengatur environment variables secara interaktif.

## Catatan Penting

### Database
- **Development**: SQLite (`prisma/dev.db`) — sudah include di migrate
- **Production**: Ganti ke PostgreSQL (Neon/Supabase) dengan mengubah `provider` di `prisma/schema.prisma` menjadi `"postgresql"` dan update `DATABASE_URL`

### Build Command
Vercel akan menjalankan:
```bash
npx prisma generate && next build
```

### Post-Deploy
1. Set domain kustom (jika sudah beli)
2. Enable **Vercel Analytics** untuk traffic monitoring
3. Setup **Sentry** untuk error tracking (optional)

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Build gagal `prisma generate` | Pastikan `DATABASE_URL` diatur, atau hapus folder `prisma/migrations` dan running `npx prisma migrate dev --name init` |
| Font tidak muncul | Pastikan `preload: false` di `next/font` — sudah di-set |
| API Chat error 401 | Cek `AUTH_SECRET` dan `NEXTAUTH_URL` environment variables |
| 404 saat refresh | Vercel handle secara otomatis untuk Next.js App Router |
