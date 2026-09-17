---
title: "Build a new-project slice"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/.agents/skills/vibe-build/SKILL.md"
sourceRel: ".agents/skills/vibe-build/SKILL.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/.agents/skills/vibe-build/SKILL.md"
sourceSha256: "483f14d69f9795ab0486fd529a014eb8316a3a8d7839a47cfcb12a2e761da946"
pageSha256: "483f14d69f9795ab0486fd529a014eb8316a3a8d7839a47cfcb12a2e761da946"
contentMode: "local-full"
zh: ""
---

# Build a new-project slice

Establish the requested outcome and acceptance criteria from the user's brief
and relevant project decisions. Read applicable repository instructions and
only the documents needed for this slice. An absent or stale MEMORY.md does
not require rebuilding the whole planning workflow.

Implement the intended behavior using the chosen stack. Preserve unrelated
work and make a recovery checkpoint when the change warrants it. Add accounts,
databases, infrastructure, paid services, and AI only when requirements justify
them. Continue until the requested slice works, not merely until files exist.

Use the project's affected checks and exercise the relevant user journey when
runtime access permits it. Fix failures caused by the change, distinguish
pre-existing failures, and reuse results that remain valid. A setup validator
or passing build alone is not evidence of interactive behavior.

Update project progress when the repository maintains it. Report the outcome,
actual checks, unverified behavior, and any concrete blocker or recovery note.
External sends, production changes, store submission, and deployment remain
subject to authorization for their specific effect and target.
