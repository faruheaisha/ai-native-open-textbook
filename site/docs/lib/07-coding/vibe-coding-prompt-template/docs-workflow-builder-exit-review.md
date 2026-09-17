---
title: "Builder Exit Review"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/docs/workflow/builder-exit-review.md"
sourceRel: "docs/workflow/builder-exit-review.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/docs/workflow/builder-exit-review.md"
sourceSha256: "5bccae5bddd522c11e4b590eaca44414c5816b6e90876b3cf70bde18e13038c3"
pageSha256: "5bccae5bddd522c11e4b590eaca44414c5816b6e90876b3cf70bde18e13038c3"
contentMode: "local-full"
zh: ""
---

# Builder Exit Review

Last verified: 2026-05

Use this when: the project starts in v0, Lovable, Bolt, Replit Agent, Google AI Studio, Base44, Tempo, Builder.io, Framer, or another AI/no-code builder.

## Quick Answer

Builder output is useful for prototypes. Do not call it production-ready until the code can be exported, built locally, reviewed, and deployed from an owner-controlled repo.

## Checklist

- [ ] Source is owned by the project owner and can be cloned or exported.
- [ ] Local install, dev, test, typecheck, and build commands work.
- [ ] Secrets are not committed and live in the deployment owner account.
- [ ] Auth, RLS, storage rules, and public routes are reviewed.
- [ ] Database export or migration path is clear.
- [ ] Deployment owner, preview protection, domain, and rollback are clear.
- [ ] Vendor data retention/training settings are checked.
- [ ] Exit plan is written down.

## Example Prompt

```text
Audit this builder-generated project before production.

Return blockers first. Check source ownership, local build, secrets, auth/RLS,
database migration, deployment owner, rollback, dependency risk, and exit plan.
Do not rewrite the app during the audit.
```

## Links

- Tooling decision guide: `docs/tools/agent-tooling-compatibility.md`
- Review checklist: `templates/REVIEW-CHECKLIST.md`
