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
pageSha256: "ea14454b96abed7d835c3201045aa5e345dd8a41072598fb7f9631d34377c16d"
contentMode: "local-full"
zh: ""
---

## LSP tool behavior

The LSP tool gives Claude code intelligence from a running language server. After each file edit, it automatically reports type errors and warnings so Claude can fix issues without a separate build step. Claude can also call it directly to navigate code:

* Jump to a symbol's definition
* Find all references to a symbol
* Get type information at a position
* List symbols in a file
* Search for a symbol by name across the workspace
* Find implementations of an interface
* Trace call hierarchies

Claude Code keeps the tool inactive until you install a [code intelligence plugin](https://code.claude.com/docs/en/discover-plugins#code-intelligence) for your language. In [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web), Claude Code doesn't start plugin language servers, so the LSP tool stays inactive there. Claude Code takes the language server's configuration from the plugin, and you install the server binary yourself.

Claude Code returns an error result for each LSP call on a file whose language server it can't start.
