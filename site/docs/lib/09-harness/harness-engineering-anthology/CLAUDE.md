---
title: "Claude Code"
sourceId: "09-harness/harness-engineering-anthology"
sourceTitle: "Harness Engineering 文集"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/lopopolo/harness-engineering"
entryUrl: "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/README.md"
zh: ""
---

# Claude Code

- Follow links from the imported guide just in time. Do not preload the entire
  corpus before classifying the task.
- Use subagents for bounded evidence gathering and independent review. Keep the
  main thread responsible for decisive source reading, application,
  verification, and task closure.
- Treat auto memory as local scratch state. Prefer the target system and this
  corpus's cited sources when establishing facts.
