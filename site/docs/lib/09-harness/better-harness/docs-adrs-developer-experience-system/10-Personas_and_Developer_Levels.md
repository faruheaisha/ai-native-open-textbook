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
pageSha256: "2ff5b58fa5b3c00b9bdcc691e1484b2af8f367a9e7924c0daee2d5a0cb69d950"
contentMode: "local-full"
zh: ""
---

## Personas and Developer Levels

The system uses persona names instead of assuming that one numeric skill level
applies to every task. A maintainer can still be a first-time operator for a new
host.

| Persona | Primary question | Required system response |
| --- | --- | --- |
| Evaluator | Is this product applicable, supported, and safe for my environment? | Honest product routes, support slices, prerequisites, sample boundary, and data-use summary |
| Operator | Can I install, verify, run, recover, update, and remove it? | One complete host-native journey with expected output and safe recovery |
| First-time contributor | Can I move from clone to a reviewable green change? | Small owner routes, focused checks, docs path, Preview path, and PR evidence guidance |
| Experienced contributor | Can I change a capability without reading unrelated internals? | Public module boundaries, typed command contracts, fixtures, and fast feedback |
| Adapter author | Can I add one host slice without overclaiming the others? | Federated host declarations, scaffold/conformance routes, native evidence, and promotion rules |
| Maintainer and releaser | Can I prove what is safe to merge, publish, and roll back? | Required gates, evidence freshness, release plan, protected apply, and post-publish verification |
| Support and security responder | Can I diagnose a problem without collecting secrets or raw sessions? | Bounded diagnostic plan, redaction, explicit persistence or upload, support lifecycle, and private disclosure |
