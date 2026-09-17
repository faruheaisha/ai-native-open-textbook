---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agentic-tools.md"
sourceRel: "guide/ecosystem/agentic-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/agentic-tools.md"
sourceSha256: "b8f74a0aa5f41faad7912a23e33e7953aba0d889eef308ce73eed6f3f3c04368"
pageSha256: "b370b5f8d235b802d49a1b734303b80dd58dbb866dd8026c6c3c5841b42fa1ff"
contentMode: "local-full"
zh: ""
---

## Section 5: Decision Framework

### Full Comparison Matrix

| Tool | Open Source | Stars | Model Support | Mode | Language | Cost |
|------|------------|-------|---------------|------|----------|------|
| **Claude Code** | Yes (TS) | 112K | Claude only | Interactive + headless | TypeScript | $20-$200/mo |
| **Codex CLI** | Yes | 86K | GPT-4o, o3, o4-mini | Interactive + headless | Rust | Included in ChatGPT Pro/Team |
| **Hermes Agent** | Yes (MIT) | 170K | 200+ providers | Interactive + cron + messaging | Python | Pay-per-LLM-call |
| **Aider** | Yes | 45K | 50+ providers | Interactive | Python | Pay-per-LLM-call |
| **Goose** | Yes | 46K | 15+ providers | Interactive + subagents | Rust | Pay-per-LLM-call |
| **DeepSeek Harness** | Yes (MIT) | 200K | DeepSeek + multi-provider | Local web UI + headless | TypeScript | Free + per-LLM-call |
| **Warp Agent** | No | N/A | Vendor routing + configurable routing | Interactive terminal + cloud handoff | Proprietary | See current Warp pricing |
| **Devin** | No | N/A | Proprietary | Fully autonomous | Proprietary | $20-$500/mo |
| **SWE-agent** | Yes (MIT) | 19K | Any (Claude, GPT...) | Autonomous (issue → PR) | Python | Pay-per-LLM-call |
| **CrewAI** | Yes (MIT) | 55K | 50+ providers | Framework (build your own) | Python | Framework is free |
| **LangGraph** | Yes (MIT) | 33K | Any | Framework | Python/JS | Framework is free |
| **AutoGen/MAF** | Yes (MIT) | 58K/11K | Any | Framework | Python/C#/TS | Framework is free |
| **MetaGPT** | Yes (MIT) | 69K | Any | Framework (SOP pipeline) | Python | Framework is free |
| **Symphony** | Yes (Apache 2.0) | 26K | Codex (reference impl) | Orchestrator (issue → run) | Elixir | Free + per-agent LLM cost |
| **Paperclip** | Yes (MIT) | 74K | Any (heartbeat protocol) | Orchestrator (goal → org) | TypeScript | Free + per-agent LLM cost |
| **Liza** | Yes (Apache 2.0) | 363 | External coding-agent CLIs | Orchestrator + repository harness | Go | Free + per-agent LLM cost |
| **Multica** | No (restricted source) | 49K | 26 agent CLI integrations | Control plane (issue/chat to local run) | Go/TypeScript | Self-host or current cloud plan + agent costs |

Star counts read July 15, 2026 via the GitHub API, except DeepSeek Harness, checked August 27, 2026 and rounded from 199,777, Liza, checked August 28, 2026, and Multica, checked September 9, 2026 and rounded from 49,348. Four rows carry a caveat the number hides: DeepSeek Harness is a developer preview, MetaGPT's 69K sits on a repo whose last release was April 2024, Symphony's 26K sits on an explicit engineering preview, and Multica uses a restricted source-available licence. Stars measure reach, not maintenance.

### Situation to Tool Guide

