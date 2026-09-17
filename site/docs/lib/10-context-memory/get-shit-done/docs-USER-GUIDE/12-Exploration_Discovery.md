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
pageSha256: "b072cf89f15d0d845de0000ff83968fcc1384a165538f56090704d89e5538324"
contentMode: "local-full"
zh: ""
---

## Exploration & Discovery

### Socratic Exploration

Before committing to a new phase or plan, use `/gsd-explore` to think through the idea:

```bash
/gsd-explore                           # Open-ended ideation
/gsd-explore "caching strategy"        # Explore a specific topic
```

The exploration session guides you through probing questions, optionally spawns a research agent, and routes output to the appropriate GSD artifact: note, todo, seed, research question, requirements update, or new phase.

### Codebase Intelligence

For queryable codebase insights without reading the entire codebase, enable the intel system:

```json
{ "intel": { "enabled": true } }
```

Then build the index:

```bash
/gsd-map-codebase --query refresh             # Analyze codebase and write .planning/intel/ files
/gsd-map-codebase --query auth               # Search for a term across all intel files
/gsd-map-codebase --query status             # Check freshness of intel files
/gsd-map-codebase --query diff               # See what changed since last snapshot
```

Intel files cover stack, API surface, dependency graph, file roles, and architecture decisions.

### Quick Scan

For a focused assessment without full `/gsd-map-codebase` overhead:

```bash
/gsd-map-codebase --fast                        # Quick tech + arch overview
/gsd-map-codebase --fast --focus quality        # Quality and code health only
/gsd-map-codebase --fast --focus concerns       # Risk areas and concerns
```
