---
title: "MCP Servers Ecosystem"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-servers-ecosystem.md"
sourceRel: "guide/ecosystem/mcp-servers-ecosystem.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/mcp-servers-ecosystem.md"
sourceSha256: "1875888571dbb7a38db6c0267188775718596a25164159e18ffc2c8999b0a6b2"
pageSha256: "dbcde1e7bff47f45e9e6d0bde3db5eb7e8743df933984223905b4fae4fac1456"
contentMode: "local-full"
zh: ""
---

# MCP Servers Ecosystem

**Last updated**: July 2026 • **Next review**: August 2026

This guide covers validated community MCP servers beyond the official Anthropic servers. All servers listed have been evaluated for production readiness, maintenance activity, and security.

> **Not sure whether to use an MCP server or a CLI tool?** See the [MCP vs CLI Decision Guide](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-mcp-vs-cli) for a full breakdown of tradeoffs, a decision matrix, and guidance by situation.

## 本篇目录

- [Table of Contents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/01-Table_of_Contents.md)
- [Official vs Community Servers](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/02-Official_vs_Community_Servers.md)
- [Evaluation Framework](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/03-Evaluation_Framework.md)
- [Ecosystem Evolution](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/04-Ecosystem_Evolution.md)
- [Version Control (Official Servers)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/05-Version_Control_Official_Servers.md)
- [Validated Community Servers](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/06-Validated_Community_Servers.md)
- [Production Deployment](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/07-Production_Deployment.md)
- [Advanced MCP Tool Design](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/08-Advanced_MCP_Tool_Design.md)
- [Monthly Watch Methodology](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/09-Monthly_Watch_Methodology.md)
- [Documenting an MCP for Claude: The Reference File Pattern](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/10-Documenting_an_MCP_for_Claude_The_Refere.md)
- [Excluded Servers](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/11-Excluded_Servers.md)
- [Statistics & Insights](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/12-Statistics_Insights.md)
