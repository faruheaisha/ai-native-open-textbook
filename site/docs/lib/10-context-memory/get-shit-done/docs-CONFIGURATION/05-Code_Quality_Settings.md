---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "ed107f8362679cb4cdc01a10913ca9abeb502aa0b851ad5249ca153577ed8083"
contentMode: "local-full"
zh: ""
---

## Code Quality Settings

The `code_quality.*` namespace gates optional structural-analysis tooling that augments `/gsd-code-review`. Settings are additive: each tool is independently opt-in and off by default.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `code_quality.fallow.enabled` | boolean | `false` | Enables fallow structural pre-pass for `/gsd-code-review`. When `false`, no fallow binary probe or JSON artifact is produced. |
| `code_quality.fallow.scope` | string | `phase` | Scope for fallow analysis: `phase` (current review file scope) or `repo` (entire repository). |
| `code_quality.fallow.profile` | string | `standard` | Fallow profile selector passed to the pre-pass runner (`minimal`, `standard`, `strict`). |
| `code_quality.fallow.mcp` | boolean | `false` | **Reserved — not yet implemented.** When `true`, enables MCP-backed structural findings mode for runtimes that support MCP server routing. Setting this to `true` is currently a no-op and emits a runtime warning. |
