---
title: "Review Checklist"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/REVIEW-CHECKLIST.md"
sourceRel: "templates/REVIEW-CHECKLIST.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/REVIEW-CHECKLIST.md"
sourceSha256: "4d1f8309c8d00ce5b562e117b8790c2f5a34de7318fa2c48e891de33c023e879"
pageSha256: "4d1f8309c8d00ce5b562e117b8790c2f5a34de7318fa2c48e891de33c023e879"
contentMode: "local-full"
zh: ""
---

# Review Checklist

Do not mark work complete until the relevant checks pass.

## Basic Checks

- [ ] Diff is focused on the requested task.
- [ ] No unrelated files were rewritten.
- [ ] No secrets, tokens, private logs, or production exports were exposed.
- [ ] Protected areas were not changed without approval.
- [ ] Tests/typecheck/build passed or failures are explained.
- [ ] UI changes were checked in a browser/device when applicable.

## Security

- [ ] Dependencies audited (`npm audit` or equivalent) — no unaddressed high-severity findings.
- [ ] All user input is validated and sanitized at the boundary (forms, API payloads, URL params).
- [ ] Auth-protected routes and actions were tested while logged out.
- [ ] Rate limiting (or equivalent abuse protection) considered for public endpoints.

## AI Checks

Use only if AI, MCP, tool calls, RAG, local models, or builders are involved.

- [ ] Model-visible data is documented.
- [ ] Retrieved docs/web/issues/uploads/tool output are treated as untrusted data.
- [ ] Risky actions require approval.
- [ ] Direct, bad/indirect, auth-required, failure, and tool/action checks passed.
- [ ] Logs/traces do not expose secrets or customer data.
- [ ] Provider retention/training settings were checked before launch.
- [ ] Builder output passed export, local build, secrets, auth/RLS, and rollback review.

## Final Evidence

The final response should include:

- Files changed
- Commands run
- Test/build/browser results
- AI/tool eval results, if applicable
- Remaining risks
