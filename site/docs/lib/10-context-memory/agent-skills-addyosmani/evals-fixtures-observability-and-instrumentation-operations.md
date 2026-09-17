---
title: "Payment retry operations"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/observability-and-instrumentation/operations.md"
sourceRel: "evals/fixtures/observability-and-instrumentation/operations.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/observability-and-instrumentation/operations.md"
sourceSha256: "37aa8678c2df2ac7c8c5836804003ba5429b955681968df75421fbb65c13ffa6"
pageSha256: "37aa8678c2df2ac7c8c5836804003ba5429b955681968df75421fbb65c13ffa6"
contentMode: "local-full"
zh: ""
---

# Payment retry operations

On-call must be able to answer:

- Are retries recovering transient gateway failures?
- Which gateway and failure class is driving exhaustion?
- Is one payment being charged more than once?
- Which customer-visible payments need intervention now?

Payment and attempt IDs are safe correlation identifiers. Card numbers,
customer email addresses, and raw gateway responses must never be logged.
