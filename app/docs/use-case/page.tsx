export default function UseCasePage() {
  return (
    <>
      <h1>Use Case — Kune-Ya</h1>
      <p>
        Kune-Ya dapat digunakan di berbagai bidang dan tugas di lingkungan Diskominfo Aceh Tengah. Berikut adalah use case utama:
      </p>
      <hr />

      <h2>Bidang yang Terbantu</h2>
      <table>
        <thead><tr><th>Bidang</th><th>Agent yang Cocok</th><th>Tugas Utama</th></tr></thead>
        <tbody>
          <tr><td><a href="/docs/use-case/administrasi">Administrasi &amp; Dokumen</a></td><td>Pembuat Dokumen 📝</td><td>Surat, laporan, notulen</td></tr>
          <tr><td><a href="/docs/use-case/analisis">Analisis Kebijakan</a></td><td>Analis Kebijakan 📊</td><td>Regulasi, perbandingan</td></tr>
          <tr><td><a href="/docs/use-case/presentasi">Presentasi &amp; Laporan</a></td><td>ASN Assistant 🤖</td><td>Slide, data, grafik</td></tr>
          <tr><td><a href="/docs/use-case/sosialisasi">Sosialisasi &amp; Konten</a></td><td>Komunikasi 📢</td><td>Medsos, publikasi</td></tr>
        </tbody>
      </table>

      <h2>Tips Memilih Persona</h2>
      <ol>
        <li><strong>Satu persona per percakapan</strong> — Ganti persona sesuai kebutuhan</li>
        <li><strong>Persona umum</strong> — Mulai dengan ASN Assistant untuk tugas general</li>
        <li><strong>Persona spesifik</strong> — Gunakan persona khusus untuk tugas yang membutuhkan keahlian tertentu</li>
        <li><strong>Kombinasikan dengan RAG</strong> — Upload dokumen terkait untuk hasil maksimal</li>
      </ol>
    </>
  );
}
