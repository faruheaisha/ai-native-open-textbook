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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agent-harness-landscape.md"
sourceRel: "guide/ecosystem/agent-harness-landscape.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/agent-harness-landscape.md"
sourceSha256: "ac957939ce9efa9622de77b893de044c67ec7891fba95a63115acdad64fa6d55"
pageSha256: "c0f7317e16a36b149ee2d695548ad4c259d7edd67aedf8919232e8f06bba08fa"
contentMode: "local-full"
zh: ""
---

## The Twelve-Category Map

The category names come from the pinned upstream snapshot. `Usually`, `Sometimes`, and `No` describe the category's typical relation to a loop. They do not assign one answer to every project inside it.

| Category | Projects | What it contributes | Owns an agent loop? | Guide layer |
|---|---:|---|---|---|
| [Coding agent products (IDEs, CLIs, full suites)](#coding-agent-products) | 22 | Turnkey coding agents | Usually | Runtime |
| [Coding harness configs and SDKs](#coding-harness-configs) | 17 | Configuration packs and agent SDKs | Sometimes | Repository / construction |
| [Evaluation and benchmarking harnesses](#evaluation) | 18 | Benchmarks and evaluation harnesses | No | Evaluation |
| [Frameworks](#frameworks) | 25 | Libraries for building an agent loop | Sometimes | Construction |
| [Libraries and SDKs](#libraries-sdks) | 15 | Reusable agent building blocks | No | Construction |
| [Memory and state](#memory) | 5 | Persistent state and retrieval | No | Memory |
| [Multi-agent and orchestration](#multi-agent) | 12 | Coordination across agents or runtimes | Sometimes | Orchestrator |
| [Observability and eval-ops](#observability) | 4 | Tracing, quality, and operations | No | Observability |
| [Personal agent runtimes](#personal-agent-runtimes) | 10 | Ready-to-run personal agents | Usually | Runtime |
| [Plugins, MCPs, CLI tools](#plugins-mcp-cli) | 19 | Tools connected to an existing runtime | No | Extension |
| [Progressive disclosure harnesses](#progressive-disclosure) | 8 | Context and prompt-loading strategies | Sometimes | Repository / context |
| [Research and task-specific harnesses](#research-task) | 5 | Domain-specific agents and research systems | Sometimes | Runtime / task-specific |
