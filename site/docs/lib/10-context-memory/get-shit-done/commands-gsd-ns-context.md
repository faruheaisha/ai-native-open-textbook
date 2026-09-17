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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ns-context.md"
sourceRel: "commands/gsd/ns-context.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ns-context.md"
sourceSha256: "f94baf3f81ec19108e5dcddd4eef9aec012b8767b87f4ec6e7854a192a67342a"
pageSha256: "f94baf3f81ec19108e5dcddd4eef9aec012b8767b87f4ec6e7854a192a67342a"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

Route to the appropriate codebase-intelligence skill based on the user's intent.
`gsd-scan` and `gsd-intel` were folded into `gsd-map-codebase` flags by #2790.

| User wants | Invoke |
|---|---|
| Map the full codebase structure | gsd-map-codebase |
| Quick lightweight codebase scan | gsd-map-codebase --fast |
| Query mapped intelligence files | gsd-map-codebase --query |
| Generate a knowledge graph | gsd-graphify |
| Update project documentation | gsd-docs-update |
| Extract learnings from a completed phase | gsd-extract-learnings |

Invoke the matched skill directly using the Skill tool.
