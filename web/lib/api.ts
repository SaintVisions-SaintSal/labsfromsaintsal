/* ═══════════════════════════════════════════════════
   LABS FROM SAINTSAL — API LAYER (WEB)
   MCP Gateway · SSE Streaming · All Providers
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */

export const MCP_BASE = "https://saintsallabs.com";
export const MCP_KEY = "saintvision_gateway_2025";
export const API_BASE = "https://saintsallabs-api.onrender.com";
export const API_KEY = "sal-live-2026";

const MCP_HEADERS = {
  "Content-Type": "application/json",
  "x-sal-key": MCP_KEY,
};

interface StreamChatOptions {
  provider?: string;
  model: string;
  system?: string;
  messages: Array<{ role: string; content: string }>;
  onChunk?: (text: string) => void;
  onDone?: () => void;
  onError?: (error: string) => void;
}

/* ── streamChat — Fetch SSE for any provider ─────── */
export async function streamChat({
  provider = "anthropic",
  model,
  system,
  messages,
  onChunk,
  onDone,
  onError,
}: StreamChatOptions) {
  try {
    const response = await fetch(`${MCP_BASE}/api/chat/stream`, {
      method: "POST",
      headers: MCP_HEADERS,
      body: JSON.stringify({ provider, model, system, messages, stream: true }),
    });

    if (!response.ok) {
      onError?.(`HTTP error: ${response.status}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError?.("No response body");
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const raw = line.slice(5).trim();
        if (raw === "[DONE]") {
          onDone?.();
          return;
        }
        try {
          const parsed = JSON.parse(raw);
          const text =
            parsed?.choices?.[0]?.delta?.content ||
            parsed?.delta?.text ||
            parsed?.content ||
            "";
          if (text) onChunk?.(text);
        } catch {
          // Skip malformed JSON
        }
      }
    }
    onDone?.();
  } catch (error) {
    onError?.(error instanceof Error ? error.message : "Network error");
  }
}

interface AgentEvent {
  event: string;
  message?: string;
  [key: string]: unknown;
}

interface ConnectAgentOptions {
  prompt: string;
  mode?: string;
  files?: string[];
  projectId?: string;
  onPlanning?: (evt: AgentEvent) => void;
  onPlanReady?: (evt: AgentEvent) => void;
  onBuilding?: (evt: AgentEvent) => void;
  onStitchReady?: (evt: AgentEvent) => void;
  onWiring?: (evt: AgentEvent) => void;
  onFilesReady?: (evt: AgentEvent) => void;
  onComplete?: (evt: AgentEvent) => void;
  onError?: (message: string) => void;
}

/* ── connectAgentSSE — Full builder pipeline ───── */
export async function connectAgentSSE({
  prompt,
  mode = "supergrok",
  files = [],
  projectId,
  onPlanning,
  onPlanReady,
  onBuilding,
  onStitchReady,
  onWiring,
  onFilesReady,
  onComplete,
  onError,
}: ConnectAgentOptions) {
  try {
    const response = await fetch(`${MCP_BASE}/api/builder/agent`, {
      method: "POST",
      headers: MCP_HEADERS,
      body: JSON.stringify({ prompt, mode, files, projectId }),
    });

    if (!response.ok) {
      onError?.(`HTTP error: ${response.status}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError?.("No response body");
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const raw = line.slice(5).trim();
        if (raw === "[DONE]") {
          onComplete?.({ event: "complete", message: "Build complete" });
          return;
        }
        try {
          const evt: AgentEvent = JSON.parse(raw);
          if (!evt?.event) continue;
          switch (evt.event) {
            case "planning":
              onPlanning?.(evt);
              break;
            case "plan_ready":
              onPlanReady?.(evt);
              break;
            case "building":
              onBuilding?.(evt);
              break;
            case "stitch_ready":
              onStitchReady?.(evt);
              break;
            case "wiring":
              onWiring?.(evt);
              break;
            case "files_ready":
              onFilesReady?.(evt);
              break;
            case "complete":
              onComplete?.(evt);
              break;
            case "error":
              onError?.(evt.message || "Unknown error");
              break;
          }
        } catch {
          // Skip malformed JSON
        }
      }
    }
  } catch (error) {
    onError?.(error instanceof Error ? error.message : "Network error");
  }
}

/* ── Health check ──────────────────────────────── */
export async function pingGateway(): Promise<{ status: string }> {
  try {
    const res = await fetch(`${MCP_BASE}/health`, { headers: MCP_HEADERS });
    return await res.json();
  } catch {
    return { status: "error" };
  }
}
