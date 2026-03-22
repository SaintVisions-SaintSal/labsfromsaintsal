import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative border-t border-kb-border bg-kb-bg-card py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-kb-gold-dim)_0%,_transparent_60%)]" />
      
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {/* Icon */}
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-kb-border-gold bg-kb-bg gold-glow">
          <Zap className="h-8 w-8 text-kb-gold" />
        </div>

        {/* Headline */}
        <h2 className="text-3xl font-bold text-kb-text md:text-4xl lg:text-5xl">
          Ready to build at{" "}
          <span className="text-kb-gold">light speed</span>?
        </h2>

        {/* Description */}
        <p className="mt-6 text-lg text-kb-text-sub max-w-2xl mx-auto">
          Join thousands of developers using Labs from SaintSal to ship production-ready applications faster than ever before.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/builder"
            className="group flex items-center gap-2 rounded-lg bg-kb-gold px-8 py-4 text-base font-semibold text-kb-bg transition-all hover:bg-kb-gold-bright hover:gap-3"
          >
            Launch Builder
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-2 rounded-lg border border-kb-border-gold bg-kb-bg/50 px-8 py-4 text-base font-medium text-kb-gold transition-colors hover:bg-kb-bg-elevated"
          >
            Try AI Chat
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-kb-text-dim">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-kb-complete" />
            <span className="text-sm">99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-kb-complete" />
            <span className="text-sm">SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-kb-complete" />
            <span className="text-sm">Enterprise Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
