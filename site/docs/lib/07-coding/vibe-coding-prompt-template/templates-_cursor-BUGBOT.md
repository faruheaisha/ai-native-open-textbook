---
title: "Cursor Bugbot Review Instructions"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/.cursor/BUGBOT.md"
sourceRel: "templates/.cursor/BUGBOT.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/.cursor/BUGBOT.md"
sourceSha256: "4a8a51c4f67a1fb876fa51a93c0466c15afedfd4287c57a1ed20ed1c3f782a49"
pageSha256: "4a8a51c4f67a1fb876fa51a93c0466c15afedfd4287c57a1ed20ed1c3f782a49"
contentMode: "local-full"
zh: ""
---

# Cursor Bugbot Review Instructions

Last generated: [YYYY-MM-DD]

Use `AGENTS.md`, `agent_docs/`, and `REVIEW-CHECKLIST.md` as the review contract.

Focus on:

- Functional regressions and missing tests.
- Security issues around auth, secrets, billing, infrastructure, migrations, and production data.
- AI/tool issues: prompt injection, overbroad permissions, unsafe logs, missing evals, and destructive actions without confirmation.
- Third-party API claims that need current official docs.

Treat findings as advisory until the human or lead agent verifies them with tests and source docs.
