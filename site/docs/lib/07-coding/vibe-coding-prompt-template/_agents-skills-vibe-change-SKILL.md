---
title: "Vibe Change"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/.agents/skills/vibe-change/SKILL.md"
sourceRel: ".agents/skills/vibe-change/SKILL.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/.agents/skills/vibe-change/SKILL.md"
sourceSha256: "5b339a16dc24e7e75cd1a6beae6ffb680827079bb94cc63ccf0afa7dda205d8a"
pageSha256: "5b339a16dc24e7e75cd1a6beae6ffb680827079bb94cc63ccf0afa7dda205d8a"
contentMode: "local-full"
zh: ""
---

# Vibe Change

Inspect the affected source, applicable repository instructions, current diff, and relevant checks. Consult product documents when scope or acceptance criteria are unclear. Confirm only missing acceptance criteria, constraints, and scope. An absent PRD or AGENTS.md does not require starting research again.

Establish the relevant baseline with checks appropriate to the change; use an existing user journey when behavior is affected. Preserve current work; record a real recovery checkpoint for risky changes. Identify the smallest affected area and implement one feature without unrelated rewrites. Add regression checks where they demonstrate behavior, and rerun the affected checks.

Use `../vibe-verify/SKILL.md` for the changed journey and relevant existing behavior. Update product decisions only where requirements changed, and progress in MEMORY.md. Report Changed, Checked, Not checked, Next decision, Recovery. Escalate to deeper planning only for an actual architecture, security, cost, or data-migration decision.
