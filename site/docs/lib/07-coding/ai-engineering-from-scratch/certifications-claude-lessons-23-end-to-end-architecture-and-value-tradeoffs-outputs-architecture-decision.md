---
title: "ADR: Contract Review Pattern"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/23-end-to-end-architecture-and-value-tradeoffs/outputs/architecture-decision.md"
sourceRel: "certifications/claude/lessons/23-end-to-end-architecture-and-value-tradeoffs/outputs/architecture-decision.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/certifications/claude/lessons/23-end-to-end-architecture-and-value-tradeoffs/outputs/architecture-decision.md"
sourceSha256: "8d87c49affceb2ce116b352d97506d0bbe1f2998438118de9b2e3bf3185bbf17"
pageSha256: "8d87c49affceb2ce116b352d97506d0bbe1f2998438118de9b2e3bf3185bbf17"
contentMode: "local-full"
zh: ""
---

# ADR: Contract Review Pattern

## Decision

Select a deterministic workflow: intake, segmentation, versioned retrieval,
analysis, independent evidence review, redline generation, and counsel approval.
Owner: legal technology architecture.

## Candidate Scores

The augmented call is fastest but loses failure isolation. The workflow leads on
safety, auditability, and predictable latency. The adaptive agent leads only on
unmodeled branching. Multi-agent review adds independence but not write authority.

## Hard Gates

Authorization, tenant isolation, source provenance, and safety cannot be averaged
against convenience. Any unsupported material conclusion blocks the candidate.

## Failure Paths

Retrieval timeout returns partial evidence and no redline. Policy conflict routes
to counsel. Invalid schema receives one targeted repair. Tool outage uses the
manual review queue. Rollback restores the prior index and workflow version.

## Rejected Alternatives

Reject one giant augmented call because responsibilities and evidence collapse.
Reject an adaptive execution agent because the process is known and actions
require human authority.

## Reversal Condition

Reconsider the workflow if more than 20 percent of accepted cases require safe,
unmodeled evidence discovery and an evaluated agent improves success without
breaking cost, latency, or hard gates. The architecture owner approves reversal.
