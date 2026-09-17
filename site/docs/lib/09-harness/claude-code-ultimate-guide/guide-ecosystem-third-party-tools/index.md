---
title: "Claude Code Community Tools: 40+ Extensions Verified June 2026"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md"
sourceRel: "guide/ecosystem/third-party-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/third-party-tools.md"
sourceSha256: "b3e2f559e8457efd6710fab561c9ec7cd746c62b9885fa5535509f700f4a2677"
pageSha256: "1f99cd11fa1c30e8c0fb134f85d79737582c097616cc521497a187d4d9fd04f6"
contentMode: "local-full"
zh: ""
---

# Claude Code Community Tools: 40+ Extensions Verified June 2026

This page catalogs community-built tools that extend Claude Code, organized by use case. Every entry has been verified against its public repository or package registry. For each category, the "When to use" comparison explains which tool fits which workflow, because the right choice depends on your stack and constraints, not just star count.

This is not a list of AI tools that complement Claude Code generally. It covers only tools whose primary purpose is extending the Claude Code CLI itself. For broader AI ecosystem coverage, see [AI Ecosystem](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-ecosystem/index). For MCP server recommendations, see [MCP Servers Ecosystem](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-mcp-servers-ecosystem/index).

These extensions may observe, configure, or coordinate Claude Code, but they do not necessarily own an agent loop. Use the [Agent Harness Map](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index) for the strict runtime comparison and a wider sourced directory, [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) for the layer boundaries, and [Agent Tools: Beyond Claude Code](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index) for runtime-adjacent frameworks and control planes. Evaluate, observe, and secure an added tool through [Agent Evaluation](/lib/09-harness/claude-code-ultimate-guide/guide-roles-agent-evaluation), [Session Observability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability), and [Security Hardening](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index). The [glossary](/lib/09-harness/claude-code-ultimate-guide/guide-core-glossary) defines the distinctions.

> **Last verified**: June 2026. 40+ tools across 17 categories.

## 本篇目录

- [Table of Contents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/01-Table_of_Contents.md)
- [About This Page](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/02-About_This_Page.md)
- [Token & Cost Tracking](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/03-Token_Cost_Tracking.md)
- [Context Compression](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/04-Context_Compression.md)
- [Session Management](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/05-Session_Management.md)
- [Configuration Management](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/06-Configuration_Management.md)
- [Security Scanning](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/07-Security_Scanning.md)
- [Configuration Quality](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/08-Configuration_Quality.md)
- [Project Context Bootstrapping](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/09-Project_Context_Bootstrapping.md)
- [Engineering Standards Distribution](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/10-Engineering_Standards_Distribution.md)
- [Hook Utilities](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/11-Hook_Utilities.md)
- [Alternative UIs](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/12-Alternative_UIs.md)
- [Multi-Agent Orchestration](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/13-Multi-Agent_Orchestration.md)
- [External Orchestration Frameworks](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/14-External_Orchestration_Frameworks.md)
- [Knowledge Graph](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/15-Knowledge_Graph.md)
- [Skills Observability](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/16-Skills_Observability.md)
- [Plugin Ecosystem](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/17-Plugin_Ecosystem.md)
- [Known Gaps](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/18-Known_Gaps.md)
- [Recommendations by Persona](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/19-Recommendations_by_Persona.md)
- [Related Resources](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/20-Related_Resources.md)
- [Go further](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/21-Go_further.md)
