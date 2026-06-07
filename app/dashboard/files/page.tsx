import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import FilesClient from "./FilesClient";

export const metadata = {
  title: "Kelola File — Kune-Ya",
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function FilesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const documents = await prisma.document.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      type: true,
      size: true,
      createdAt: true,
    },
  });

  const stats = {
    total: documents.length,
    totalSize: documents.reduce((sum, d) => sum + d.size, 0),
    types: {
      pdf: documents.filter((d) => d.type === "pdf").length,
      docx: documents.filter((d) => d.type === "docx").length,
      txt: documents.filter((d) => d.type === "txt").length,
    },
  };

  return (
    <div className="min-h-screen bg-gayo-50 dark:bg-gayo-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gayo-900 dark:text-gayo-100 mb-2">
            Kelola File
          </h1>
          <p className="text-gayo-950/60 dark:text-gayo-100/60">
            Kelola dokumen knowledge base Anda
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gayo-900 rounded-xl border border-gayo-200 dark:border-gayo-800 p-4">
            <p className="text-2xl font-heading font-bold text-gayo-900 dark:text-gayo-100">
              {stats.total}
            </p>
            <p className="text-sm text-gayo-950/50 dark:text-gayo-100/50">
              Total file
            </p>
          </div>
          <div className="bg-white dark:bg-gayo-900 rounded-xl border border-gayo-200 dark:border-gayo-800 p-4">
            <p className="text-2xl font-heading font-bold text-gayo-900 dark:text-gayo-100">
              {formatSize(stats.totalSize)}
            </p>
            <p className="text-sm text-gayo-950/50 dark:text-gayo-100/50">
              Total ukuran
            </p>
          </div>
          <div className="bg-white dark:bg-gayo-900 rounded-xl border border-gayo-200 dark:border-gayo-800 p-4">
            <p className="text-2xl font-heading font-bold text-gayo-900 dark:text-gayo-100">
              {stats.types.pdf}
            </p>
            <p className="text-sm text-gayo-950/50 dark:text-gayo-100/50">
              PDF
            </p>
          </div>
          <div className="bg-white dark:bg-gayo-900 rounded-xl border border-gayo-200 dark:border-gayo-800 p-4">
            <p className="text-2xl font-heading font-bold text-gayo-900 dark:text-gayo-100">
              {stats.types.docx + stats.types.txt}
            </p>
            <p className="text-sm text-gayo-950/50 dark:text-gayo-100/50">
              DOCX / TXT
            </p>
          </div>
        </div>

        <FilesClient documents={documents} />
      </div>
    </div>
  );
}
