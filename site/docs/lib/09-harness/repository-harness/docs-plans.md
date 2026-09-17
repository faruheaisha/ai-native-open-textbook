---
title: "Execution Plans"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/docs/plans/README.md"
sourceRel: "docs/plans/README.md"
rawUrl: "/raw/09-harness/repository-harness/docs/plans/README.md"
sourceSha256: "53f40ea9c3c1d9c32f81c93ff4619537499d9ecddc01aaebfea278c1e0adaed1"
pageSha256: "53f40ea9c3c1d9c32f81c93ff4619537499d9ecddc01aaebfea278c1e0adaed1"
contentMode: "local-full"
zh: ""
---

# Execution Plans

Plans are Git-native working memory for complex tasks.

Use an ephemeral plan for bounded, single-session work. Create one file under
`active/` when work spans sessions, coordinates contributors, has meaningful
dependencies, needs recovery, or cannot safely resume from its diff.

```text
docs/plans/active/<slug>.md
  -> keep progress, decisions, recovery, and validation current
  -> record the verified result
  -> move to docs/plans/completed/<slug>.md
```

Use `docs/templates/exec-plan.md`. Do not split one task into story, design,
trace, and validation records without an independent audience.

## Active

No durable work is currently active.

## History

Completed plans may be removed from the current tree when decisions, code,
tests, and Git history preserve their lasting result. This keeps current
retrieval focused without deleting provenance.
