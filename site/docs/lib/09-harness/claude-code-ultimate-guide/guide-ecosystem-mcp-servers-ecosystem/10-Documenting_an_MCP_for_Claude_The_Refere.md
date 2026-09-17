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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-servers-ecosystem.md"
sourceRel: "guide/ecosystem/mcp-servers-ecosystem.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/mcp-servers-ecosystem.md"
sourceSha256: "1875888571dbb7a38db6c0267188775718596a25164159e18ffc2c8999b0a6b2"
pageSha256: "1d80a6e417ef6cecf57442f7546283ddfd7f605b6c84de44579870974075d4f7"
contentMode: "local-full"
zh: ""
---

## Documenting an MCP for Claude: The Reference File Pattern

When you integrate an MCP server into a skill, Claude has to figure out the query syntax, required parameter combinations, and quirky behavior on its own. For simple MCPs this is fine. For anything production-facing (observability tools, project management APIs, log aggregators), it breaks down fast. Claude guesses at parameter format, gets a cryptic error, retries with a different guess, and burns your budget on noise.
