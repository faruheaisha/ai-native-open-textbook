---
title: "Report Source Review"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/skills/better-harness/references/report-source-review.md"
sourceRel: "skills/better-harness/references/report-source-review.md"
rawUrl: "/raw/09-harness/better-harness/skills/better-harness/references/report-source-review.md"
sourceSha256: "e0cc8bb688befea15d5fb94eb5f204856ceea4b4fd4673fc8de47bbc61332eb5"
pageSha256: "e0cc8bb688befea15d5fb94eb5f204856ceea4b4fd4673fc8de47bbc61332eb5"
contentMode: "local-full"
zh: ""
---

# Report Source Review

Use this maintainer route only when the task needs the deterministic Harness
report source to pass through a reviewable local decision boundary before
projection. It is not a substitute for the ordinary evidence-bundle and
renderer workflow.

Create the source, then freeze its bounded review packet and create-only
decision template:

```text
