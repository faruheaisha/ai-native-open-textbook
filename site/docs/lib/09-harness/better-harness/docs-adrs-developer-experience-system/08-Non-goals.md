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
pageSha256: "2129bce98d2ea84740c57682c407943b1547401e3034795f19fd6abf5a151cd0"
contentMode: "local-full"
zh: ""
---

## Non-goals

- Creating a new runtime maturity or report-scoring model.
- Building a generic `scripts/core/` or a central `dx.yaml` that owns all
  product behavior.
- Making every host expose the same native capabilities or hiding unsupported
  capability slices behind a lowest-common-denominator interface.
- Generating conceptual guidance, troubleshooting judgment, or translations
  from structured data.
- Treating synthetic CI as proof of native installation, host discovery, full
  report generation, desktop rendering, or deployed-site health.
- Enabling remote telemetry, uploading diagnostics, or sending support data by
  default.
- Implementing every target directory or command in the same change as this
  decision.
- Deleting compatibility commands, user configuration, reports, caches, or host
  state as part of a migration.
