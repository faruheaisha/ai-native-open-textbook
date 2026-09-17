---
title: "Triage Labels"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/agents/triage-labels.md"
sourceRel: "docs/agents/triage-labels.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/agents/triage-labels.md"
sourceSha256: "589a7d0ac420c3bdb565ff9cdd734783f6b128071f1acbf0a804547fd95f51a8"
pageSha256: "589a7d0ac420c3bdb565ff9cdd734783f6b128071f1acbf0a804547fd95f51a8"
contentMode: "local-full"
zh: ""
---

# Triage Labels

Maps the five canonical triage roles to the actual label strings in `gsd-build/get-shit-done`.

| Canonical role    | Label in this repo       | Notes                                                          |
|-------------------|--------------------------|----------------------------------------------------------------|
| `needs-triage`    | `needs-triage`           | Auto-applied by GitHub Action on every new issue               |
| `needs-info`      | `needs-reproduction`     | Waiting on reporter — cannot reproduce, more info required     |
| `ready-for-agent` | `confirmed`              | Bug verified + fully specified — AFK agent can pick up         |
| `ready-for-human` | `approved-enhancement` / `approved-feature` | Enhancement/feature approved by maintainer — human codes it |
| `wontfix`         | `wontfix`                | Will not be actioned                                           |

## Notes on this repo's label model

- `confirmed` is the AFK-agent-ready signal for **bugs**. It means "verified to exist and reproducible."
- For **enhancements** and **features**, maintainer approval is `approved-enhancement` / `approved-feature` respectively. A contributor (human or agent) may not write code until one of these is applied.
- There is no separate "ready-for-human" vs "ready-for-agent" distinction for enhancements — both flow through the same `approved-*` labels. If the work requires human judgment (design decisions, external access), note it in the issue body.
- `needs-triage` is removed when any other state label is applied.
- `needs-reproduction` is used instead of the generic `needs-info` — be specific in triage comments about what reproduction steps or information are missing.
