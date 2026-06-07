# AI Data Requirements — Kune-Ya.com

> Dokumen ini berisi daftar data, resources, dan infrastruktur yang diperlukan untuk pengembangan fitur AI yang lebih mendalam agar Kune-Ya dapat bekerja secara optimal dan berdampak nyata bagi ASN Diskominfo Aceh Tengah.

---

## 📋 Daftar Isi

1. [Dokumen Regulasi & Kebijakan](#1-dokumen-regulasi--kebijakan)
2. [Knowledge Base Domain Spesifik](#2-knowledge-base-domain-spesifik)
3. [Data Training & Fine-tuning](#3-data-training--fine-tuning)
4. [Integrasi Eksternal](#4-integrasi-eksternal)
5. [Fitur AI Mendatang](#5-fitur-ai-mendatang)
6. [Roadmap Implementasi](#6-roadmap-implementasi)

---

## 1. Dokumen Regulasi & Kebijakan

### 1.1 Peraturan Dasar

Dokumen ini menjadi fondasi untuk persona **Analis Kebijakan** dan **Pembuat Dokumen**.

| # | Dokumen | Kategori | Prioritas |
|---|---------|----------|-----------|
| 1 | UU No. 23/2014 — Pemerintahan Daerah | Regulasi Dasar | 🔴 Tinggi |
| 2 | UU No. 11/2008 jo. UU No. 19/2016 — Informasi & Transaksi Elektronik | Regulasi IT | 🔴 Tinggi |
| 3 | UU No. 27/2022 — Pelindungan Data Pribadi | Regulasi IT | 🔴 Tinggi |
| 4 | PP No. 95/2018 — SPBE (Sistem Pemerintahan Berbasis Elektronik) | Regulasi IT | 🔴 Tinggi |
| 5 | Permenkominfo No. 5/2021 — Penyelenggara Sistem Elektronik | Regulasi IT | 🟡 Sedang |
| 6 | Permenkominfo No. 3/2023 — Perubahan atas Permenkominfo 5/2021 | Regulasi IT | 🟡 Sedang |
| 7 | Perda Aceh Tengah — RPJMD | Daerah | 🟡 Sedang |
| 8 | Perbup — Struktur Organisasi Diskominfo | Daerah | 🟢 Ringan |

### 1.2 Template Dokumen

Untuk meningkatkan kualitas output persona **Pembuat Dokumen**.

| # | Template | Penggunaan |
|---|----------|------------|
| 1 | Surat dinas resmi (format TND) | Operasional harian |
| 2 | Notulen rapat | Operasional harian |
| 3 | Laporan kegiatan | Periodik |
| 4 | Kerangka acuan kerja (KAK) | Proyek |
| 5 | Proposal kegiatan | Pengajuan |
| 6 | SOP teknis | Panduan |
| 7 | Siaran pers | Komunikasi publik |
| 8 | Laporan keuangan (SPJ, SPP, SPM) | Keuangan |

### 1.3 SOP & Juknis Internal

| # | Dokumen | Manfaat untuk AI |
|---|---------|------------------|
| 1 | SOP pengelolaan pengaduan masyarakat | Jawaban lebih akurat |
| 2 | SOP layanan informasi publik | Jawaban lebih akurat |
| 3 | Juknis pengelolaan website/medsos | Konten lebih sesuai |
| 4 | Pedoman tata naskah dinas (TND) | Format surat tepat |
| 5 | Standar pelayanan Diskominfo | Informasi layanan |

---

## 2. Knowledge Base Domain Spesifik

### 2.1 Data Kepegawaian (Anonim)

> **Catatan**: Data ini harus dianonimkan sebelum di-upload ke RAG.

| # | Data | Kegunaan |
|---|------|----------|
| 1 | Struktur organisasi & tupoksi setiap bidang | Konteks organisasi |
| 2 | Alur pengajuan & persetujuan dokumen | Workflow |
| 3 | Jabatan & peran (anonim) | Role-based assistance |
| 4 | Kalender kerja & tahun anggaran | Konteks waktu |

### 2.2 Contoh Dokumen Jadi

Dokumen nyata yang sudah jadi (dianonimkan) sebagai referensi AI:

| # | Jenis | Jumlah Target |
|---|-------|---------------|
| 1 | Surat dinas | 50+ contoh |
| 2 | Notulen rapat | 30+ contoh |
| 3 | Laporan kegiatan | 20+ contoh |
| 4 | Proposal | 10+ contoh |
| 5 | Siaran pers | 20+ contoh |

### 2.3 Terminologi & Glosarium

| # | Istilah | Kategori |
|---|---------|----------|
| 1 | Kamus istilah IT | Teknis |
| 2 | Kamus istilah pemerintahan | Administrasi |
| 3 | Singkatan ASN (DIPA, RKAKL, SPP, SPM, SPD, etc.) | Keuangan |
| 4 | Daftar OPD di Aceh Tengah | Daerah |

---

## 3. Data Training & Fine-tuning

### 3.1 Q&A Pairs

Pasangan pertanyaan-jawaban dari interaksi ASN sehari-hari.

```
Contoh format:
{
  "persona": "analis-kebijakan",
  "pertanyaan": "Apa perbedaan SPBE dan e-government?",
  "konteks": "ASN baru di bidang IT",
  "jawaban_ideal": "...",
  "sumber": ["PP 95/2018", "UU 23/2014"]
}
```

### 3.2 Contoh Percakapan

| # | Skenario | Persona | Contoh Prompt |
|---|----------|---------|---------------|
| 1 | Membuat surat undangan | Pembuat Dokumen | "Buat surat undangan rapat..." |
| 2 | Analisis peraturan | Analis Kebijakan | "Analisis UU PDP pasal 5..." |
| 3 | Konten sosialisasi | Komunikasi | "Buat flyer vaksinasi..." |
| 4 | Laporan keuangan | Bendahara | "Susun laporan SPJ..." |

### 3.3 Feedback Loop

| # | Mekanisme | Tujuan |
|---|-----------|--------|
| 1 | Rating jawaban (👍/👎) | Evaluasi kualitas |
| 2 | Tombol "Laporkan" untuk jawaban salah | Koreksi |
| 3 | Save jawaban yang diedit user | Learning |
| 4 | Log percakapan anonim | Analisis pola |

---

## 4. Integrasi Eksternal

### 4.1 API / Sumber Data

| # | Sumber | Tipe | Prioritas |
|---|--------|------|-----------|
| 1 | JDIH (Jaringan Dokumentasi & Informasi Hukum) | API | 🔴 Tinggi |
| 2 | SIKAP (Sistem Informasi Kearsipan) | API | 🟡 Sedang |
| 3 | Open Data Aceh Tengah | API/Download | 🟡 Sedang |
| 4 | Google Calendar Indonesia | API | 🟢 Ringan |
| 5 | BMKG — Cuaca Aceh Tengah | API | 🟢 Ringan |

### 4.2 Format Dokumen Output

| # | Format | Prioritas |
|---|--------|-----------|
| 1 | DOCX (Word) — template surat | 🔴 Tinggi |
| 2 | PDF — laporan final | 🔴 Tinggi |
| 3 | PPTX — presentasi | 🟡 Sedang |
| 4 | XLSX — data/anggaran | 🟢 Ringan |

---

## 5. Fitur AI Mendatang

Berdasarkan data di atas, fitur AI yang bisa dikembangkan:

### 5.1 Jangka Pendek (Minggu 1–2)

| # | Fitur | Data Diperlukan | Dampak |
|---|-------|-----------------|--------|
| 1 | **Template Engine** — Generate dokumen dari template + variabel | Template dokumen (1.2) | 🟢 Rendah |
| 2 | **Context-Aware RAG** — Prioritaskan dokumen berdasarkan persona & bidang | Dokumen tervalidasi (1.1–1.3) | 🔴 Tinggi |
| 3 | **Smart Persona** — Deteksi otomatis persona dari pertanyaan | Q&A pairs (3.1) | 🟡 Sedang |
| 4 | **Citation & Sumber** — Jawaban sertakan referensi nomor peraturan | Dokumen regulasi (1.1) | 🔴 Tinggi |

### 5.2 Jangka Menengah (Minggu 3–4)

| # | Fitur | Data Diperlukan | Dampak |
|---|-------|-----------------|--------|
| 1 | **Multi-step Agent** — Draft → Review → Revisi → Final | Contoh percakapan (3.2) | 🔴 Tinggi |
| 2 | **Document Generator** — Ekspor ke DOCX/PDF langsung | Template engine (5.1.1) | 🔴 Tinggi |
| 3 | **Sentiment Analysis** — Analisis sentimen opini/kebijakan | Data tambahan NLP | 🟡 Sedang |
| 4 | **Dashboard KPI** — Statistik penggunaan + kualitas jawaban | Log feedback (3.3) | 🟡 Sedang |

### 5.3 Jangka Panjang (Bulan 2+)

| # | Fitur | Data Diperlukan | Dampak |
|---|-------|-----------------|--------|
| 1 | **Fine-tuned model** — Model khusus domain ASN | Semua data di atas | 🔴 Tinggi |
| 2 | **Voice Interface** — Perintah suara | Integrasi STT | 🟡 Sedang |
| 3 | **Multi-agent Workflow** — Kolaborasi antar persona | Workflow otomatis | 🟡 Sedang |
| 4 | **Analytics & Insight** — Rekomendasi berbasis data | Log usage + data eksternal | 🟢 Ringan |

---

## 6. Roadmap Implementasi

```
Minggu 1   → Setup data collection + Upload dokumen regulasi
Minggu 2   → Template engine + Context-aware RAG
Minggu 3   → Multi-step agent + Citation
Minggu 4   → Document generator (DOCX/PDF)
Minggu 5-8 → Fine-tuning, feedback loop, dashboard analytics
```

### Critical Path

```
Upload dokumen regulasi (🔴)
    ↓
Context-aware RAG (🔴)
    ↓
Citation & sumber (🔴)
    ↓
Template engine (🔴)
    ↓
Multi-step agent (🔴)
    ↓
Document generator (🔴)
    ↓
Fine-tuning ⭐
```

---

## Ringkasan Prioritas Data

| Prioritas | Data | Deadline |
|-----------|------|----------|
| **🔴 Wajib (sekarang)** | Template dokumen + SOP + UU dasar | Minggu 1 |
| **🔴 Wajib (sekarang)** | Contoh dokumen jadi (anonim) 20+ | Minggu 1 |
| **🟡 Penting** | Q&A pairs + glosarium | Minggu 2 |
| **🟡 Penting** | Data kepegawaian anonim | Minggu 2 |
| **🟢 Support** | Integrasi API eksternal | Minggu 3+ |

---

> Dokumen ini akan diupdate seiring perkembangan proyek.
> Terakhir diupdate: 7 Juni 2026
