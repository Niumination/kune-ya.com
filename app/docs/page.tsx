export default function DocsPage() {
  return (
    <>
      <h1>Selamat Datang di Kune-Ya</h1>
      <p>
        <strong>Platform AI Agentic untuk ASN Diskominfo Aceh Tengah</strong>
      </p>
      <hr />
      <p>
        Kune-Ya adalah asisten AI yang dirancang khusus untuk membantu Aparatur Sipil Negara (ASN) di lingkungan Dinas Komunikasi dan Informatika Aceh Tengah dalam menyelesaikan tugas sehari-hari.
      </p>
      <h2>Apa yang Bisa Kune-Ya Lakukan?</h2>
      <ul>
        <li><strong>Menyusun Dokumen</strong> — Surat dinas, laporan, notulen, dan proposal</li>
        <li><strong>Analisis Kebijakan</strong> — Merangkum dan membandingkan peraturan</li>
        <li><strong>Presentasi Cepat</strong> — Membuat slide dari data dan poin-poin Anda</li>
        <li><strong>Sosialisasi &amp; Konten</strong> — Materi sosialisasi dan konten media sosial</li>
        <li><strong>Administrasi Keuangan</strong> — Laporan keuangan dan anggaran</li>
      </ul>
      <h2>Mulai Cepat</h2>
      <ol>
        <li><a href="/register">Buat akun</a> atau <a href="/login">Masuk</a></li>
        <li>Pilih <strong>persona</strong> agent yang sesuai dengan kebutuhan Anda</li>
        <li>Mulai percakapan — tanyakan apa yang perlu Anda bantu</li>
        <li>Upload dokumen untuk referensi agar jawaban lebih kontekstual</li>
      </ol>
      <h2>Persona Agent</h2>
      <table>
        <thead><tr><th>Persona</th><th>Keahlian</th></tr></thead>
        <tbody>
          <tr><td><strong>ASN Assistant</strong> 🤖</td><td>Administrasi umum sehari-hari</td></tr>
          <tr><td><strong>Analis Kebijakan</strong> 📊</td><td>Analisis peraturan dan regulasi</td></tr>
          <tr><td><strong>Pembuat Dokumen</strong> 📝</td><td>Surat menyurat dan dokumen resmi</td></tr>
          <tr><td><strong>Komunikasi &amp; Sosialisasi</strong> 📢</td><td>Konten publik dan media sosial</td></tr>
          <tr><td><strong>Bendahara &amp; Keuangan</strong> 💰</td><td>Anggaran dan keuangan</td></tr>
        </tbody>
      </table>
    </>
  );
}
