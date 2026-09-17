---
title: "Memory Systems"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/memory-systems.md"
sourceRel: "guide/core/memory-systems.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/memory-systems.md"
sourceSha256: "202c1a94a23216f809b11b8a8694609b012d5918a80e25a0ae3f50ebca76308c"
pageSha256: "d83ce743ae2a5c50e3e1ee920bfbaedafcb8d6391642919f969ddbf79dc62814"
contentMode: "local-full"
zh: ""
---

# Memory Systems

> **Confidence**: Tier 1 (native stack, well-documented tools) / Tier 2 (newer tools, vendor benchmarks) / Tier 3 (emerging patterns, unverified claims)
>
> **Last updated**: May 2026 (star counts verified 2026-07-27 via GitHub API)

> **Related**: [Context Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-context-engineering/index) | [Architecture](/lib/09-harness/claude-code-ultimate-guide/guide-core-architecture/index) | [Settings Reference](/lib/09-harness/claude-code-ultimate-guide/guide-core-settings-reference/index) | [Agent Teams](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agent-teams/index)

Memory in Claude Code has no single canonical source. It spans native CC features, MCP servers, hooks, and coordination protocols. This page consolidates everything.

---

## 本篇目录

- [Table of Contents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/01-Table_of_Contents.md)
- [1. TL;DR: Three-Track Model](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/02-1._TL_DR_Three-Track_Model.md)
- [2. Native Claude Code Memory Stack](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/03-2._Native_Claude_Code_Memory_Stack.md)
- [3. Cross-Session Tools (Single User)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/04-3._Cross-Session_Tools_Single_User.md)
- [4. Team Sharing](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/05-4._Team_Sharing.md)
- [5. Multi-Agent Shared Memory](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/06-5._Multi-Agent_Shared_Memory.md)
- [6. Architecture Patterns](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/07-6._Architecture_Patterns.md)
- [7. Risks and Security](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/08-7._Risks_and_Security.md)
- [8. Decision Frameworks](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/09-8._Decision_Frameworks.md)
- [9. Benchmarks and Evaluation](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/10-9._Benchmarks_and_Evaluation.md)
- [10. Open Problems](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/11-10._Open_Problems.md)
