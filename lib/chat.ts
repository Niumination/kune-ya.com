// ============================================================
// Tipe data untuk Chat Agent
// ============================================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

export interface ConversationSummary {
  id: string;
  title: string;
  personaId: string;
  updatedAt: Date;
  messageCount: number;
}

export function generateTitle(content: string): string {
  // Ambil 60 karakter pertama sebagai judul default
  const clean = content.replace(/[^\w\s]/g, "").trim();
  return clean.length > 60 ? clean.slice(0, 60) + "…" : clean;
}
