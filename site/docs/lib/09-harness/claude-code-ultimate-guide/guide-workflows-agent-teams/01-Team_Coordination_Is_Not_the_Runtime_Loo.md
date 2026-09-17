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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/agent-teams.md"
sourceRel: "guide/workflows/agent-teams.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/workflows/agent-teams.md"
sourceSha256: "a31f6529fd0d6c7f53e64323461842508bad29795405d8d1b81c69cbfb2ca812"
pageSha256: "04f6088d5f4b17e88d1325d6442483271ca8e026594838c05767bd9659b31ab1"
contentMode: "local-full"
zh: ""
---

## Team Coordination Is Not the Runtime Loop

Agent Teams coordinates several Claude Code sessions. Claude Code remains the runtime harness that owns each session's model-and-tool loop; the repository harness owns shared instructions, setup, task state, and verification. Treat a team manager, dashboard, or queue as an orchestrator unless it itself runs the loop.

Use the [Agent Harness Map](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index) to compare loop-owning runtimes with the separate orchestration layer. [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) defines the four layers, and [Agent Tools: Beyond Claude Code](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index) covers additional frameworks and control planes. Evaluate handoffs and recovery with [Agent Evaluation](/lib/09-harness/claude-code-ultimate-guide/guide-roles-agent-evaluation), observe team execution with [Session Observability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability), and apply [Security Hardening](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index) before connecting agents to sensitive systems. Definitions are in the [glossary](/lib/09-harness/claude-code-ultimate-guide/guide-core-glossary).
