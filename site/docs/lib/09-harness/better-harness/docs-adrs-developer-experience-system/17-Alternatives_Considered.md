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
pageSha256: "cae99ea8a6a8b9a4961153d175e68af9b8b9179f00ed9c53647c15580b17d17f"
contentMode: "local-full"
zh: ""
---

## Alternatives Considered

| Alternative | Decision | Reason |
| --- | --- | --- |
| One central `dx.yaml` owns every product fact | Rejected | It becomes a god registry, duplicates capability semantics, and encourages wrong edits |
| Continue using prose and tests as manually synchronized truth | Rejected | Tests can validate a consistent but stale set of copies and cannot drive every machine surface safely |
| Generate all documentation and translations | Rejected | It removes author ownership, weakens explanation quality, and makes deterministic tools compose reader-facing judgment |
| Infer support only at runtime | Rejected | Runtime discovery is environment-specific, cannot prove release state, and cannot distinguish unavailable evidence from unsupported behavior |
| Mark a host verified after deterministic fixture CI | Rejected | Fixture evidence cannot prove native installation, discovery, invocation, output, or desktop behavior |
| Normalize every host to one lowest-common-denominator interface | Rejected | It hides real capability differences and makes partial support dishonest |
| Use default remote telemetry to find DX friction | Rejected | It conflicts with local source and session privacy and is unnecessary for the first improvement stages |
| Keep manual arbitrary-ref publishing | Rejected | It cannot establish source, version, evidence, or release ancestry reliably |
| Federated declarations, deterministic projections, and typed receipts | Accepted | It preserves capability ownership while making cross-surface truth and evidence verifiable |
