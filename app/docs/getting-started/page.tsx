export default function GettingStartedPage() {
  return (
    <>
      <h1>Memulai dengan Kune-Ya</h1>
      <p>Panduan lengkap untuk memulai menggunakan platform Kune-Ya.</p>
      <hr />

      <h2>1. Buat Akun</h2>
      <p>Kunjungi halaman <a href="/register">Daftar</a> dan isi formulir pendaftaran:</p>
      <ul>
        <li><strong>Nama Lengkap</strong> — Nama Anda</li>
        <li><strong>Username</strong> — Identitas unik Anda (untuk profil publik)</li>
        <li><strong>Email</strong> — Gunakan email dinas (*@acehtengahkab.go.id)</li>
        <li><strong>Password</strong> — Minimal 8 karakter</li>
      </ul>
      <p>Setelah mendaftar, Anda akan diarahkan ke halaman masuk.</p>

      <h2>2. Masuk ke Dashboard</h2>
      <p>
        Masuk dengan email dan password yang sudah didaftarkan. Anda akan diarahkan ke <strong>Dashboard</strong> yang berisi area chat utama.
      </p>

      <h2>3. Pilih Persona Agent</h2>
      <p>Di bagian atas chat, pilih persona agent yang sesuai:</p>
      <table>
        <thead><tr><th>Persona</th><th>Gunakan untuk...</th></tr></thead>
        <tbody>
          <tr><td>🤖 <strong>ASN Assistant</strong></td><td>Pertanyaan umum dan administrasi sehari-hari</td></tr>
          <tr><td>📊 <strong>Analis Kebijakan</strong></td><td>Analisis peraturan, UU, dan kebijakan</td></tr>
          <tr><td>📝 <strong>Pembuat Dokumen</strong></td><td>Surat dinas, laporan, proposal</td></tr>
          <tr><td>📢 <strong>Komunikasi</strong></td><td>Materi sosialisasi, konten medsos</td></tr>
          <tr><td>💰 <strong>Bendahara</strong></td><td>Keuangan, anggaran, laporan keuangan</td></tr>
        </tbody>
      </table>

      <h2>4. Mulai Percakapan</h2>
      <p>Ketik pertanyaan atau perintah Anda di kotak chat. Contoh:</p>
      <ul>
        <li>&ldquo;Bantu saya menyusun notulen rapat koordinasi&rdquo;</li>
        <li>&ldquo;Buatkan kerangka presentasi tentang program digitalisasi&rdquo;</li>
        <li>&ldquo;Analisis perbedaan Permenkominfo No.5/2021 dan No.3/2023&rdquo;</li>
        <li>&ldquo;Susun materi sosialisasi tentang keamanan informasi&rdquo;</li>
      </ul>

      <h2>5. Upload Dokumen (RAG)</h2>
      <p>Untuk jawaban yang lebih kontekstual, upload dokumen referensi:</p>
      <ol>
        <li>Klik ikon buku <strong>(📖)</strong> di pojok kanan atas dashboard</li>
        <li>Klik area upload untuk memilih file (PDF, DOCX, atau TXT)</li>
        <li>Tunggu proses ekstraksi teks dan embedding selesai</li>
        <li>Dokumen akan otomatis digunakan sebagai referensi oleh AI</li>
      </ol>

      <h2>Tips Penggunaan</h2>
      <ul>
        <li><strong>Spesifik</strong>: Semakin detail pertanyaan, semakin baik jawabannya</li>
        <li><strong>Konteks</strong>: Upload dokumen terkait sebelum bertanya</li>
        <li><strong>Iterasi</strong>: Tanyakan ulang jika jawaban kurang sesuai</li>
        <li><strong>Persona</strong>: Ganti persona jika tugas membutuhkan keahlian berbeda</li>
        <li><strong>Privasi</strong>: Jangan masukkan data sensitif atau rahasia negara</li>
      </ul>
    </>
  );
}
