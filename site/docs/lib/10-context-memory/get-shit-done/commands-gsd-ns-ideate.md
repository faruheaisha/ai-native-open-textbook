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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ns-ideate.md"
sourceRel: "commands/gsd/ns-ideate.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ns-ideate.md"
sourceSha256: "edc5e543512dd48abe79b85db54294ec86b692a3e911e76334fe43e4086d60c0"
pageSha256: "edc5e543512dd48abe79b85db54294ec86b692a3e911e76334fe43e4086d60c0"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

Route to the appropriate exploration / capture skill based on the user's intent.
`gsd-note`, `gsd-add-todo`, `gsd-add-backlog`, and `gsd-plant-seed` were folded
into `gsd-capture` (with `--note`, default, `--backlog`, `--seed` modes) by
#2790. The capture target lists pending todos via `--list`.

| User wants | Invoke |
|---|---|
| Explore an idea or opportunity | gsd-explore |
| Sketch out a rough design or plan | gsd-sketch |
| Time-boxed technical spike | gsd-spike |
| Write a spec for a phase | gsd-spec-phase |
| Capture a thought (todo / note / backlog / seed) | gsd-capture |

Invoke the matched skill directly using the Skill tool.
