import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { extractText, generateEmbedding } from "@/lib/rag";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

// GET /api/documents — list user's documents
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  return NextResponse.json(documents);
}

// POST /api/documents — upload & process document
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File terlalu besar. Maksimal 10MB." },
        { status: 400 }
      );
    }

    const allowedTypes = [".pdf", ".docx", ".txt"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedTypes.includes(ext)) {
      return NextResponse.json(
        { error: "Tipe file tidak didukung. Gunakan PDF, DOCX, atau TXT." },
        { status: 400 }
      );
    }

    // Extract text
    const { text, type } = await extractText(file);

    if (!text || text.trim().length < 10) {
      return NextResponse.json(
        { error: "File tidak mengandung teks yang bisa dibaca." },
        { status: 400 }
      );
    }

    // Generate embedding
    const embedding = await generateEmbedding(text);

    // Save to DB
    const doc = await prisma.document.create({
      data: {
        name: file.name,
        type,
        size: file.size,
        content: text,
        embedding: JSON.stringify(embedding),
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        id: doc.id,
        name: doc.name,
        type: doc.type,
        size: doc.size,
        createdAt: doc.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Document upload error:", error);
    return NextResponse.json(
      { error: "Gagal mengupload dokumen. Pastikan file valid." },
      { status: 500 }
    );
  }
}
