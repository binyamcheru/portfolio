"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageSquare, Send, X } from "lucide-react";
import Markdown from "@/components/ui/Markdown";
import { personaKnowledge } from "@/lib/persona/knowledge";
import { cn } from "@/lib/utils";

const { profile } = personaKnowledge;
const ASSISTANT_NAME = "Ask Binyam";

const initialMessages: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: `Hi, I can answer questions about ${profile.displayName}'s work, experience and skills. What would you like to know?`,
      },
    ],
  },
];

const suggestions = [
  "What has he built recently?",
  "Which backend tools does he use?",
  "How can I contact him?",
];

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export default function PersonaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/persona" }), []);
  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
    messages: initialMessages,
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, status]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    if (error) clearError();
    setInput("");
    void sendMessage({ text: trimmed });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {isOpen && (
        <section
          id="persona-chat-panel"
          aria-label={`${ASSISTANT_NAME} chat`}
          className="flex h-[min(540px,calc(100vh-7rem))] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-lg border border-line bg-background shadow-2xl shadow-black/60 sm:w-[360px]"
        >
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <h2 className="font-display text-sm font-bold text-foreground">{ASSISTANT_NAME}</h2>
              <p className="text-xs text-subtle">
                {status === "streaming" ? "Typing…" : "Answers from verified portfolio data"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="-mr-1 rounded-md p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </header>

          <div
            ref={scrollRef}
            aria-live="polite"
            aria-relevant="additions text"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => {
              const text = getMessageText(message);
              if (!text) return null;
              const isUser = message.role === "user";
              return (
                <div key={message.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                      isUser
                        ? "whitespace-pre-wrap bg-foreground text-background"
                        : "border border-line bg-surface text-muted [&_li]:ml-4 [&_li]:list-disc [&_ol_li]:list-decimal [&_p+p]:mt-2 [&_ul+p]:mt-2 [&_ol+p]:mt-2 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-1.5 [&_ul]:space-y-0.5 [&_ol]:mt-1.5 [&_ol]:space-y-0.5",
                    )}
                  >
                    {isUser ? text : <Markdown source={text} />}
                  </div>
                </div>
              );
            })}

            {status === "submitted" && (
              <div className="flex justify-start" role="status" aria-label="Waiting for reply">
                <div className="flex gap-1 rounded-lg border border-line bg-surface px-3 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-subtle"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <ul className="flex flex-wrap gap-2 pt-2">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-line-strong hover:text-foreground"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-line p-3">
            <label htmlFor="persona-message" className="sr-only">
              Message
            </label>
            <div className="flex items-end gap-2 rounded-md border border-line bg-surface p-1.5 focus-within:border-line-strong">
              <textarea
                id="persona-message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                disabled={isLoading}
                maxLength={1_000}
                rows={1}
                placeholder="Ask a question…"
                className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-subtle"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-foreground text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={14} aria-hidden="true" />
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-2 text-xs text-red-400">
                {error.message}
              </p>
            )}
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="persona-chat-panel"
        aria-label={isOpen ? "Close chat" : `Open ${ASSISTANT_NAME}`}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm font-medium text-foreground shadow-lg shadow-black/40 transition-colors hover:border-foreground"
      >
        {isOpen ? <X size={16} aria-hidden="true" /> : <MessageSquare size={16} aria-hidden="true" />}
        {!isOpen && <span>{ASSISTANT_NAME}</span>}
      </button>
    </div>
  );
}
