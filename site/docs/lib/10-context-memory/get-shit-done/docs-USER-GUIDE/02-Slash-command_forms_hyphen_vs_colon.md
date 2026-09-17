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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "4323f6f338848204ed603f6b381e47962aba6b1cdb46f66b0b799466309e73cb"
contentMode: "local-full"
zh: ""
---

## Slash-command forms (hyphen vs colon)

GSD ships **the same set of skills** to every supported runtime, but two slash-form spellings are in play:

- **Hyphen form** — `/gsd-command-name` — used by Claude Code, Copilot, OpenCode, Kilo, Cursor, Windsurf, Augment, Antigravity, and Trae.
- **Colon form** — `/gsd:command-name` — used by **Gemini CLI only**. Gemini namespaces every plugin's commands under the plugin id, so the install path rewrites every body-text reference and command file to the colon form during `--gemini` install.

You don't need to choose — the installer writes the correct form into the command directory of each runtime you target. When following a walkthrough on a Gemini terminal, replace the hyphen after `gsd` with a colon as you read each slash command.
