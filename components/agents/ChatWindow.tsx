"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { personas, type PersonaId } from "@/lib/ai";
import ChatSidebar from "./ChatSidebar";
import DocumentsPanel from "./DocumentsPanel";
import type { ConversationSummary } from "@/lib/chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [personaId, setPersonaId] = useState<PersonaId>("asn-umum");
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentPersona = personas[personaId];

  // Ref to track assistant content during streaming to avoid StrictMode double-processing
  const streamRef = useRef({
    assistantId: null as string | null,
    content: "",
  });

  const loadConversations = useCallback(async () => {
    try {
      const res = await fetch("/api/conversations");
      if (res.ok) {
        setConversations(await res.json());
      }
    } catch {}
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Reset stream ref
    streamRef.current = { assistantId: null, content: "" };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          conversationId,
          personaId,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      // Create assistant placeholder
      const assistantId = crypto.randomUUID();
      streamRef.current.assistantId = assistantId;
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      let newConvId = conversationId;
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                streamRef.current.content += data.content;
                // Always create new Message objects — never mutate
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, content: streamRef.current.content }
                      : msg
                  )
                );
              }
              if (data.done) {
                newConvId = data.conversationId;
                setConversationId(newConvId);
                loadConversations();
              }
              if (data.error) {
                console.error("Stream error:", data.error);
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        },
      ]);
    } finally {
      setLoading(false);
      streamRef.current = { assistantId: null, content: "" };
    }
  };

  const selectConversation = async (id: string) => {
    try {
      const res = await fetch(`/api/conversations/${id}`);
      if (res.ok) {
        const data = await res.json();
        setConversationId(data.conversation.id);
        setPersonaId(data.conversation.personaId as PersonaId);
        setMessages(
          data.messages
            .filter((m: { role: string }) => m.role !== "system")
            .map((m: { id: string; role: string; content: string }) => ({
              id: m.id,
              role: m.role as "user" | "assistant",
              content: m.content,
            }))
        );
      }
    } catch {}
    setSidebarOpen(false);
  };

  const newChat = () => {
    setConversationId(null);
    setMessages([]);
    setPersonaId("asn-umum");
  };

  const deleteConversation = async (id: string) => {
    try {
      await fetch(`/api/conversations/${id}`, { method: "DELETE" });
      if (conversationId === id) {
        setConversationId(null);
        setMessages([]);
      }
      loadConversations();
    } catch {}
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatSidebar
        conversations={conversations}
        currentId={conversationId}
        onSelect={selectConversation}
        onNew={newChat}
        onDelete={deleteConversation}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <DocumentsPanel
        open={documentsOpen}
        onToggle={() => setDocumentsOpen(!documentsOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="border-b border-gayo-200 dark:border-gayo-800 px-4 py-3 flex items-center gap-3 bg-white dark:bg-gayo-950">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gayo-100 dark:hover:bg-gayo-800 transition-colors"
            aria-label="Buka sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-2 overflow-x-auto flex-1">
            {Object.values(personas).map((p) => (
              <button
                key={p.id}
                onClick={() => setPersonaId(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                  personaId === p.id
                    ? "bg-gayo-900 text-white"
                    : "text-gayo-950/60 dark:text-gayo-100/60 hover:bg-gayo-100 dark:hover:bg-gayo-800"
                }`}
              >
                <span>{p.emoji}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setDocumentsOpen(!documentsOpen)}
            className={`p-2 rounded-lg transition-all ${
              documentsOpen
                ? "bg-gayo-900 text-white"
                : "text-gayo-950/60 dark:text-gayo-100/60 hover:bg-gayo-100 dark:hover:bg-gayo-800"
            }`}
            aria-label="Knowledge Base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-gayo-100 dark:bg-gayo-800 flex items-center justify-center mb-4">
                <span className="text-2xl">{currentPersona.emoji}</span>
              </div>
              <h2 className="text-xl font-heading font-semibold text-gayo-900 dark:text-gayo-100 mb-2">
                {currentPersona.name}
              </h2>
              <p className="text-gayo-950/60 dark:text-gayo-100/60 max-w-md mb-6">
                {currentPersona.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md w-full">
                {[
                  "Bantu saya menyusun laporan kegiatan",
                  "Analisis kebijakan ini untuk saya",
                  "Buatkan notulen rapat",
                  "Susun materi sosialisasi",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    className="text-left text-sm p-3 rounded-xl border border-gayo-200 dark:border-gayo-800 hover:border-gayo-400 dark:hover:border-gayo-600 text-gayo-950/70 dark:text-gayo-100/70 hover:bg-gayo-50 dark:hover:bg-gayo-800/50 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-gayo-900 text-white rounded-br-md"
                    : "bg-white dark:bg-gayo-900 border border-gayo-200 dark:border-gayo-800 text-gayo-950 dark:text-gayo-100 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gayo-900 border border-gayo-200 dark:border-gayo-800 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gayo-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-gayo-400 animate-bounce [animation-delay:0.1s]" />
                  <span className="w-2 h-2 rounded-full bg-gayo-400 animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gayo-200 dark:border-gayo-800 p-4 bg-white dark:bg-gayo-950">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan Anda..."
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl border border-gayo-200 dark:border-gayo-800 bg-gayo-50 dark:bg-gayo-900 text-gayo-950 dark:text-gayo-100 placeholder:text-gayo-950/40 dark:placeholder:text-gayo-100/40 focus:outline-none focus:ring-2 focus:ring-gayo-400 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gayo-900 dark:bg-gayo-700 text-white px-5 py-3 rounded-xl font-medium hover:bg-gayo-700 dark:hover:bg-gayo-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
