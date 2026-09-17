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
pageSha256: "32461bb8e6371d50b0709dbc67ab175c82f6e6352279250f16b597afe0d5ebeb"
contentMode: "local-full"
zh: ""
---

## Integration Settings

Configured interactively via [`/gsd-config --integrations`](/lib/10-context-memory/get-shit-done/docs-COMMANDS#gsd-config). These are *connectivity* settings — API keys and cross-tool routing — and are intentionally kept separate from `/gsd-settings` (workflow toggles).

### Search API keys

API key fields accept a string value (the key itself). They can also be set to the sentinels `true`/`false`/`null` to override auto-detection from env vars / `~/.gsd/*_api_key` files (legacy behavior, see rows above).

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
