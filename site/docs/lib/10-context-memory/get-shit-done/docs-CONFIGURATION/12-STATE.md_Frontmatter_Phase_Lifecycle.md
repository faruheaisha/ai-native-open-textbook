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
pageSha256: "012b6513a25107cf6ddeb9c02847bedffb14838bf2546710f0fe9d165eb57a63"
contentMode: "local-full"
zh: ""
---

## STATE.md Frontmatter (Phase Lifecycle)

`STATE.md` carries YAML frontmatter that the status-line hook reads on every render. v1.40 adds four optional phase-lifecycle fields read by `parseStateMd()` and rendered by `formatGsdState()`:

| Field | Type | Purpose |
|-------|------|---------|
| `active_phase` | string (e.g. `"4.5"`) | Phase number when an orchestrator command is in flight |
| `next_action` | string | Recommended next command when idle (`discuss-phase` / `plan-phase` / `execute-phase` / `verify-phase`) |
| `next_phases` | YAML flow array | Phases the `next_action` applies to (e.g. `["4.5"]`) |
| `progress` | block | Nested `total_phases` / `completed_phases` / `percent` for the milestone progress bar |

All four fields are **optional and additive** — STATE.md files without them keep rendering exactly as in v1.38.x. See [`STATE-MD-LIFECYCLE.md`](/lib/10-context-memory/get-shit-done/docs-STATE-MD-LIFECYCLE) for the full field reference, parser constraints, and rendering scenes.
