---
title: "Intent correlation claim contract"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/skills/intent-correlation-analysis/references/claim-contract.md"
sourceRel: "skills/intent-correlation-analysis/references/claim-contract.md"
rawUrl: "/raw/09-harness/better-harness/skills/intent-correlation-analysis/references/claim-contract.md"
sourceSha256: "e7409ecfcd9b312d926084df98d66c397b67da1934d43bece64d69044990685b"
pageSha256: "e7409ecfcd9b312d926084df98d66c397b67da1934d43bece64d69044990685b"
contentMode: "local-full"
zh: ""
---

# Intent correlation claim contract

Use this contract to reason over a privacy-safe evidence packet without
promoting model interpretation to source truth.

## Evidence packet

`IntentCorrelationPacketV1` has these top-level fields:

```json
{
  "kind": "IntentCorrelationPacketV1",
  "schemaVersion": 1,
  "packetDigest": "sha256:<canonical digest>",
  "workspace": { "label": "repository label" },
  "inputs": [],
  "executionSlices": [],
  "files": [],
  "changeUnits": [],
  "commits": [],
  "artifacts": [],
  "validations": [],
  "observedEdges": [],
  "allowedRefs": [],
  "limitations": []
}
```

All `FileEvidence` paths are repository-relative and all usable evidence is named in
`allowedRefs`. An `ExecutionSlice` begins with one retained user input and ends
before the next retained input in that Session. A `ChangeUnit` is either a
verified `content-changed` hunk/blob delta or an unverified `edit-targeted` tool
target. These states are not interchangeable.

Observed edges may use `contains`, `read`, `edit-targeted`, `content-changed`,
`included-in`, `produced`, `validated-by`, or `correlated-with`. Their strength
is `direct`, `observed`, or `correlated`; an analysis cannot claim stronger
support than its cited evidence. A claim must cite its subject directly or cite
an observed edge whose subject, object, or evidence refs name that subject.

## Analysis output

Return one JSON object:

```json
{
  "kind": "IntentCorrelationAnalysisV1",
  "schemaVersion": 1,
  "packetDigest": "sha256:<copied from packet>",
  "intentProposals": [
    {
