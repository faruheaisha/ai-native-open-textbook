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
pageSha256: "85da55e048f0b25a432145ccf573a48de6c5d945d1c7bf363d7cb16c1dc0c05b"
contentMode: "local-full"
zh: ""
---

## Terms

| Term | Meaning |
| --- | --- |
| Journey | A bounded user or contributor task with a declared start, completion condition, recovery route, evidence source, and owner |
| Experience surface | A user-visible or machine-visible interface such as documentation, CLI, Skill, host shell, Preview, issue form, package, or release |
| Declaration | Structured facts owned by the capability responsible for their meaning |
| DX catalog | A read-only index of declaration locations and versions; it references owners and does not copy their judgment |
| Projection | A deterministic structured representation derived from declarations, such as help, schema, a support table, or an issue-form option list |
| Curated prose | Human-authored explanation, examples, recovery judgment, and translation |
| Evidence receipt | A bounded, sanitized record that states what was observed, where, when, against which revision, and what remained unobserved |
| Promotion | A change to a public support or release state after its required contract and evidence gates pass |
| Freshness | The validity window declared by an evidence policy and recorded explicitly in a receipt |
| Drift | A difference between a canonical declaration and a checked public projection or claim |
| Unobserved | Evidence was not collected or was not applicable; it is neither success, failure, nor numeric zero |
