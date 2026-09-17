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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/security-hardening.md"
sourceRel: "guide/security/security-hardening.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/security/security-hardening.md"
sourceSha256: "9e60a03ddb48e780dee266f946d4af20567529ee0e632ce6f3ed3cc721df06e8"
pageSha256: "86af8a1b05645aed0b9c2730d9a825011de90cbd31f22ca91238eabb376f5d66"
contentMode: "local-full"
zh: ""
---

## TL;DR - Decision Matrix

| Your Situation | Immediate Action | Time |
|----------------|------------------|------|
| **Solo dev, public repos** | Install output scanner hook | 5 min |
| **Team, sensitive codebase** | + MCP vetting + injection hooks | 30 min |
| **Enterprise, production** | + ZDR + integrity verification | 2 hours |

**Right now**: Check your MCPs against the [Safe List](#mcp-safe-list-community-vetted) below.

> **NEVER**: Approve MCPs from unknown sources without version pinning.
> **NEVER**: Run database MCPs on production without read-only credentials.
