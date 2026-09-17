---
title: "MCP Integration Reference Pattern"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/mcp-integration-reference/SKILL.md"
sourceRel: "examples/skills/mcp-integration-reference/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/mcp-integration-reference/SKILL.md"
sourceSha256: "89356e3bdaa34ae504ffae418d43dee115c28b029037583b639340f3b80a1fe3"
pageSha256: "89356e3bdaa34ae504ffae418d43dee115c28b029037583b639340f3b80a1fe3"
contentMode: "local-full"
zh: ""
---

# MCP Integration Reference Pattern

> This is a template skill. It shows how to structure a skill that wraps an MCP server. Replace `sentry` with your MCP server name and adapt the reference file at `references/sentry-mcp.md`.

## What This Pattern Solves

When a skill calls an MCP server without prior context, Claude guesses at the query syntax. This works for simple calls but breaks on anything with non-obvious behavior: pagination quirks, required parameter combinations, rate limits, or subtle format restrictions.
