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
pageSha256: "376d009d6daf265a8ba3e5dba754d461756e2a8dbd5c7c84b850872716dcba0c"
contentMode: "local-full"
zh: ""
---

## Risks and Mitigations

- **Control-plane monolith:** The catalog may accumulate business logic.
  Mitigation: permit only discovery, schema validation, comparison, and
  projection; capability contracts remain public owners.
- **Schema-first overdesign:** Target schemas may be created without consumers.
  Mitigation: require two visible consumers, representative fixtures, and a
  dated implementation spec.
- **Evidence theater:** Receipts may exist without proving the advertised
  journey. Mitigation: bind receipts to journey steps and support slices, retain
  unobserved fields, and reject evidence-class substitution.
- **Native-host flakiness:** Closed-source hosts and UI automation can be
  unstable. Mitigation: isolate homes, bound time, retain failure codes, begin
  advisory, and block only the affected promotion or release claim.
- **Privacy leakage:** Diagnostics or receipts can expose credentials, source,
  sessions, or user paths. Mitigation: allowlisted fields, credential-shaped
  fixtures, value-level redaction, local retention, and explicit external apply.
- **Generated-content erosion:** Projections can overwrite useful prose.
  Mitigation: generate structured facts only and keep curated regions outside
  generator ownership.
- **Goodhart effects:** Teams may optimize timings while degrading quality or
  privacy. Mitigation: keep journey definitions and failure rates beside time,
  inspect samples, and use qualitative pillar review.
- **Blocking-gate overload:** Too many gates can make ordinary changes slow.
  Mitigation: use changed-scope routing, progressive contributor levels,
  advisory-first rollout, and claim-specific rather than global native gates.
- **Compatibility drag:** Aliases and dual-run surfaces can persist forever.
  Mitigation: declare removal gates and review them at each release.
- **Status drift in this ADR:** Proposed targets may be read as implemented.
  Mitigation: preserve current/target labels, record implementation specs in the
  ADR index, and revise status only from visible evidence.
