"use client";

import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Builder", href: "/builder" },
  { label: "Chat", href: "/chat" },
  { label: "Docs", href: "/docs" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-kb-border bg-kb-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kb-neon-glow border border-kb-border-neon group-hover:neon-glow transition-all">
            <Zap className="h-5 w-5 text-kb-neon" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-kb-text tracking-tight">
              Labs from SaintSal
            </span>
            <span className="text-[10px] font-mono text-kb-gold uppercase tracking-widest">
              Kinetic Blueprint
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm text-kb-text-sub hover:text-kb-text hover:bg-kb-bg-elevated rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-4 h-6 w-px bg-kb-border" />
          <Link
            href="/builder"
            className="ml-4 px-4 py-2 text-sm font-medium bg-kb-neon text-kb-bg rounded-lg hover:bg-kb-neon-bright transition-colors"
          >
            Start Building
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-kb-text-sub hover:text-kb-text"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden border-t border-kb-border bg-kb-bg overflow-hidden transition-all",
          mobileOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm text-kb-text-sub hover:text-kb-text hover:bg-kb-bg-elevated rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/builder"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-4 py-3 text-sm font-medium text-center bg-kb-neon text-kb-bg rounded-lg hover:bg-kb-neon-bright transition-colors"
          >
            Start Building
          </Link>
        </nav>
      </div>
    </header>
  );
}
