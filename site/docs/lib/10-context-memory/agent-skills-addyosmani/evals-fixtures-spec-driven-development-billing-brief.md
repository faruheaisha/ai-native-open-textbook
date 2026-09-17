---
title: "Usage-based billing brief"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/spec-driven-development/billing-brief.md"
sourceRel: "evals/fixtures/spec-driven-development/billing-brief.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/spec-driven-development/billing-brief.md"
sourceSha256: "097d44d7ea2cfe9d93257b2d9052e89b5c993c1775d3d2232ae43445a218740f"
pageSha256: "097d44d7ea2cfe9d93257b2d9052e89b5c993c1775d3d2232ae43445a218740f"
contentMode: "local-full"
zh: ""
---

# Usage-based billing brief

The product currently charges one flat monthly price. Leadership wants usage-
based billing next quarter, but “usage” has not been defined. Candidate meters
include API requests, processed records, and successful jobs.

Known constraints:

- Existing customers need a migration path.
- Billing events must be auditable and idempotent.
- Late-arriving events occur for up to seven days.
- Finance requires invoice reconciliation.

Unknowns include pricing tiers, free allowances, meter ownership, correction
rules, customer-facing usage visibility, and regional tax behavior. Produce a
spec and surface these decisions; do not implement them by assumption.
