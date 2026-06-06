# Cara Mengakses & Melanjutkan Proyek + Tools yang Dibutuhkan

---

## 1. Cara Mengakses Proyek di Lain Waktu

### Yang Perlu Disimpan / Dicatat

| Item | Lokasi / Catatan |
|---|---|
| **Folder proyek** | `C:\Users\Admin\Zhall-Dev\kune-ya.com` |
| **File analisis KorinAI** | `C:\Users\Admin\Desktop\Analisis-KorinAI.md` |
| **OpenCode** | CLI tool — dijalankan via terminal |
| **Konteks proyek** | Tersimpan di file `01-PROJECT-MEMORY.md` |

### Cara Melanjutkan

1. Buka terminal (PowerShell 7+)
2. Arahkan ke folder proyek:
   ```powershell
   cd C:\Users\Admin\Zhall-Dev\kune-ya.com
   ```
3. Jalankan OpenCode:
   ```powershell
   opencode
   ```
4. Referensi file `00-ROADMAP.md` untuk melihat tahapan yang sudah / belum selesai
5. Mulai dengan fase 1 (inisialisasi Next.js) atau lanjut dari fase terakhir

> **Tips**: Simpan seluruh folder `C:\Users\Admin\Zhall-Dev\` di cloud (OneDrive, Google Drive, GitHub) agar bisa diakses dari perangkat lain.

---

## 2. Apakah OpenCode Bisa Membangun Proyek Ini?

### Yang BISA Dilakukan OpenCode

| Kemampuan | Digunakan Untuk |
|---|---|
| **Menulis kode** | Semua file React, Next.js, TypeScript, CSS |
| **Menjalankan terminal** | `npx create-next-app`, `npm install`, `git push`, dll |
| **Membaca/mengedit file** | Mengubah kode, menambah fitur, refactor |
| **Git operations** | Commit, branch, push ke GitHub |
| **File search & grep** | Mencari kode, debugging |
| **Fetch web** | Mengakses dokumentasi, API references |
| **Membuat folder & file** | Struktur proyek |

### Yang TIDAK BISA Dilakukan OpenCode (Perlu Tools Eksternal)

| Kebutuhan | Tools Eksternal |
|---|---|
| **Menjalankan Next.js dev server** | Terminal + Node.js (`npm run dev`) |
| **Melihat hasil website** | Browser (Chrome/Edge) |
| **Desain visual / UI mockup** | Figma, Excalidraw, atau pensil kertas |
| **Manajemen database** | Supabase Studio, pgAdmin, atau Prisma Studio |
| **Deploy ke production** | Vercel dashboard (`vercel.com`) atau CLI `vercel` |
| **Version control remote** | GitHub (`github.com`) — push via git CLI |
| **API Key AI** | OpenAI / Anthropic dashboard (mendaftar & ambil key) |
| **Code editor (opsional)** | VS Code — jika ingin lihat file secara visual |
| **Domain** | Niagahoster / Cloudflare / Namecheap |

---

## 3. Tools Eksternal yang WAJIB Disiapkan

| No | Tools | Keperluan | Biaya |
|---|---|---|---|
| 1 | **Node.js** (v18+) | Menjalankan Next.js | Gratis |
| 2 | **Git** | Version control | Gratis |
| 3 | **Akun GitHub** | Menyimpan kode remote | Gratis |
| 4 | **Akun Vercel** | Deploy website | Gratis (mulai) |
| 5 | **API Key OpenAI / Anthropic** | Fitur AI agent | Berbayar (pay-per-use) |
| 6 | **Supabase / Neon** | Database PostgreSQL | Gratis (mulai) |
| 7 | **Browser** | Testing & preview | Gratis |

### Opsional (Sangat Disarankan)
| Tools | Keperluan |
|---|---|
| **VS Code** | Melihat & mengedit file secara visual |
| **Figma** | Desain UI sebelum coding |
| **Postman / Bruno** | Testing API |

---

## 4. Alur Kerja yang Disarankan

```
OpenCode (menulis kode) 
    → Terminal di dalam OpenCode (npm run dev, git)
        → Browser (lihat hasil)
            → OpenCode lagi (perbaiki)
                → Git commit & push
                    → Vercel (deploy otomatis)
```

Semua perintah terminal bisa dijalankan langsung dari dalam sesi OpenCode tanpa perlu membuka terminal terpisah.

---

## 5. Ringkasan

> **OpenCode CUKUP** untuk menulis, mengedit, menjalankan perintah, dan mengelola versi kode.
> **Tools eksternal DIPERLUKAN** untuk: preview browser, database, deploy, API AI, dan domain.

Tanpa OpenCode pun proyek tetap bisa dibangun secara manual (coding langsung di VS Code). OpenCode di sini berperan sebagai **asisten AI** yang mempercepat penulisan kode, debugging, dan memberikan arahan teknis.
