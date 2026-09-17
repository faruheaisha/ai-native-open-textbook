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
pageSha256: "e60cb2a99db584dfb4ca74a3a5e4e3f474c3c6d0a59b9691a73fd3ab357ff305"
contentMode: "local-full"
zh: ""
---

## Global Defaults

Save settings as global defaults for future projects:

**Location:** `~/.gsd/defaults.json`

When `/gsd-new-project` creates a new `config.json`, it reads global defaults and merges them as the starting configuration. Per-project settings always override globals.
