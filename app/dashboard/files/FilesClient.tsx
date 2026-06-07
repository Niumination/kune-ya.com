"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Document } from "@prisma/client";

interface DocSummary {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function FilesClient({
  documents,
}: {
  documents: DocSummary[];
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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
        router.refresh();
      }
    } catch {
      setError("Gagal terhubung ke server");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus dokumen ini?")) return;
    await fetch(`/api/documents/${id}`, { method: "DELETE" });
    router.refresh();
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
      {/* Upload */}
      <div className="bg-white dark:bg-gayo-900 rounded-xl border border-gayo-200 dark:border-gayo-800 p-6 mb-6">
        <label className="flex flex-col items-center justify-center gap-3 cursor-pointer">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <div className="w-12 h-12 rounded-full bg-gayo-100 dark:bg-gayo-800 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-6 h-6 text-gayo-400"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gayo-900 dark:text-gayo-100">
              {uploading ? "Memproses..." : "Klik untuk upload dokumen"}
            </p>
            <p className="text-xs text-gayo-950/50 dark:text-gayo-100/50 mt-0.5">
              PDF, DOCX, TXT — Maks. 10MB
            </p>
          </div>
        </label>
        {error && (
          <p className="text-sm text-red-500 text-center mt-3">{error}</p>
        )}
      </div>

      {/* List */}
      {documents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gayo-950/40 dark:text-gayo-100/40">
            Belum ada dokumen. Upload dokumen untuk memulai knowledge base.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gayo-900 rounded-xl border border-gayo-200 dark:border-gayo-800 divide-y divide-gayo-200 dark:divide-gayo-800">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gayo-50 dark:hover:bg-gayo-800/30 transition-colors"
            >
              <span className="text-2xl">{typeIcon(doc.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gayo-900 dark:text-gayo-100 truncate">
                  {doc.name}
                </p>
                <p className="text-xs text-gayo-950/50 dark:text-gayo-100/50">
                  {formatSize(doc.size)} &middot; {formatDate(doc.createdAt)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="p-2 rounded-lg hover:bg-gayo-100 dark:hover:bg-gayo-800 text-gayo-950/40 dark:text-gayo-100/40 hover:text-red-500 transition-all"
                aria-label="Hapus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
