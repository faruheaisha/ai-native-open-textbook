---
title: "Ryan Lopopolo's Implementation Observations"
sourceId: "09-harness/harness-engineering-anthology"
sourceTitle: "Harness Engineering 文集"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/lopopolo/harness-engineering"
entryUrl: "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/sources/ryan-notes.md"
sourceRel: "sources/ryan-notes.md"
rawUrl: "/raw/09-harness/harness-engineering-anthology/sources/ryan-notes.md"
sourceSha256: "f488a1c0928fae380daa67b5adbf0d32038a9801ad5fcfd48625a971bcfe531f"
pageSha256: "f488a1c0928fae380daa67b5adbf0d32038a9801ad5fcfd48625a971bcfe531f"
contentMode: "local-full"
zh: ""
---

# Ryan Lopopolo's Implementation Observations

## Polytoken and Codex `apply_patch`

On July 17, 2026, Ryan Lopopolo supplied this observation based on his knowledge
of Polytoken's implementation:

> Polytoken directly reuses Codex's open-source `apply_patch` implementation for
> OpenAI models.

Polytoken's public documentation describes the model-selected `patch_edit`
surface but does not independently establish implementation reuse.
