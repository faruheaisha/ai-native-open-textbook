---
title: "Modern AI build paths"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/README.md"
zh: ""
---

# Modern AI build paths

Use the same five-step workflow, but make the target surface explicit in Step 3 (Technical Design). Pick the row that matches your target, adopt the default, and copy its "Add to Tech Design" items into your Tech Design doc.

> Vendor claims below rot quickly. Follow the [Freshness policy](/lib/07-coding/vibe-coding-prompt-template/docs-maintenance-freshness-policy) and re-check official docs before merging anything vendor-specific.

| Target | Good default | Add to Tech Design |
|--------|--------------|--------------------|
| Standard web MVP | Next.js App Router or the simplest stack your team can maintain | Routes, data model, auth, deployment, browser smoke tests |
| OpenAI product path | Responses API first; Agents SDK when orchestration, tracing, handoffs, or guardrails matter; Apps SDK/MCP for ChatGPT surfaces | Model family, structured outputs, hosted tools, MCP trust boundary, evals, data retention |
| Vercel AI path | AI SDK 6, AI Gateway, AI Elements, v0 API, or Vercel Workflow when durable agents are needed | Gateway/direct provider, budgets, fallbacks, telemetry, UI primitives, workflow retries |
| Cloudflare AI path | Workers AI for budget inference; AI Gateway for controls; Agents SDK + Durable Objects for stateful agents; AI Search/Vectorize for retrieval | Worker limits, Gateway settings, AI Search vs Vectorize, MCP auth, hard cost ceilings |
| Google path | Google AI Studio for fast prototypes; Antigravity/Antigravity CLI for agentic implementation; Gemini CLI only where still explicitly supported | Export-to-GitHub/local verification, artifact review, migration status, data policy |
| Claude/Codex/Cursor/Copilot build path | Use repo-owned `AGENTS.md` plus thin tool adapters, subagents/background agents for bounded tasks, and reviewer/tester passes | Tool-specific config, branch/worktree isolation, verification commands, evidence report |
| Local/open model path | LM Studio/Ollama for local runtime; Continue/Cline/Aider/OpenHands for local workflows; llama.cpp/MLX for advanced setups | Hardware, endpoint, model family, tool calling, MCP allowlist, fallback, local log storage |
| Builder prototype path | v0, Lovable, Bolt, Replit Agent, Google AI Studio, Base44, Tempo, Builder.io, Framer | Source ownership, GitHub sync/export, local build, secrets, auth/RLS, rollback, exit plan |

## Related guides

- [AI feature patterns](/lib/07-coding/vibe-coding-prompt-template/docs-ai-feature-patterns) — designing AI product features
- [AI agent security](/lib/07-coding/vibe-coding-prompt-template/docs-ai-agent-security) — MCP, agent permissions, prompt injection, provider retention
- [Builder exit review](/lib/07-coding/vibe-coding-prompt-template/docs-workflow-builder-exit-review) — leaving builder-generated projects safely
- [Agent tooling compatibility](/lib/07-coding/vibe-coding-prompt-template/docs-tools-agent-tooling-compatibility) — routing tasks across coding agents
