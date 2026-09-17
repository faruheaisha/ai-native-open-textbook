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
pageSha256: "a7fa344354c885f11a8a0a261dbc144a7a9babe0c68e5ef5a69c31d250fcddff"
contentMode: "local-full"
zh: ""
---

## Gate Settings

Control confirmation prompts during workflows.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `gates.confirm_project` | boolean | `true` | Confirm project details before finalizing |
| `gates.confirm_phases` | boolean | `true` | Confirm phase breakdown |
| `gates.confirm_roadmap` | boolean | `true` | Confirm roadmap before proceeding |
| `gates.confirm_breakdown` | boolean | `true` | Confirm task breakdown |
| `gates.confirm_plan` | boolean | `true` | Confirm each plan before execution |
| `gates.execute_next_plan` | boolean | `true` | Confirm before executing next plan |
| `gates.issues_review` | boolean | `true` | Review issues before creating fix plans |
| `gates.confirm_transition` | boolean | `true` | Confirm phase transition |
