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
pageSha256: "2be270a2856ab4d83bb745d92322dde179ea8f0cf110fcef775be9fe97416397"
contentMode: "local-full"
zh: ""
---

## Namespace routing primer (`gsd:<namespace>`, v1.40)

v1.40 ships six **namespace meta-skills** as the first-stage entry points for hierarchical routing — they keep the eager skill-listing token cost low (~120 tokens for 6 routers vs ~2,150 for a flat 86-skill listing) while every concrete sub-skill remains directly invocable. Each namespace router's body contains a routing table that maps your intent to the correct concrete sub-skill.

| Namespace | Router | Routes to |
|-----------|--------|-----------|
| Phase pipeline | `/gsd-workflow` | discuss / plan / execute / verify / phase / progress |
| Project lifecycle | `/gsd-project` | milestones, audits, summary |
| Quality gates | `/gsd-quality` | code review, debug, audit, security, eval, ui |
| Codebase intelligence | `/gsd-context` | map, graphify, docs, learnings |
| Management | `/gsd-manage` | config, workspace, workstreams, thread, update, ship, inbox |
| Exploration & capture | `/gsd-ideate` | explore, sketch, spike, spec, capture |

You almost never need to type a namespace router yourself. Their value is in the routing layer the model uses to discover the right sub-skill — they exist so the system prompt can list 6 entries instead of 86. If you already know the concrete command (e.g. `/gsd-plan-phase`), call it directly.
