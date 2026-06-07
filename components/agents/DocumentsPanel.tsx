"use client";

import { useState, useEffect, useRef } from "react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  open: boolean;
  onToggle: () => void;
}

export default function DocumentsPanel({ open, onToggle }: Props) {
  const [docs, setDocs] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const loadDocs = async () => {
    try {
      const res = await fetch("/api/documents");
      if (res.ok) setDocs(await res.json());
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) loadDocs();
  }, [open]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal mengupload");
      } else {
        loadDocs();
      }
    } catch {
      setError("Gagal terhubung ke server");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/documents/${id}`, { method: "DELETE" });
      setDocs((prev) => prev.filter((d) => d.id !== id));
    } catch {}
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "docx":
        return "📝";
      default:
        return "📃";
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={onToggle}
        />
      )}

      <div
        className={`fixed right-0 top-0 bottom-0 z-30 w-80 bg-white dark:bg-gayo-950 border-l border-gayo-200 dark:border-gayo-800 transform transition-transform duration-200 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gayo-200 dark:border-gayo-800">
          <h2 className="font-heading font-semibold text-gayo-900 dark:text-gayo-100">
            Knowledge Base
          </h2>
          <button
            onClick={onToggle}
            className="p-1 rounded-lg hover:bg-gayo-100 dark:hover:bg-gayo-800 transition-colors"
            aria-label="Tutup"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-4 border-b border-gayo-200 dark:border-gayo-800">
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gayo-300 dark:border-gayo-700 text-sm font-medium text-gayo-950/60 dark:text-gayo-100/60 hover:border-gayo-400 dark:hover:border-gayo-500 hover:text-gayo-900 dark:hover:text-gayo-100 transition-all disabled:opacity-50"
          >
            {uploading ? (
              <>
                <span className="w-4 h-4 border-2 border-gayo-400 border-t-transparent rounded-full animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload Dokumen (PDF, DOCX, TXT)
              </>
            )}
          </button>
          {error && (
            <p className="mt-2 text-xs text-red-500">{error}</p>
          )}
          <p className="mt-1.5 text-xs text-gayo-950/40 dark:text-gayo-100/40">
            Maksimal 10MB. Dokumen akan diproses untuk pencarian cerdas.
          </p>
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading && (
            <p className="text-sm text-gayo-950/40 dark:text-gayo-100/40 text-center py-8">
              Memuat...
            </p>
          )}

          {!loading && docs.length === 0 && (
            <p className="text-sm text-gayo-950/40 dark:text-gayo-100/40 text-center py-8">
              Belum ada dokumen. Upload untuk memulai knowledge base.
            </p>
          )}

          {docs.map((doc) => (
            <div
              key={doc.id}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gayo-50 dark:hover:bg-gayo-800/50 transition-all"
            >
              <span className="text-lg">{typeIcon(doc.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate text-gayo-950/80 dark:text-gayo-100/80">
                  {doc.name}
                </p>
                <p className="text-xs text-gayo-950/40 dark:text-gayo-100/40">
                  {formatSize(doc.size)} &middot; {formatDate(doc.createdAt)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gayo-200 dark:hover:bg-gayo-700 transition-all"
                aria-label="Hapus dokumen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 text-gayo-950/50 dark:text-gayo-100/50"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
