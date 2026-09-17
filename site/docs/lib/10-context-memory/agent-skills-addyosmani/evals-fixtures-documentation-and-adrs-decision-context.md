---
title: "Orders architecture decision context"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/documentation-and-adrs/decision-context.md"
sourceRel: "evals/fixtures/documentation-and-adrs/decision-context.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/documentation-and-adrs/decision-context.md"
sourceSha256: "d7c35e0ff7c16b0716076df5513d18fe3569c0ea32d5756295ae0d47c8ec6de2"
pageSha256: "d7c35e0ff7c16b0716076df5513d18fe3569c0ea32d5756295ae0d47c8ec6de2"
contentMode: "local-full"
zh: ""
---

# Orders architecture decision context

The orders service currently stores mutable order rows and emits best-effort
webhooks. Auditors need a complete history of state transitions, and support
must be able to reconstruct an order at a prior point in time.

Options discussed:

1. Keep the current model and add an append-only audit table.
2. Adopt event sourcing for orders and build read projections.
3. Use database change-data capture as the audit history.

Event sourcing improves traceability and replay, but adds projection rebuilds,
event versioning, eventual consistency, and operational complexity. The team
has event-stream experience, but the reporting service expects synchronous
reads. The decision applies only to the orders bounded context.
