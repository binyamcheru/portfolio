"use client";

import { FormEvent, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi! I’m the early UI prototype of Binyam AI. Send a message to test the chat interface.",
  },
];

export default function PersonaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text) return;

    const nextId = messages.length + 1;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: nextId, role: "user", text },
      {
        id: nextId + 1,
        role: "assistant",
        text: "This is a local demo response. We’ll connect the server and AI model in later milestones.",
      },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-8 sm:right-8">
      {isOpen && (
        <section
          id="persona-chat-panel"
          aria-label="Binyam AI chat"
          className="mb-4 flex h-[min(560px,calc(100vh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B0118]/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:w-[380px]"
        >
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Bot size={18} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Binyam AI</h2>
                <p className="flex items-center gap-1 text-[10px] text-white/40">
                  <Sparkles size={10} aria-hidden="true" />
                  Local UI prototype
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Binyam AI chat"
              className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div
            aria-live="polite"
            aria-relevant="additions"
            className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-md bg-primary text-white"
                      : "rounded-bl-md border border-white/10 bg-white/5 text-white/70"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 bg-black/10 p-3"
          >
            <label htmlFor="persona-message" className="sr-only">
              Message Binyam AI
            </label>
            <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/5 p-2 focus-within:border-primary/50">
              <textarea
                id="persona-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={1}
                placeholder="Ask about Binyam..."
                className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={16} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-white/30">
              Prototype only — no message is sent to a server.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="persona-chat-panel"
        aria-label={isOpen ? "Close Binyam AI chat" : "Open Binyam AI chat"}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-95"
      >
        {isOpen ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <MessageCircle size={22} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
