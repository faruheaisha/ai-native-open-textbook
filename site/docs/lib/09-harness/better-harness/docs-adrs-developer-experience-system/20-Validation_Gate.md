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
pageSha256: "3bc87b9781998cefdfc188f5c34bd3ff2fda99dae5f5679a7093d5d4605bc577"
contentMode: "local-full"
zh: ""
---

## Validation Gate

Before this ADR changes from Proposed to Accepted:

1. Run at least two independent read-only reviewers against this exact artifact
   using materially identical prompts and the `complexity`, `convenience`, and
   `evolution` dimensions.
2. Normalize their P1, P2, and P3 findings. Resolve every supported P1 or P2 in
   the owning section and repeat the review until all successful reviewers set
   `p1_p2_clear` to true. Record timeout, unavailable-command, or parse evidence
   for attempted reviewers that cannot participate.
3. Store structured review output under ignored `.harness/state/` or attach the
   same structured evidence to the review surface.
4. Regenerate the required documentation graph, run the focused documentation
   and package-boundary checks, and run `git diff --check`.
5. Perform a Change Traceability Review Readiness Check over the final local or
   staged diff, including the matching spec, acceptance ids, changed owners,
   generated files, tests, risk, AI marker, and staged/unstaged split.
6. Obtain an explicit maintainer acceptance decision. Passing automated or AI
   review alone does not change decision status.
