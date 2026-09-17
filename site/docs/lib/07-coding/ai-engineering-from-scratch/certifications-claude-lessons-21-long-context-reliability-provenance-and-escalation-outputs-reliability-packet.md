---
title: "Reliability Packet: Repository Security Review"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/21-long-context-reliability-provenance-and-escalation/outputs/reliability-packet.md"
sourceRel: "certifications/claude/lessons/21-long-context-reliability-provenance-and-escalation/outputs/reliability-packet.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/certifications/claude/lessons/21-long-context-reliability-provenance-and-escalation/outputs/reliability-packet.md"
sourceSha256: "8cfa0b329c82f2487cfd79c8034f6c182848defae34a0fb1d3d20736ecb5fbb6"
pageSha256: "8cfa0b329c82f2487cfd79c8034f6c182848defae34a0fb1d3d20736ecb5fbb6"
contentMode: "local-full"
zh: ""
---

# Reliability Packet: Repository Security Review

## Scope and Coverage

The manifest requires 24 files. The first pass reviewed 18 of 24; six omitted
files remain named under `services/payments/**`. Two valid findings are retained.

## Provenance Envelope

Evidence `policy-auth-017` carries repository URI, source version `3a91c7e`,
effective date, authority, Markdown content type, heading and line location,
extractor version, and observed time.

## Partial Result

State is partial, not complete. A retryable dependency timeout names the six
unreviewed files, trace `8801`, two finding IDs, and full artifact reference.

## Conflict

Two approved policies disagree about token rotation. Both versions and exact
spans remain visible; no precedence rule is invented.

## Escalation

Security architecture is the owner. The safe next action is to stop rollout,
resolve precedence, then review only the named coverage gap.

## Human Review

Review every severe finding, partial result, and policy conflict, plus a random sample
of ordinary passes. Record disposition and correction reason.
