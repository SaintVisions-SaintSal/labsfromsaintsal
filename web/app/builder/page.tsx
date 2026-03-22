"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/header";
import { Send, Loader2, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { connectAgentSSE } from "@/lib/api";

type BuildPhase = "idle" | "planning" | "building" | "wiring" | "complete" | "error";

interface BuildEvent {
  phase: BuildPhase;
  message: string;
  timestamp: Date;
}

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState<BuildPhase>("idle");
  const [events, setEvents] = useState<BuildEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addEvent = useCallback((phase: BuildPhase, message: string) => {
    setEvents((prev) => [...prev, { phase, message, timestamp: new Date() }]);
  }, []);

  const handleBuild = useCallback(async () => {
    if (!prompt.trim()) return;

    setPhase("planning");
    setEvents([]);
    setError(null);
    addEvent("planning", "Starting build pipeline...");

    await connectAgentSSE({
      prompt: prompt.trim(),
      mode: "supergrok",
      onPlanning: () => {
        setPhase("planning");
        addEvent("planning", "Grok is analyzing requirements and planning architecture...");
      },
      onPlanReady: () => {
        addEvent("planning", "Architecture plan complete.");
      },
      onBuilding: () => {
        setPhase("building");
        addEvent("building", "Stitch is generating components...");
      },
      onStitchReady: () => {
        addEvent("building", "Components generated successfully.");
      },
      onWiring: () => {
        setPhase("wiring");
        addEvent("wiring", "Claude is wiring integrations...");
      },
      onFilesReady: () => {
        addEvent("wiring", "All files assembled.");
      },
      onComplete: () => {
        setPhase("complete");
        addEvent("complete", "Build complete! Your project is ready.");
      },
      onError: (msg) => {
        setPhase("error");
        setError(msg);
        addEvent("error", `Error: ${msg}`);
      },
    });
  }, [prompt, addEvent]);

  const getPhaseIcon = (eventPhase: BuildPhase) => {
    if (eventPhase === "error") return <AlertCircle className="h-4 w-4 text-kb-error" />;
    if (eventPhase === "complete") return <CheckCircle2 className="h-4 w-4 text-kb-complete" />;
    if (phase === eventPhase) return <Loader2 className="h-4 w-4 text-kb-thinking animate-spin" />;
    return <Circle className="h-4 w-4 text-kb-text-dim" />;
  };

  return (
    <div className="min-h-screen bg-kb-bg">
      <Header />
      <main className="pt-16">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kb-text">Builder</h1>
            <p className="mt-2 text-kb-text-sub">
              Describe what you want to build and let our AI agents handle the rest.
            </p>
          </div>

          {/* Input area */}
          <div className="rounded-xl border border-kb-border bg-kb-bg-card p-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your project... e.g., 'Build a dashboard with user authentication, data visualization charts, and a settings page'"
              className="w-full h-32 bg-kb-bg-input border border-kb-border rounded-lg p-4 text-kb-text placeholder:text-kb-text-dim resize-none focus:outline-none focus:border-kb-border-neon transition-colors"
              disabled={phase !== "idle" && phase !== "complete" && phase !== "error"}
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-kb-text-dim">
                Powered by Grok, Stitch, and Claude agents
              </span>
              <button
                onClick={handleBuild}
                disabled={!prompt.trim() || (phase !== "idle" && phase !== "complete" && phase !== "error")}
                className="flex items-center gap-2 rounded-lg bg-kb-neon px-6 py-2.5 text-sm font-semibold text-kb-bg transition-all hover:bg-kb-neon-bright disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {phase !== "idle" && phase !== "complete" && phase !== "error" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Building...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Start Build
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Build progress */}
          {events.length > 0 && (
            <div className="mt-8 rounded-xl border border-kb-border bg-kb-bg-terminal p-6">
              <h2 className="text-sm font-semibold text-kb-gold uppercase tracking-wider mb-4">
                Build Progress
              </h2>
              <div className="space-y-3">
                {events.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {getPhaseIcon(event.phase)}
                    <div className="flex-1">
                      <p className="text-sm text-kb-text font-mono">{event.message}</p>
                      <p className="text-xs text-kb-text-dim mt-1">
                        {event.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="mt-4 rounded-lg border border-kb-error/30 bg-kb-error/10 p-4">
              <p className="text-sm text-kb-error">{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
