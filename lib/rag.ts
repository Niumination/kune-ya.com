import { getOpenAI } from "./ai";

// ============================================================
// Text Extraction
// ============================================================

export async function extractText(
  file: File
): Promise<{ text: string; type: string }> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    const mod = await import("pdf-parse");
    const pdfParse = mod.default;
    const data = await pdfParse(buffer);
    return { text: data.text, type: "pdf" };
  }

  if (name.endsWith(".docx")) {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return { text: result.value, type: "docx" };
  }

  if (name.endsWith(".txt")) {
    return { text: buffer.toString("utf-8"), type: "txt" };
  }

  throw new Error(`Unsupported file type: ${name}`);
}

// ============================================================
// Embeddings
// ============================================================

export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAI();
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.slice(0, 8000), // limit to 8k chars for embedding
  });
  return response.data[0].embedding;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

// ============================================================
// Context Building
// ============================================================

interface ContextDoc {
  name: string;
  content: string;
  similarity: number;
}

export function buildContextMessage(docs: ContextDoc[]): string {
  if (docs.length === 0) return "";

  const sections = docs.map(
    (d, i) =>
      `[Dokumen ${i + 1}: ${d.name}]\n${d.content.slice(0, 2000)}`
  );

  return `\n\n---\n**Dokumen referensi yang tersedia:**\n\n${sections.join("\n\n")}\n\nGunakan informasi dari dokumen di atas untuk membantu menjawab pertanyaan user jika relevan. Jika tidak relevan, abaikan saja.`;
}
