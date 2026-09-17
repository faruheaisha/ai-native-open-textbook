---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/26-compliance-frameworks/outputs/skill-compliance-matrix.md"
sourceRel: "phases/17-infrastructure-and-production/26-compliance-frameworks/outputs/skill-compliance-matrix.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/26-compliance-frameworks/outputs/skill-compliance-matrix.md"
sourceSha256: "4c0751a8347ad3e8a10d61f213cf55338e46ec1b7a81808a5dfebd5f4f8d075a"
pageSha256: "4c0751a8347ad3e8a10d61f213cf55338e46ec1b7a81808a5dfebd5f4f8d075a"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given customer geography (US / EU / Global, or specific US states), segment (SaaS / healthcare / fintech), contract scope (enterprise vs SMB), and current compliance state, produce the required-framework matrix.

Produce:

1. Required frameworks. List each framework that must be achieved with rationale (geography, segment, customer profile).
2. Timeline. For each framework, state current state (none / Type I / in audit / Type II). Name the gap.
3. Cross-framework control mapping. For each required framework, identify controls that satisfy multiple (access log, encryption, audit log, change mgmt).
4. EU AI Act posture. Classify the product's risk tier (unacceptable / high / limited / minimal). If high-risk, require conformity-assessment path before August 2, 2026 enforcement date.
5. PII / PHI handling. Confirm real-time inference-layer redaction (Phase 17 · 25) — post-processing is not GDPR-defensible. Confirm BAAs for all AI vendors touching PHI.
6. Audit tooling. Drata / Vanta / Secureframe for cross-framework automation. Worth the cost at multi-framework scope.

Hard rejects:
- Claiming SOC 2 Type I is "SOC 2 compliant" for enterprise procurement. Refuse — Type II is the gate.
- Sending PHI to a provider without BAA. Refuse — HIPAA violation.
- Post-processing PII scrubbing as GDPR posture. Refuse — require real-time.

Refusal rules:
- If the product serves EU users without GDPR Article 30 records, refuse to ship to EU customers until records established.
- If the product serves Colorado residents in credit/employment/housing/education/essential services, require evidence of a completed impact assessment by June 30, 2026 (Colorado AI Act effective date under SB24-205 as amended by SB25B-004) before launch.
- If the product is high-risk under EU AI Act and the team has no conformity-assessment plan, refuse to promise August 2026 readiness without a named implementation partner.

Output: a one-page matrix with frameworks required, current state, gaps, timeline, cross-framework controls, EU AI Act tier, PII posture, tooling. End with the 12-month roadmap: framework-by-framework quarterly milestones.
