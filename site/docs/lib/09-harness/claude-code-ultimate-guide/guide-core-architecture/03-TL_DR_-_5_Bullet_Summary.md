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
pageSha256: "9edb56d06229fd9ec8c9060c02e30cac30786e98f6eebe4fb6f3d94e6c7467dd"
contentMode: "local-full"
zh: ""
---

## TL;DR - 5 Bullet Summary

1. **Simple Loop**: Claude Code runs a `while(tool_call)` loop, with no DAGs, no classifiers, no RAG. The model decides everything.

2. **Eight Core Tools**: Bash (universal adapter), Read, Edit, Write, Grep, Glob, Task (sub-agents), TodoWrite. That's the entire arsenal.

   **Search Strategy Evolution**: Early Claude Code versions experimented with RAG using Voyage embeddings for semantic code search. Anthropic switched to grep-based (ripgrep) agentic search after internal benchmarks showed superior performance with lower operational complexity: no index sync required, no security liabilities from external embedding providers. This "Search, Don't Index" philosophy trades latency/tokens for simplicity/security. Community plugins (ast-grep for AST patterns) and MCP servers (Serena for symbols, grepai for RAG) available for specialized needs.

   *Source*: [Latent Space podcast](https://www.latent.space/p/claude-code) (May 2025), ast-grep documentation

3. **200K Token Budget**: Context window shared between system prompt, history, tool results, and response buffer. Auto-compacts at ~75-92% capacity.

4. **Sub-agents = Isolation**: The `Task` tool spawns sub-agents with their own context. They cannot spawn more sub-agents (depth=1). Only their summary returns.

5. **Philosophy**: "Less scaffolding, more model." Trust Claude's reasoning instead of building complex orchestration systems around it.
