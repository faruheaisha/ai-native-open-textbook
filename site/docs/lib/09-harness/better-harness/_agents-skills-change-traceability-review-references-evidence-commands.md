---
title: "Evidence Commands"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/change-traceability-review/references/evidence-commands.md"
sourceRel: ".agents/skills/change-traceability-review/references/evidence-commands.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/change-traceability-review/references/evidence-commands.md"
sourceSha256: "623bfd60eab7c7677aba9bb22a5cc9b468888ac77b201076a2e277e1826dcdbb"
pageSha256: "623bfd60eab7c7677aba9bb22a5cc9b468888ac77b201076a2e277e1826dcdbb"
contentMode: "local-full"
zh: ""
---

# Evidence Commands

Use bounded local evidence first:

- Current changes: `git status --porcelain=v1 | sed -n 'l'`, `git diff --cached --name-only`, `git diff --stat`, `git diff --name-only`, and focused hunks.
