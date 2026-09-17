---
title: "Customer portal — product brief"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/spec-driven-development-decomposition/portal-brief.md"
sourceRel: "evals/fixtures/spec-driven-development-decomposition/portal-brief.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/spec-driven-development-decomposition/portal-brief.md"
sourceSha256: "8c4a441acbd9c1826d2a67f8413e5bff4c57c29c525a0ae6cddf25b596e95de9"
pageSha256: "8c4a441acbd9c1826d2a67f8413e5bff4c57c29c525a0ae6cddf25b596e95de9"
contentMode: "local-full"
zh: ""
---

# Customer portal — product brief

Leadership wants a self-serve customer portal shipped as one initiative. The
request, as handed down:

- Customers sign in with email/password or company SSO and manage their
  account and team members.
- Customers pick a plan, enter payment details, and receive monthly invoices;
  plan changes prorate.
- Customers get email notifications for invoices, payment failures, and team
  invitations; enterprise customers can register webhooks for the same events.
- Admins see a usage dashboard: seats, API calls, and spend per month.

Constraints gathered so far:

- Billing must know who the customer is, so it depends on account data.
- Notifications fire on billing and account events.
- The dashboard reads from billing and notification delivery records.
- The four areas have different reviewers: platform owns accounts, finance
  owns billing, and growth owns notifications and the dashboard.
- Each area should be shippable and verifiable on its own; finance wants to
  sign off on billing without waiting for the dashboard.
