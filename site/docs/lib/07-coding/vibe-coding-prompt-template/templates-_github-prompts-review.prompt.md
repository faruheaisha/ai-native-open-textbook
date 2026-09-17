---
title: "Review Prompt"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/.github/prompts/review.prompt.md"
sourceRel: "templates/.github/prompts/review.prompt.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/.github/prompts/review.prompt.md"
sourceSha256: "706b364d94a5e5dec5f418411b5711f335e4f2e39a8e7cc2a18b6f91cfedb7e3"
pageSha256: "706b364d94a5e5dec5f418411b5711f335e4f2e39a8e7cc2a18b6f91cfedb7e3"
contentMode: "local-full"
zh: ""
---

# Review Prompt

Review the current diff against `AGENTS.md`, `agent_docs/`, and `REVIEW-CHECKLIST.md`.

Prioritize:

- Bugs, regressions, security issues, data leaks, and missing tests.
- Architecture drift from `agent_docs/tech_stack.md` and `agent_docs/code_patterns.md`.
- AI/tool permission issues, prompt-injection risks, missing evals, and unsafe logs.

Return findings first with file/line references. If no findings, say that clearly and list residual test gaps.
