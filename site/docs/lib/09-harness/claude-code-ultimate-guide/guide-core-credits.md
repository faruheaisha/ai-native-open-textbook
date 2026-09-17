---
title: "Credits and External Inspirations"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/credits.md"
sourceRel: "guide/core/credits.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/credits.md"
sourceSha256: "9ae414f7b94ac7c00c86615ba0dd12e2482e734968ed28cdd5e2e11ef2e0a7ab"
pageSha256: "9ae414f7b94ac7c00c86615ba0dd12e2482e734968ed28cdd5e2e11ef2e0a7ab"
contentMode: "local-full"
zh: ""
---

# Credits and External Inspirations

This guide documents patterns from the Claude Code community. Some sections are directly inspired by open-source repos, blog posts, or public engineering work. This page consolidates attributions in one place.

---

## Packmind Engineering Team

**Repo**: [github.com/packmind/packmind](https://github.com/packmind/packmind)
**Author**: Cédric Teyton (CTO, Packmind)
**License**: Apache 2.0

Packmind maintains a production Claude Code configuration in their open-source repo. Several patterns documented in this guide were inspired by their `.claude/` setup:

### Pattern 1: MCP Reference File

**Guide section**: [Documenting an MCP for Claude](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-mcp-servers-ecosystem/index#documenting-an-mcp-for-claude-the-reference-file-pattern)
**Source**: `.claude/skills/datadog-analysis/references/datadog_mcp.md`
