/* ═══════════════════════════════════════════════════
   LABS FROM SAINTSALÂ — API LAYER
   MCP Gateway · SSE Streaming · All Providers
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */

export const MCP_BASE = 'https://saintsallabs.com';
export const MCP_KEY  = 'saintvision_gateway_2025';
export const API_BASE = 'https://saintsallabs-api.onrender.com';
export const API_KEY  = 'sal-live-2026';

const MCP_HEADERS = {
  'Content-Type': 'application/json',
  'x-sal-key': MCP_KEY,
};

/* ── streamChat — XHR SSE for any provider ─────── */
export function streamChat({ provider = 'anthropic', model, system, messages, onChunk, onDone, onError }) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${MCP_BASE}/api/chat/stream`);
  Object.entries(MCP_HEADERS).forEach(([k, v]) => xhr.setRequestHeader(k, v));

  let cursor = 0;
  xhr.onprogress = () => {
    const chunk = xhr.responseText.slice(cursor);
    cursor = xhr.responseText.length;
    const lines = chunk.split('\n').filter(l => l.startsWith('data:'));
    for (const line of lines) {
      try {
        const raw = line.slice(5).trim();
        if (raw === '[DONE]') { onDone?.(); return; }
        const parsed = JSON.parse(raw);
        const text = parsed?.choices?.[0]?.delta?.content
          || parsed?.delta?.text
          || parsed?.content
          || '';
        if (text) onChunk?.(text);
      } catch {}
    }
  };
  xhr.onload = () => onDone?.();
  xhr.onerror = () => onError?.('Network error');
  xhr.send(JSON.stringify({ provider, model, system, messages, stream: true }));
  return xhr;
}

/* ── connectAgentSSE — Full builder pipeline ───── */
export function connectAgentSSE({ prompt, mode = 'supergrok', files = [], projectId, onPlanning, onPlanReady, onBuilding, onStitchReady, onWiring, onFilesReady, onComplete, onError }) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${MCP_BASE}/api/builder/agent`);
  Object.entries(MCP_HEADERS).forEach(([k, v]) => xhr.setRequestHeader(k, v));

  let cursor = 0;
  xhr.onprogress = () => {
    const chunk = xhr.responseText.slice(cursor);
    cursor = xhr.responseText.length;
    const lines = chunk.split('\n').filter(l => l.startsWith('data:'));
    for (const line of lines) {
      try {
        const raw = line.slice(5).trim();
        if (raw === '[DONE]') { onComplete?.({ message: 'Build complete' }); return; }
        const evt = JSON.parse(raw);
        if (!evt?.event) continue;
        switch (evt.event) {
          case 'planning':    onPlanning?.(evt);    break;
          case 'plan_ready':  onPlanReady?.(evt);   break;
          case 'building':    onBuilding?.(evt);    break;
          case 'stitch_ready':onStitchReady?.(evt); break;
          case 'wiring':      onWiring?.(evt);      break;
          case 'files_ready': onFilesReady?.(evt);  break;
          case 'complete':    onComplete?.(evt);    break;
          case 'error':       onError?.(evt.message); break;
        }
      } catch {}
    }
  };
  xhr.onload = () => {};
  xhr.onerror = () => onError?.('Network error');
  xhr.send(JSON.stringify({ prompt, mode, files, projectId }));
  return xhr;
}

/* ── Health check ──────────────────────────────── */
export async function pingGateway() {
  try {
    const res = await fetch(`${MCP_BASE}/health`, { headers: MCP_HEADERS });
    return await res.json();
  } catch { return { status: 'error' }; }
}
