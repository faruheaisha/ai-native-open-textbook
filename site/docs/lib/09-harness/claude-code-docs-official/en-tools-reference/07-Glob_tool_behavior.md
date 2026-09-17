---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "0d6132af4552f221bca60187a9841b203e0d25a057bb9e4cd18b43c3c0942fd0"
contentMode: "local-full"
zh: ""
---

## Glob tool behavior

The Glob tool finds files by name pattern. It supports standard glob syntax including `**` for recursive directory matching:

* `**/*.js` matches all `.js` files at any depth
* `src/**/*.ts` matches all `.ts` files under `src/`
* `*.\{json,yaml\}` matches `.json` and `.yaml` files in the current directory

Results are sorted by modification time and capped at 100 files. If the cap is hit, Claude sees a truncation flag in the result and can narrow the pattern.

Glob doesn't respect `.gitignore` by default, so it finds gitignored files alongside tracked ones. This differs from [Grep](#grep-tool-behavior), which skips gitignored files. To make Glob respect `.gitignore`, set `CLAUDE_CODE_GLOB_NO_IGNORE=false` before launching Claude Code.

Claude Code decides permission for a Glob call before it checks whether the search directory exists. It still runs the read-permission check for a missing `path` outside the [working directories](https://code.claude.com/docs/en/permissions#working-directories), so a permission prompt for a path doesn't mean the path exists.

A `pattern` or `path` value that contains a null byte returns an error asking Claude to remove it.&#x20;
