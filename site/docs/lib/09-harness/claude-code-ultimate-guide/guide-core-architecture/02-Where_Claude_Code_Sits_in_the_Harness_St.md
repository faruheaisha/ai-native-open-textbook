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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/architecture.md"
sourceRel: "guide/core/architecture.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/architecture.md"
sourceSha256: "8d6da52e869bf1c04028a4cb8b16e5a7dd993877d379aa8b75c3433580d098d6"
pageSha256: "2ca68859503b4fab92c695f8f66cd5f1f6e97df7055d90b5b6459dac1c007ff5"
contentMode: "local-full"
zh: ""
---

## Where Claude Code Sits in the Harness Stack

Claude Code is a **runtime harness**: it owns the iterative model-and-tool loop for a coding task. The model generates tokens; the repository supplies instructions, setup, state, and verification; an orchestrator coordinates multiple runtime sessions. Those layers answer different questions and should not be evaluated as interchangeable products.

Read [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) for the four-layer model and the mechanics inside a runtime. Use the [Agent Harness Map](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index) when comparing products that own a coding loop. Use [Agent Tools: Beyond Claude Code](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index) for the broader set of frameworks, control planes, and runtime-adjacent tools. The [glossary](/lib/09-harness/claude-code-ultimate-guide/guide-core-glossary) defines the terms used across those pages.
