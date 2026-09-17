---
title: "Governance Control Packet: Patient Message Routing"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/27-enterprise-governance-compliance-and-hitl/outputs/governance-control-packet.md"
sourceRel: "certifications/claude/lessons/27-enterprise-governance-compliance-and-hitl/outputs/governance-control-packet.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/certifications/claude/lessons/27-enterprise-governance-compliance-and-hitl/outputs/governance-control-packet.md"
sourceSha256: "f51a95ae518280bb2ab6e914a58e41d7086c91dcae6e365c1c682ba751e263de"
pageSha256: "f51a95ae518280bb2ab6e914a58e41d7086c91dcae6e365c1c682ba751e263de"
contentMode: "local-full"
zh: ""
---

# Governance Control Packet: Patient Message Routing

## Risk Register

Urgent-message false negatives can delay care; prompt injection can alter
routing; stale clinical guidance can mislead review; reviewer overload can turn
approval into rubber-stamping. Each risk has a domain owner and residual-risk
decision.

## Data Map

Only message text, case ID, language, and minimum routing context cross the
application boundary. Patient identity remains in the clinical system of record.
Payload, trace, evaluation, review, retention, deletion, and region boundaries
are named separately.

## Control Matrix

Preventive: tenant and role gate before retrieval. Detective: urgent-case
false-negative monitor. Corrective: disable automated routing and restore manual
triage. Governance: privacy and clinical owners reapprove after material change.

## Human Review

Every urgent, conflicting, weak-evidence, or new-language case receives qualified
clinical review. The packet includes sources, proposed category, flags, and
trajectory. Queue SLO is five minutes with staffed capacity and reason-coded
approve, edit, reject, and escalate outcomes.

## Fallback

If review misses the queue SLO or source freshness fails, fallback sends the case
to the existing manual urgent-triage queue and blocks any automated record change.

## Reassessment

Material change to use, population, model, data, authority, region, policy,
scale, or observed harm triggers a new review. This packet does not claim legal
or clinical compliance on behalf of authorized owners.
