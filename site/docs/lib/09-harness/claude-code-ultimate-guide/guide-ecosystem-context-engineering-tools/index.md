---
title: "Context Engineering: Tools & Ecosystem"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/context-engineering-tools.md"
sourceRel: "guide/ecosystem/context-engineering-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/context-engineering-tools.md"
sourceSha256: "bbbffbbde103663bef6f5c71231fece9d185d0092e08520d85beb582e27fa4cf"
pageSha256: "8ec01acfb4a89b48da3d0baba71a4b2a390a67f3bda1b3a794a6dc2dfcaf9b98"
contentMode: "local-full"
zh: ""
---

# Context Engineering: Tools & Ecosystem

> **Confidence**: Tier 1/2. Core concepts based on published research and production data. Third-party tool details based on public documentation, GitHub API star counts verified 2026-07-07.
>
> **Related**: [Context Engineering (configuration guide)](/lib/09-harness/claude-code-ultimate-guide/guide-core-context-engineering/index) | [Third-Party Tools](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-third-party-tools/index) | [MCP Servers Ecosystem](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-mcp-servers-ecosystem/index) | [a map of the context-engineering tool landscape](https://www.florian.bruniaux.com/blog/articles/context-engineering-tools-map/) (four layers, not a ranking)

This page maps the ecosystem of tools that help you manage what enters the context window and what doesn't. It complements the [configuration-focused context engineering guide](/lib/09-harness/claude-code-ultimate-guide/guide-core-context-engineering/index), which covers CLAUDE.md structure and path-scoping. Here the focus is on the broader tooling landscape: output compression, prompt compression, AI gateways, RAG optimization, observability, and inference infrastructure.

---

## 本篇目录

- [Table of Contents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/01-Table_of_Contents.md)
- [1. The Mental Model](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/02-1._The_Mental_Model.md)
- [2. Core Concepts](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/03-2._Core_Concepts.md)
- [3. Output Compression: CLI & Tool Output](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/04-3._Output_Compression_CLI_Tool_Output.md)
- [4. Prompt Compression](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/05-4._Prompt_Compression.md)
- [5. AI Gateways](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/06-5._AI_Gateways.md)
- [6. RAG Optimization](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/07-6._RAG_Optimization.md)
- [7. Memory Systems](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/08-7._Memory_Systems.md)
- [8. KV Cache Infrastructure](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/09-8._KV_Cache_Infrastructure.md)
- [9. LLMOps & Observability](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/10-9._LLMOps_Observability.md)
- [10. Tool Selection by Use Case](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/11-10._Tool_Selection_by_Use_Case.md)
- [11. Research Landscape](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/12-11._Research_Landscape.md)
