"use client";

import type { ConversationSummary } from "@/lib/chat";

interface Props {
  conversations: ConversationSummary[];
  currentId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  open: boolean;
  onToggle: () => void;
}

export default function ChatSidebar({
  conversations,
  currentId,
  onSelect,
  onNew,
  onDelete,
  open,
  onToggle,
}: Props) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white dark:bg-gayo-950 border-r border-gayo-200 dark:border-gayo-800 transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col pt-16 lg:pt-0`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gayo-200 dark:border-gayo-800">
          <button
            onClick={() => {
              onNew();
              onToggle();
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gayo-200 dark:border-gayo-800 text-sm font-medium text-gayo-950/70 dark:text-gayo-100/70 hover:bg-gayo-50 dark:hover:bg-gayo-800 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Percakapan Baru
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.length === 0 && (
            <p className="text-sm text-gayo-950/40 dark:text-gayo-100/40 text-center py-8">
              Belum ada percakapan
            </p>
          )}

          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                currentId === conv.id
                  ? "bg-gayo-100 dark:bg-gayo-800 text-gayo-900 dark:text-gayo-100"
                  : "hover:bg-gayo-50 dark:hover:bg-gayo-800/50 text-gayo-950/70 dark:text-gayo-100/70"
              }`}
              onClick={() => onSelect(conv.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-4 h-4 shrink-0"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{conv.title}</p>
                <p className="text-xs text-gayo-950/40 dark:text-gayo-100/40">
                  {conv.messageCount} pesan
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gayo-200 dark:hover:bg-gayo-700 transition-all"
                aria-label="Hapus percakapan"
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
      </aside>
    </>
  );
}
