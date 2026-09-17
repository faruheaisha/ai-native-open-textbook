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
pageSha256: "a0e79ac44411970a41cf38ad3c6cc863d697be6d6936d0fc2111c49e093bfbb8"
contentMode: "local-full"
zh: ""
---

## Security Settings

Settings for the security enforcement feature (v1.31). All follow the **absent = enabled** pattern. These keys live under `workflow.*` in `.planning/config.json` — matching the shipped template and the runtime reads in `workflows/plan-phase.md`, `workflows/execute-phase.md`, `workflows/secure-phase.md`, and `workflows/verify-work.md`.

These keys live under `workflow.*` — that is where the workflows and installer write and read them. Setting them at the top level of `config.json` is silently ignored.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `workflow.security_enforcement` | boolean | `true` | Enable threat-model-anchored security verification via `/gsd-secure-phase`. When `false`, security checks are skipped entirely |
| `workflow.security_asvs_level` | number (1-3) | `1` | OWASP ASVS verification level. Level 1 = opportunistic, Level 2 = standard, Level 3 = comprehensive |
| `workflow.security_block_on` | string | `"high"` | Minimum severity that blocks phase advancement. Options: `"high"`, `"medium"`, `"low"` |
