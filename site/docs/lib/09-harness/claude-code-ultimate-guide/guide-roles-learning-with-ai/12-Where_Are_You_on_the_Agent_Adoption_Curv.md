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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/learning-with-ai.md"
sourceRel: "guide/roles/learning-with-ai.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/roles/learning-with-ai.md"
sourceSha256: "f144ce919ab10175ad88e2e4af32f82ce38d56016db54ccd80218ed6a8a073df"
pageSha256: "680422b3b594fa7c4ae5abe9af5e9ebd10355ff9afbccb039746de1f9e2c371c"
contentMode: "local-full"
zh: ""
---

## Where Are You on the Agent Adoption Curve?

> **Audience**: Developers already using Claude Code who want to gauge their current sophistication, not beginners starting from scratch (use the 30-Day Plan below for that).

Before picking a learning path, locate yourself. Nicolas Martignole (Principal Engineer at Back Market) proposed a 6-level maturity scale in March 2026 that maps well onto practical Claude Code usage. The levels below are adapted from his framework, with the upper half (3-5) being where most of this guide's content lives.

| Level | Profile | Signal |
|-------|---------|--------|
| **0** | Never used AI dev tools | Using chatbots at most, nothing integrated in workflow |
| **1** | Editor autocomplete | Cursor, Copilot, Windsurf, but no agent-level usage |
| **2** | External LLM, copy-paste | ChatGPT or Claude in browser, pasting code manually into editor |
| **3** | Claude Code basic user | Running Plan mode, simple prompts, reviewing everything manually |
| **4** | Stage delegator | Handing off full development stages (research, architecture, implementation, tests), writing less than 10% of code manually |
| **5** | Context engineer | Designing CLAUDE.md, sub-agents, custom skills, MCP servers, building the environment for agents to operate in |
| **6** | Orchestrator | Coordinating agent graphs, reinforcement loops, distributed agent systems |

**Quick self-placement questions:**

- Can you leave Claude Code running on a feature branch for 20+ minutes without checking in? → Level 4+
- Do you write CLAUDE.md before starting a project, not after? → Level 5
- Have you built a custom agent or hook in the last month? → Level 5-6
- Is your primary output prompts and system design, not code? → Level 6

If you landed at Level 3 or below: the 30-Day Plan below is the right path. If you're at Level 4-6: skip to [Context Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-context-engineering/index), [Agent Patterns](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/agents/README.md), or [MCP Ecosystem](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-mcp-servers-ecosystem/index).

> Source: Nicolas Martignole, ["Découvrir les niveaux de maturité de l'adoption des coding agents"](https://www.touilleur-express.fr/2026/03/17/decouvrir-les-niveaux-de-maturite-de-ladoption-des-coding-agents), Le Touilleur Express, March 2026. Adapted and extended.
