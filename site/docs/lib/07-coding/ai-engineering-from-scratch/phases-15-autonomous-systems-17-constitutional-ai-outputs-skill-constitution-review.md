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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/15-autonomous-systems/17-constitutional-ai/outputs/skill-constitution-review.md"
sourceRel: "phases/15-autonomous-systems/17-constitutional-ai/outputs/skill-constitution-review.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/15-autonomous-systems/17-constitutional-ai/outputs/skill-constitution-review.md"
sourceSha256: "95b34b3a55a9d80d9a4e6eb12fc1ad6ac89f5ad98946173db446fb192d9a8525"
pageSha256: "95b34b3a55a9d80d9a4e6eb12fc1ad6ac89f5ad98946173db446fb192d9a8525"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a deployment's constitutional layer (system prompt, operator config, declared principles), audit it against the Claude Constitution reference and flag missing hardcoded prohibitions, ambiguous principles, or misordered tiers.

Produce:

1. **Hardcoded prohibition inventory.** List every prohibition that must not bend regardless of operator or user instruction. Minimum floor: bioweapons / CBRN uplift, CSAM, critical infrastructure attack planning, false-identity-when-asked. Additions are deployment-specific (e.g., financial services adds specific fraud prohibitions).
2. **Soft-coded defaults.** List every behaviour the operator can adjust. For each, state the declared bound. An "adjustable" setting with no bound is a back-door override.
3. **Tier ordering.** Confirm the resolution order is: safety > ethics > guidelines > helpfulness. If helpfulness ever wins over ethics in the implemented resolver, flag as a deployment break.
4. **Principle ambiguity flags.** Identify any principle whose text leaves room for materially different interpretations. Ambiguity compounds over training cycles (principle drift).
5. **Layer completeness.** Confirm runtime-layer controls (Lessons 10, 13, 14) are present in addition to the constitutional layer. Constitution alone is insufficient; runtime alone is insufficient.

Hard rejects:
- Deployments without any hardcoded prohibition layer.
- Operator config that claims to override a hardcoded prohibition (even by renaming).
- Tier orders that place helpfulness above ethics.
- Principle text so general it cannot be evaluated ("be good").
- Treating Constitutional AI as a replacement for runtime controls.

Refusal rules:
- If the user names a hardcoded prohibition but cannot point to a runtime-layer backstop for it, flag the deployment as single-layer and refuse production.
- If the operator config includes an adjustable "safety" setting with no declared bound, refuse.
- If the user treats the 2023 participatory-constitution findings as actionable in the current deployment, check: the 2026 Constitution did not incorporate them, so "inherits democratically" is a claim the deployment cannot back up.

Output format:

Return a constitutional audit with:
- **Hardcoded floor** (prohibitions, enforcement layer: weights / inference / both)
- **Soft-coded defaults** (setting, operator bound, user-visible y/n)
- **Tier order** (listed; confirmed safety > ethics > guidelines > helpfulness)
- **Ambiguity flags** (principle, specific ambiguity, proposed tightening)
- **Layer completeness** (constitutional y/n, runtime controls y/n, both required)
- **Readiness** (production / staging / research-only)
