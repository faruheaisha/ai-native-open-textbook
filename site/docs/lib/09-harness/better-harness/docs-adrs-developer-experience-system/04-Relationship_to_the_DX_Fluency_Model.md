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
pageSha256: "44089dfc26896b8b48f10bd11b49b0d065bf1253670872c21519693ef6b457cb"
contentMode: "local-full"
zh: ""
---

## Relationship to the DX Fluency Model

This decision uses the external DX Fluency Model cited in the related spec as a
diagnostic lens. Its five pillars apply to every journey:

1. documentation experience;
2. error presentation;
3. usability;
4. interaction design;
5. touchpoints and support.

The model's Awareness, Focus, Execution, Optimization, and Reinforcement stages
describe organizational maturity. They are not release scores, command exit
codes, or report thresholds.

This ADR governs Better Harness's own developer experience. It is separate from
the repository's [Software Fluency model](https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/models/software-fluency.md),
which is a runtime analysis lens for reviewed repositories. Adding a new model
to report routing would require a separate spec, fixtures, model registration,
and report-contract tests.
