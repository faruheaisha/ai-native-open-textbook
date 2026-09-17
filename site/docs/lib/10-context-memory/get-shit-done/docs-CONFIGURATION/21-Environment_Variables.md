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
pageSha256: "be81b00b3377cfd5bc1932cf9e0bd58e7fb492d4ded225022abc5b36345b8c79"
contentMode: "local-full"
zh: ""
---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CONFIG_DIR` | Override default config directory (`~/.claude/`) |
| `GEMINI_API_KEY` | Detected by context monitor to switch hook event name |
| `WSL_DISTRO_NAME` | Detected by installer for WSL path handling |
| `GSD_SKIP_SCHEMA_CHECK` | Skip schema drift detection during execute-phase (v1.31) |
| `GSD_PROJECT` | Override project root for multi-project workspace support (v1.32) |
