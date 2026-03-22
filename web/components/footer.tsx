import { Zap } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-kb-border bg-kb-bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kb-neon-glow border border-kb-border-neon">
                <Zap className="h-5 w-5 text-kb-neon" />
              </div>
              <span className="text-sm font-semibold text-kb-text">
                Labs from SaintSal
              </span>
            </div>
            <p className="text-sm text-kb-text-sub leading-relaxed">
              AI-powered development platform with MCP Gateway and multi-provider streaming.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-kb-gold uppercase tracking-wider mb-4">
              Product
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/builder" className="text-sm text-kb-text-sub hover:text-kb-neon transition-colors">
                Builder
              </Link>
              <Link href="/chat" className="text-sm text-kb-text-sub hover:text-kb-neon transition-colors">
                Chat
              </Link>
              <Link href="/docs" className="text-sm text-kb-text-sub hover:text-kb-neon transition-colors">
                Documentation
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-kb-gold uppercase tracking-wider mb-4">
              Resources
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/docs/api" className="text-sm text-kb-text-sub hover:text-kb-neon transition-colors">
                API Reference
              </Link>
              <Link href="/docs/agents" className="text-sm text-kb-text-sub hover:text-kb-neon transition-colors">
                Agent Types
              </Link>
              <Link href="/status" className="text-sm text-kb-text-sub hover:text-kb-neon transition-colors">
                System Status
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-kb-gold uppercase tracking-wider mb-4">
              Legal
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm text-kb-text-sub hover:text-kb-neon transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-kb-text-sub hover:text-kb-neon transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-kb-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-kb-text-dim">
            US Patent #10,290,222 - HACP Protocol
          </p>
          <p className="text-xs text-kb-text-dim">
            &copy; {new Date().getFullYear()} SaintVision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
