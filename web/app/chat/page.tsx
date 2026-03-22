"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Header } from "@/components/header";
import { Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import { streamChat } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const providers = [
  { id: "anthropic", name: "Claude", model: "claude-3-5-sonnet-20241022", color: "text-kb-agent-claude" },
  { id: "openai", name: "GPT", model: "gpt-4o", color: "text-kb-blue" },
  { id: "xai", name: "Grok", model: "grok-2-1212", color: "text-kb-agent-grok" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    await streamChat({
      provider: selectedProvider.id,
      model: selectedProvider.model,
      system: "You are a helpful AI assistant from Labs from SaintSal. You help developers build applications and solve technical problems.",
      messages: [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      })),
      onChunk: (text) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: updated[updated.length - 1].content + text,
          };
          return updated;
        });
      },
      onDone: () => {
        setIsStreaming(false);
      },
      onError: (error) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: `Error: ${error}`,
          };
          return updated;
        });
        setIsStreaming(false);
      },
    });
  }, [input, isStreaming, messages, selectedProvider]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-kb-bg flex flex-col">
      <Header />
      <main className="flex-1 pt-16 flex flex-col">
        <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
          {/* Provider selector */}
          <div className="border-b border-kb-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-kb-text-dim">Model:</span>
              <div className="flex gap-1">
                {providers.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectedProvider.id === provider.id
                        ? `bg-kb-bg-elevated border border-kb-border-neon ${provider.color}`
                        : "text-kb-text-dim hover:text-kb-text hover:bg-kb-bg-card"
                    }`}
                  >
                    {provider.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="h-16 w-16 rounded-2xl bg-kb-neon-glow border border-kb-border-neon flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-kb-neon" />
                </div>
                <h2 className="text-xl font-semibold text-kb-text mb-2">
                  Start a conversation
                </h2>
                <p className="text-kb-text-sub max-w-md">
                  Ask questions, get help with code, or explore ideas with our AI assistants.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-kb-bg-elevated border border-kb-border flex items-center justify-center">
                    <Bot className={`h-4 w-4 ${selectedProvider.color}`} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-kb-neon text-kb-bg"
                      : "bg-kb-bg-card border border-kb-border text-kb-text"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                    {isStreaming && index === messages.length - 1 && message.role === "assistant" && (
                      <span className="inline-block w-2 h-4 bg-kb-neon ml-1 animate-pulse" />
                    )}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-kb-gold flex items-center justify-center">
                    <User className="h-4 w-4 text-kb-bg" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-kb-border p-4">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-kb-bg-input border border-kb-border rounded-lg px-4 py-3 text-sm text-kb-text placeholder:text-kb-text-dim resize-none focus:outline-none focus:border-kb-border-neon transition-colors"
                rows={1}
                disabled={isStreaming}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                className="flex items-center justify-center h-12 w-12 rounded-lg bg-kb-neon text-kb-bg transition-all hover:bg-kb-neon-bright disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isStreaming ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
