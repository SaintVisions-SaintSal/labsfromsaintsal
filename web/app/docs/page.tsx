import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Book, Code2, Zap, Globe, Terminal, FileCode } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "Getting Started",
    icon: Zap,
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Quick Start", href: "/docs/quickstart" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "API Reference",
    icon: Code2,
    items: [
      { title: "Chat Streaming", href: "/docs/api/chat" },
      { title: "Builder Agent", href: "/docs/api/builder" },
      { title: "Health Check", href: "/docs/api/health" },
    ],
  },
  {
    title: "Agents",
    icon: Globe,
    items: [
      { title: "Grok (Architect)", href: "/docs/agents/grok" },
      { title: "Stitch (Builder)", href: "/docs/agents/stitch" },
      { title: "Claude (Integrator)", href: "/docs/agents/claude" },
      { title: "SAL (Orchestrator)", href: "/docs/agents/sal" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-kb-bg flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-kb-neon-glow border border-kb-border-neon flex items-center justify-center">
                <Book className="h-6 w-6 text-kb-neon" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-kb-text">Documentation</h1>
                <p className="text-kb-text-sub">
                  Learn how to build with Labs from SaintSal
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Navigation */}
            <div className="lg:col-span-1">
              <nav className="space-y-6">
                {sections.map((section) => (
                  <div key={section.title}>
                    <div className="flex items-center gap-2 mb-3">
                      <section.icon className="h-4 w-4 text-kb-gold" />
                      <h3 className="text-sm font-semibold text-kb-text uppercase tracking-wider">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block px-4 py-2 text-sm text-kb-text-sub hover:text-kb-neon hover:bg-kb-bg-card rounded-lg transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-kb-border bg-kb-bg-card p-8">
                <h2 className="text-2xl font-bold text-kb-text mb-4">
                  Welcome to Labs from SaintSal
                </h2>
                <p className="text-kb-text-sub leading-relaxed mb-6">
                  Labs from SaintSal is an AI-powered development platform that uses multiple
                  specialized agents to help you build production-ready applications faster
                  than ever before.
                </p>

                <h3 className="text-lg font-semibold text-kb-text mb-3">Key Concepts</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-kb-bg flex items-center justify-center flex-shrink-0">
                      <Terminal className="h-5 w-5 text-kb-neon" />
                    </div>
                    <div>
                      <h4 className="font-medium text-kb-text">MCP Gateway</h4>
                      <p className="text-sm text-kb-text-sub">
                        Unified API endpoint for all AI providers with streaming support.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-kb-bg flex items-center justify-center flex-shrink-0">
                      <Globe className="h-5 w-5 text-kb-gold" />
                    </div>
                    <div>
                      <h4 className="font-medium text-kb-text">HACP Protocol</h4>
                      <p className="text-sm text-kb-text-sub">
                        Human-AI Collaboration Protocol for seamless development workflows.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-kb-bg flex items-center justify-center flex-shrink-0">
                      <FileCode className="h-5 w-5 text-kb-agent-stitch" />
                    </div>
                    <div>
                      <h4 className="font-medium text-kb-text">Multi-Agent Pipeline</h4>
                      <p className="text-sm text-kb-text-sub">
                        Specialized agents working together to deliver complete solutions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick start code */}
                <h3 className="text-lg font-semibold text-kb-text mb-3">Quick Example</h3>
                <div className="rounded-lg border border-kb-border bg-kb-bg-terminal p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code className="text-kb-text-terminal">
{`import { streamChat } from '@saintsallabs/sdk';

await streamChat({
  provider: 'anthropic',
  model: 'claude-3-5-sonnet-20241022',
  messages: [{ role: 'user', content: 'Hello!' }],
  onChunk: (text) => console.log(text),
  onDone: () => console.log('Complete!')
});`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
