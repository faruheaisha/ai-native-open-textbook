---
title: "Better Harness（QoderAI）"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adrs/developer-experience-system.md"
sourceRel: "docs/adrs/developer-experience-system.md"
rawUrl: "/raw/09-harness/better-harness/docs/adrs/developer-experience-system.md"
sourceSha256: "9b9c3c71dc8a49c147885497857e99bfe5eae866c09b264ca76e9decb808950f"
pageSha256: "cc4ddccfd182a43c62215b044d76a202a8b868d73cbc81e892bb1d7cd5f08323"
contentMode: "local-full"
zh: ""
---

## Consequences

### Positive

- A public experience claim becomes traceable from journey through declaration,
  test, evidence, projection, and gate.
- Host, CLI, documentation, issue, support, and release surfaces stop depending
  on manually synchronized lists.
- New hosts can land honest partial slices without overclaiming full support.
- Humans and agents can discover options, outputs, side effects, errors, and
  recovery without reading implementation source.
- Maintainers can distinguish deterministic, package, native, installed,
  deployed, and release evidence.
- Privacy and support become first-use architecture rather than troubleshooting
  footnotes.
- DX improvements can be evaluated by task outcomes and evidence freshness.

### Negative and Operational Cost

- Structured declarations, schemas, compatibility policy, validators, and dual
  migrations add short-term work.
- Native evidence has recurring execution, isolation, redaction, freshness, and
  triage cost.
- Projection tooling can introduce review noise while existing copies are being
  migrated.
- Maintainers must own demotion and rollback behavior, not only successful
  promotion.
- Journey measurement requires careful denominator and privacy definitions.
- Supporting curated prose beside projected facts requires explicit boundaries
  and tests.
