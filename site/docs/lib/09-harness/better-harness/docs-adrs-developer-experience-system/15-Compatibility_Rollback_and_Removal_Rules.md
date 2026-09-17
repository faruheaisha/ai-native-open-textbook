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
pageSha256: "4c1da268187ed4384749449ad74d2997d52d2fc6ca4a880457c65ca375468ca9"
contentMode: "local-full"
zh: ""
---

## Compatibility, Rollback, and Removal Rules

- Every migration phase is independently revertible.
- Report-only validators may be disabled without changing runtime output.
- Generated projections do not replace hand-authored sources until parity and
  freshness gates pass.
- A command rename keeps a tested compatibility alias for its declared window;
  removal requires usage evidence, release notes, and a migration path.
- Schema changes follow explicit major-version compatibility. Readers reject an
  unsupported future major version with an actionable diagnostic.
- Native-smoke instability can demote the check from blocking to advisory; it
  cannot convert a failed receipt into a passing one.
- Support demotion preserves historical receipts and explains which evidence
  expired or failed.
- Rollback never deletes user reports, host configuration, sessions, or caches.
- Old owners are removed only after consumer search and parity evidence show no
  active dependency outside an intentional compatibility facade.
