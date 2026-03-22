const agents = [
  {
    name: "Grok",
    role: "Architect",
    description: "Analyzes requirements and creates detailed technical plans. Excels at system design and breaking down complex problems.",
    color: "bg-kb-agent-grok",
    textColor: "text-kb-agent-grok",
    tasks: ["Architecture planning", "Tech stack selection", "Dependency analysis"],
  },
  {
    name: "Stitch",
    role: "Builder",
    description: "Generates production-ready code from specifications. Specializes in component creation and UI implementation.",
    color: "bg-kb-agent-stitch",
    textColor: "text-kb-agent-stitch",
    tasks: ["Component generation", "UI/UX implementation", "Code optimization"],
  },
  {
    name: "Claude",
    role: "Integrator",
    description: "Wires components together and handles complex logic. Expert at API integration and state management.",
    color: "bg-kb-agent-claude",
    textColor: "text-kb-agent-claude",
    tasks: ["API integration", "State management", "Business logic"],
  },
  {
    name: "SAL",
    role: "Orchestrator",
    description: "Coordinates all agents and manages the build pipeline. Ensures quality and coherence across the entire project.",
    color: "bg-kb-agent-sal",
    textColor: "text-kb-agent-sal",
    tasks: ["Pipeline management", "Quality assurance", "Final assembly"],
  },
];

export function AgentsSection() {
  return (
    <section className="relative border-t border-kb-border bg-kb-bg py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-kb-gold uppercase tracking-wider mb-4">
            Agent Network
          </span>
          <h2 className="text-3xl font-bold text-kb-text md:text-4xl">
            Meet your AI development team
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-kb-text-sub">
            Specialized agents that work together to deliver complete, production-ready code.
          </p>
        </div>

        {/* Agents grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="relative rounded-xl border border-kb-border bg-kb-bg-card overflow-hidden group hover:border-kb-border-neon transition-colors"
            >
              {/* Color bar */}
              <div className={`h-1 ${agent.color}`} />
              
              <div className="p-6">
                {/* Agent identity */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-lg ${agent.color} flex items-center justify-center`}>
                    <span className="text-sm font-bold text-kb-bg">
                      {agent.name[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${agent.textColor}`}>
                      {agent.name}
                    </h3>
                    <p className="text-xs text-kb-text-dim uppercase tracking-wider">
                      {agent.role}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-kb-text-sub leading-relaxed mb-4">
                  {agent.description}
                </p>

                {/* Tasks */}
                <div className="space-y-2">
                  {agent.tasks.map((task) => (
                    <div
                      key={task}
                      className="flex items-center gap-2 text-xs text-kb-text-dim"
                    >
                      <div className={`h-1.5 w-1.5 rounded-full ${agent.color}`} />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
