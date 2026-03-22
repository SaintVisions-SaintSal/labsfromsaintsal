"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-kb-neon-glow)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-kb-gold-dim)_0%,_transparent_40%)]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--color-kb-neon) 1px, transparent 1px),
                           linear-gradient(90deg, var(--color-kb-neon) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-kb-border-neon bg-kb-bg-card/50 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-kb-gold" />
            <span className="text-xs font-medium text-kb-gold uppercase tracking-wider">
              US Patent #10,290,222
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-kb-text md:text-5xl lg:text-6xl">
            Build with{" "}
            <span className="text-kb-neon neon-text">AI Agents</span>{" "}
            at the Speed of Thought
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-pretty text-lg text-kb-text-sub leading-relaxed md:text-xl">
            MCP Gateway with multi-provider streaming. Claude, Grok, and custom agents working together through the HACP Protocol.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/builder"
              className="group flex items-center gap-2 rounded-lg bg-kb-neon px-6 py-3 text-sm font-semibold text-kb-bg transition-all hover:bg-kb-neon-bright hover:gap-3"
            >
              Start Building
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs"
              className="flex items-center gap-2 rounded-lg border border-kb-border bg-kb-bg-card/50 px-6 py-3 text-sm font-medium text-kb-text transition-colors hover:bg-kb-bg-elevated hover:border-kb-border-neon"
            >
              <Terminal className="h-4 w-4" />
              View Documentation
            </Link>
          </div>

          {/* Terminal Preview */}
          <div className="mt-16 w-full max-w-3xl">
            <div className="rounded-xl border border-kb-border bg-kb-bg-terminal overflow-hidden shadow-2xl shadow-black/50">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-kb-border bg-kb-bg-card px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-kb-error" />
                  <div className="h-3 w-3 rounded-full bg-kb-warning" />
                  <div className="h-3 w-3 rounded-full bg-kb-complete" />
                </div>
                <span className="ml-4 text-xs text-kb-text-dim font-mono">
                  saintsallabs.com/api/builder/agent
                </span>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="flex gap-2 text-kb-text-dim">
                  <span className="text-kb-gold">$</span>
                  <span className="text-kb-text">sal build --mode supergrok</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-kb-agent-grok">[Grok]</span>
                    <span className="text-kb-text-sub">Planning architecture...</span>
                    <span className="text-kb-complete">done</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-kb-agent-stitch">[Stitch]</span>
                    <span className="text-kb-text-sub">Generating components...</span>
                    <span className="text-kb-complete">done</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-kb-agent-claude">[Claude]</span>
                    <span className="text-kb-text-sub">Wiring integrations...</span>
                    <span className="text-kb-complete">done</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="text-kb-gold">$</span>
                  <span className="text-kb-neon animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
