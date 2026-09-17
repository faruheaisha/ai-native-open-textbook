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
pageSha256: "15730d5fd229d3fffd61be406e52b83083a182271f88fe56579ee8f8af1f5c5c"
contentMode: "local-full"
zh: ""
---

## Backlog & Threads

### Backlog Parking Lot

Ideas that aren't ready for active planning go into the backlog using 999.x numbering, keeping them outside the active phase sequence.

```
/gsd-capture --backlog "GraphQL API layer"     # Creates 999.1-graphql-api-layer/
/gsd-capture --backlog "Mobile responsive"     # Creates 999.2-mobile-responsive/
```

Backlog items get full phase directories, so you can use `/gsd-discuss-phase 999.1` to explore an idea further or `/gsd-plan-phase 999.1` when it's ready.

**Review and promote** with `/gsd-review-backlog` — it shows all backlog items and lets you promote (move to active sequence), keep (leave in backlog), or remove (delete).

### Seeds

Seeds are forward-looking ideas with trigger conditions. Unlike backlog items, seeds surface automatically when the right milestone arrives.

```
/gsd-capture --seed "Add real-time collab when WebSocket infra is in place"
```

Seeds preserve the full WHY and WHEN to surface. `/gsd-new-milestone` scans all seeds and presents matches.

**Storage:** `.planning/seeds/SEED-NNN-slug.md`

### Persistent Context Threads

Threads are lightweight cross-session knowledge stores for work that spans multiple sessions but doesn't belong to any specific phase.

```
/gsd-thread                              # List all threads
/gsd-thread fix-deploy-key-auth          # Resume existing thread
/gsd-thread "Investigate TCP timeout"    # Create new thread
```

Threads are lighter weight than `/gsd-pause-work` — no phase state, no plan context. Each thread file includes Goal, Context, References, and Next Steps sections.

Threads can be promoted to phases (`/gsd-phase`) or backlog items (`/gsd-capture --backlog`) when they mature.

**Storage:** `.planning/threads/\{slug\}.md`
