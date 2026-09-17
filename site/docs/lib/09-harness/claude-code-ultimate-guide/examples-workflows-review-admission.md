---
title: "Review admission policy worksheet"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/workflows/review-admission.md"
sourceRel: "examples/workflows/review-admission.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/workflows/review-admission.md"
sourceSha256: "42a5917dfff5a60f80a404d3420b5ba10e6d6c1c20b962b1dcd8cb0ad994f552"
pageSha256: "42a5917dfff5a60f80a404d3420b5ba10e6d6c1c20b962b1dcd8cb0ad994f552"
contentMode: "local-full"
zh: ""
---

# Review admission policy worksheet

This is a proposed policy worksheet, not an installed scheduler or a validated throughput improvement. Apply it to one service and a comparable class of changes.

| Field | Team decision |
|---|---|
| Queue and accountable owner | |
| Eligible change class and excluded work | |
| Baseline observation window | |
| Arrival event | First declaration of readiness at a stated revision |
| Acceptance event | Acceptance by the required policy at that revision |
| Queued work and reserved slots | Count unique changes; track in-flight authors separately |
| Age measure and owner-approved limit | |
| Pause rule | Pause new authoring when the queue or age limit is reached, capacity is unavailable, or telemetry is stale |
| Resume rule | Use a lower queue threshold, acceptable age, fresh telemetry, and available verification capacity |
| Work allowed during pause | Existing review, agreed corrections, incident response within existing authority |
| Urgent exception | Named approver, reason, bounded scope, displaced work, expiry |

Reserve a verification slot atomically before dispatching new authoring; release or convert it exactly once when the task changes state. A canceled task does not count as an accepted change. Corrections remain attached to their original change. A new revision invalidates affected acceptance evidence.

## Tabletop exercise

The following numbers are synthetic policy inputs, not recommended team limits. Assume a queue limit of three occupied/reserved slots, resume at one or fewer, a chosen age limit, and fresh telemetry.

| State or event | Expected decision |
|---|---|
| Two occupied slots; two authors request admission together | Reserve one slot, admit one author, queue the other; never overbook |
| Three occupied slots; existing reviewer completes a check | Allow the review to finish; do not cancel it because authoring is paused |
| Two slots after acceptance | Stay paused until the resume condition is met |
| One slot but its oldest change exceeds the age limit | Stay paused; resolve the aging change |
| One slot, acceptable age, fresh telemetry, reviewer available | Resume admission under the reservation rule |
| Queue data unavailable or reviewer unavailable | Pause new authoring; retain records and route the blocker to the owner |
| Urgent request without named exception approval | Keep queued |

Record observed decisions when exercising an implementation. Until then, these are expected outcomes only. Track accepted changes, escaped defects and human effort alongside queue size so that faster approvals do not masquerade as improvement.
