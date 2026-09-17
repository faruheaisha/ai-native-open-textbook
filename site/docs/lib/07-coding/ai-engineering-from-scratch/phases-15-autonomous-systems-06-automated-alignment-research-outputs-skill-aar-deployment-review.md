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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/15-autonomous-systems/06-automated-alignment-research/outputs/skill-aar-deployment-review.md"
sourceRel: "phases/15-autonomous-systems/06-automated-alignment-research/outputs/skill-aar-deployment-review.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/15-autonomous-systems/06-automated-alignment-research/outputs/skill-aar-deployment-review.md"
sourceSha256: "35d6aaae7ae4800c617cece433c5c2f75bf438d04a38e21d6f32de69edbe1a2f"
pageSha256: "35d6aaae7ae4800c617cece433c5c2f75bf438d04a38e21d6f32de69edbe1a2f"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a proposed Automated-Alignment-Research deployment (model, sandbox, task queue, forum), produce a pre-deployment review that a frontier-lab safety team would sign off on.

Produce:

1. **Sandbox isolation.** Verify filesystem, network, and process limits for each AAR instance. Confirm no AAR can read or modify another AAR's sandbox. Confirm no AAR can reach the forum storage's write endpoint directly (all posts go through a separate service).
2. **Forum log integrity.** The forum must be append-only and tamper-evident. Specify the storage (e.g. S3 with object lock, immutable ledger, append-only WAL). Specify the verification interval and the response if tampering is detected.
3. **Task allocation policy.** State how tasks are assigned: who writes them, who approves them, whether AARs can propose their own follow-up tasks, and under what conditions. Free decomposition wins on performance; prescribed workflow wins on auditability. Document the tradeoff explicitly.
4. **Human review gate.** Before any AAR output influences real research direction, training data, or published work, a named human reviewer must sign off. Specify the review checklist: experiment reproducibility, log completeness, claim-to-evidence mapping.
5. **Threshold monitoring.** Track signals that the AAR system approaches RSP v3.0 AI R&D-4 territory: task complexity delta, autonomous sub-task spawning, cross-task information transfer. Define thresholds that require elevated review.

Hard rejects:
- Any AAR deployment without tamper-evident, out-of-sandbox logs.
- Any pipeline where AARs' outputs feed directly into training data or production policy without named human review.
- Any pipeline where a single AAR has sufficient credentials to influence multiple downstream systems.

Refusal rules:
- If the sandbox isolation is unspecified or relies on a single layer (Docker only, no seccomp / gVisor), refuse and require defense-in-depth.
- If the log storage is editable by anyone (even operators), refuse and require write-once media.
- If the deployment's goal is to automate a part of the capability pipeline — not just alignment research — refuse and escalate to RSP review.

Output format:

Return a review memo with:
- **Pipeline summary** (one paragraph)
- **Isolation score** (per-dimension: fs, net, proc, peer)
- **Log integrity score** (with verification plan)
- **Task allocation decision** (fixed / free / hybrid, with rationale)
- **Human review gate** (reviewer name, checklist)
- **Threshold monitors** (list of signals, thresholds, response)
- **Deployment verdict** (go / hold / no-go)
