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
pageSha256: "52b0b84c676a4b5a303ae5a2ff544738cc898c19a72e30de476da150c39d682b"
contentMode: "local-full"
zh: ""
---

## Decision Drivers

- A developer should complete a task without reconstructing hidden product
  boundaries from source code.
- Humans, agents, CI, documentation, and support surfaces should project the
  same structured facts.
- The capability that implements behavior must continue to own its semantics.
- Human explanations and translations must retain an identifiable author and
  must not be overwritten by deterministic generators.
- Fixture, package, native-host, installed-application, browser, deployed-site,
  and release evidence must remain distinguishable.
- Failure, partial success, empty results, unsupported scope, missing authority,
  and unobserved state must not collapse into one value.
- Default operation must remain local-first, privacy-preserving, read-bounded,
  and cross-platform.
- Adoption must be incremental, reversible, and useful before every target
  component exists.
- Public support and release claims must become weaker automatically when their
  required evidence is absent or stale.
- DX improvement must be measured through task completion and recovery, not
  artifact counts or a single vanity score.