| Situation | Recommended |
|-----------|-------------|
| Daily coding, already on Claude Max | Claude Code |
| Daily coding, already on ChatGPT Pro | Codex CLI |
| Daily coding, want any model | Hermes Agent or Aider |
| Daily coding, general-purpose agent | Goose |
| Run interactive terminal applications and optionally hand work to a cloud agent | Warp Agent |
| Assign a task, come back to a PR | Devin ($500/mo) or `claude -p` in CI |
| Fix GitHub issues autonomously, research/benchmark | SWE-agent |
| Orchestrate multiple Claude Code instances | Gas Town, multiclaude, Ruflo (see [Third-Party Tools](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-third-party-tools/index#multi-agent-orchestration)) |
| Build a multi-agent product with roles | CrewAI |
| Build a stateful, recoverable workflow | LangGraph |
| Build in .NET + Python with Microsoft stack | AutoGen/MAF |
| Anthropic ecosystem, cloud-hosted agents | Anthropic Agent SDK (see [ai-ecosystem.md §14](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-ecosystem/index#14-claude-managed-agents)) |
| Manage a fleet of Hermes agents on VPS | Hermes Control Room pattern |
| Study role decomposition and SOP pipelines | MetaGPT (read it, do not depend on it) |
| Dispatch a tracker board to agents, one workspace per issue | Symphony spec (§4.4) |
| Coordinate mixed agent runtimes under budgets and approvals | Paperclip |
| Review Claude Code/Codex edits visually instead of reading diffs in a terminal | Nimbalyst (§4.7) |
| Run spec-driven doer/reviewer pairs with worktrees, recovery, and merge gates | Liza (§4.8) |
| Coordinate issue, chat, and scheduled work across local coding-agent CLIs | Multica (§4.9) |
| Enforce how work gets done inside an agent session | None of the above (see [spec-first.md](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-spec-first)) |

### The Model Lock-In Question

The single most clarifying question for choosing between Claude Code, Codex CLI, Hermes, Aider, and Goose: does the tool need to work with exactly one model provider, or multiple?

If you are committed to Claude and the Anthropic ecosystem (subscription, Routines, Agent SDK, CLAUDE.md tooling), Claude Code is unambiguously the right choice. The integration is native and the feature velocity from Anthropic is high.

If you need model flexibility (local models for sensitive code, cheaper models for routine tasks, specific models for benchmarking), Hermes Agent handles the broadest range with the most automation. Aider and Goose are simpler alternatives with smaller footprints.

If your team is OpenAI-first and already paying for ChatGPT Pro, Codex CLI costs nothing incremental.

### The Autonomy vs Control Trade-off

Higher autonomy means the agent can complete more work without you watching, but also means more ways to go off track on ambiguous tasks. The right autonomy level depends on how well-specified your tasks are, not on which tool is "more powerful."

Claude Code headless (`claude -p`) and SWE-agent give you controlled autonomy: you set the task, the agent runs, you review the output. Devin gives you maximal autonomy with a cloud sandbox: the agent has a full Linux environment and can take actions you did not anticipate. More power, more review required before merging.

Interactive agents (Claude Code terminal, Hermes, Aider, Goose) give you real-time control. You watch the agent think, redirect it when it goes wrong, and approve destructive actions. For exploratory work where requirements shift mid-session, interactive is faster than autonomous despite appearing more manual.

Agentless is a counterexample to treating autonomy or candidate volume as a quality proxy. Its FSE 2025 evaluation used a bounded three-phase workflow with GPT-4o on SWE-bench Lite and resolved 96 of 300 issues, or 32%, at an average reported inference cost of $0.70 per issue. Repair performance plateaued around 40 candidate patches. The result comes from one benchmark with 2024 API pricing and excludes test infrastructure and human review, so it is not a production forecast. It supports testing a bounded localization, repair, and validation workflow before adding more agent loops or candidates. Source: [Xia et al., Demystifying LLM-Based Software Engineering Agents](https://lingming.cs.illinois.edu/publications/fse2025.pdf), DOI [10.1145/3715754](https://doi.org/10.1145/3715754), PDF pp. 10-15, Table 1 and Figure 6.
