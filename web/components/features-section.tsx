import { Cpu, Layers, Zap, Globe, Shield, Code2 } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "MCP Gateway",
    description: "Unified API gateway for all major AI providers. Claude, GPT, Grok, and custom models through a single endpoint.",
    color: "text-kb-neon",
  },
  {
    icon: Layers,
    title: "Multi-Agent Pipeline",
    description: "Orchestrate multiple AI agents working together. Planning, building, and wiring phases run in parallel.",
    color: "text-kb-agent-stitch",
  },
  {
    icon: Zap,
    title: "SSE Streaming",
    description: "Real-time streaming responses with Server-Sent Events. Watch your code generate token by token.",
    color: "text-kb-gold",
  },
  {
    icon: Globe,
    title: "HACP Protocol",
    description: "Human-AI Collaboration Protocol for seamless handoffs between human review and AI generation.",
    color: "text-kb-agent-grok",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description: "SOC 2 compliant infrastructure with end-to-end encryption and audit logging for all agent interactions.",
    color: "text-kb-blue",
  },
  {
    icon: Code2,
    title: "Full Stack Output",
    description: "Generate complete applications with frontend, backend, and infrastructure code ready to deploy.",
    color: "text-kb-neon-bright",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative border-t border-kb-border bg-kb-bg-card py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-kb-gold uppercase tracking-wider mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl font-bold text-kb-text md:text-4xl">
            Everything you need to build faster
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-kb-text-sub">
            A complete development platform powered by multiple AI agents working in concert.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-kb-border bg-kb-bg p-6 transition-all hover:border-kb-border-neon hover:bg-kb-bg-elevated"
            >
              {/* Icon */}
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-kb-border bg-kb-bg-card ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-kb-text mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-kb-text-sub leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity group-hover:opacity-100 bg-kb-neon-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
