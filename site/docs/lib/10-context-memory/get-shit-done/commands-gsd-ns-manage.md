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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ns-manage.md"
sourceRel: "commands/gsd/ns-manage.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ns-manage.md"
sourceSha256: "99e4540905aa2162eb81480dd9e40f266e0a07ab076e7aa62cfc60349a1a3003"
pageSha256: "99e4540905aa2162eb81480dd9e40f266e0a07ab076e7aa62cfc60349a1a3003"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

Route to the appropriate management skill based on the user's intent.
`gsd-config` (settings + advanced + integrations + profile) and `gsd-workspace`
(new + list + remove) are post-#2790 consolidated entries.

| User wants | Invoke |
|---|---|
| Configure GSD settings (basic / advanced / integrations / profile) | gsd-config |
| Manage workspaces (create / list / remove) | gsd-workspace |
| Manage parallel workstreams | gsd-workstreams |
| Continue work in a fresh context thread | gsd-thread |
| Pause current work | gsd-pause-work |
| Resume paused work | gsd-resume-work |
| Update the GSD installation | gsd-update |
| Ship completed work | gsd-ship |
| Process inbox items | gsd-inbox |
| Create a clean PR branch | gsd-pr-branch |
| Undo the last GSD action | gsd-undo |

Invoke the matched skill directly using the Skill tool.
