---
title: "Agent Tools: Beyond Claude Code"
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
pageSha256: "3605c4318bdccb601475fb73e3b3379c1e0d06239e73dd4ee2c9140dbf62da45"
contentMode: "local-full"
zh: ""
---

# Agent Tools: Beyond Claude Code

Claude Code is one tool in a field that has expanded dramatically since 2024. Dozens of agent frameworks, autonomous coders, and multi-agent systems have shipped, each with different trade-offs. This page maps that field so you can decide when Claude Code is the right call, and when something else fits better.

**What this page covers**: terminal coding agents, autonomous coders, multi-agent orchestration frameworks, and agent orchestration tooling. Claude Code's own multi-agent capabilities (agent teams, event-driven workflows, programmatic usage) are documented separately, linked throughout.

**What it does not cover**: editor-only comparisons. IDEs, ADEs, and products that combine several interfaces are covered in [AI Ecosystem §6](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-ecosystem/index#6-ide-ade-and-hybrid-coding-environments). A hybrid product appears here only when its coding agent is also usable as a terminal runtime. Multi-Claude orchestration tools (Gas Town, multiclaude, Conductor desktop app) are in [Third-Party Tools: Multi-Agent Orchestration](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-third-party-tools/index#multi-agent-orchestration).

For the full field across CLI, IDE, and cloud agents, use the [Agent Harness Landscape](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index). For the loop, context, tools, permissions, recovery, observability, and automated harness optimization, read [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index). For explicit feedback loops, workflow graphs, stopping rules, and responsibility boundaries, read [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering). The [glossary](/lib/09-harness/claude-code-ultimate-guide/guide-core-glossary) separates runtime harnesses from repository harnesses, evaluation harnesses, orchestrators, and meta-harnesses.

---

## 本篇目录

- [The Spectrum](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/01-The_Spectrum.md)
- [Section 1: Terminal Coding Agents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/02-Section_1_Terminal_Coding_Agents.md)
- [Section 2: Autonomous Coding Agents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/03-Section_2_Autonomous_Coding_Agents.md)
- [Section 3: Multi-Agent Frameworks](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/04-Section_3_Multi-Agent_Frameworks.md)
- [Section 4: Agent Orchestration Tools](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/05-Section_4_Agent_Orchestration_Tools.md)
- [Section 5: Decision Framework](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/06-Section_5_Decision_Framework.md)
- [Cross-References](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/07-Cross-References.md)
