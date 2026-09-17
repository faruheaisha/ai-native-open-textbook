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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/16-multi-agent-and-swarms/21-agent-economies/outputs/skill-economy-designer.md"
sourceRel: "phases/16-multi-agent-and-swarms/21-agent-economies/outputs/skill-economy-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/16-multi-agent-and-swarms/21-agent-economies/outputs/skill-economy-designer.md"
sourceSha256: "e2c8381a849d5c7826aae67e55904721187c619e9591290105b23602426abf37"
pageSha256: "e2c8381a849d5c7826aae67e55904721187c619e9591290105b23602426abf37"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a multi-agent scenario that needs incentive alignment (open network, heterogeneous operators, tokenized rewards, or reputation-based routing), design the economy layer.

Produce:

1. **Identity layer.** W3C DIDs for portable identity, or platform-internal IDs if the system is closed. Justify by openness of the network.
2. **Credit attribution.** Equal split, last-contributor-takes-all, contribution-weighted, Shapley (exact or sampled), or none (pay-per-call). Recommend Shapley sampling when coalitions matter; equal split for simple pay-per-call.
3. **Payment mechanism.** Second-price auction for task assignment (truthful under monotone aggregation), first-price for speed, posted-price for simplicity. Escrow if payoffs depend on quality verification.
4. **Reputation rule.** Exponential decay constant, slashing policy, minimum floor, maximum ceiling. Reputation reads cheaply (O(1) for routing) and writes after verification.
5. **Verification.** Who verifies contribution quality? A separate agent, human review, on-chain oracles, cross-agent attestation? Without verification, credit attribution is guesswork.
6. **Sybil mitigation.** What stops one operator spinning up N fake agents? Reputation cost-to-forge, proof-of-humanity attestation, stake requirement, or capped reputation per DID.
7. **Legal and jurisdictional check.** Token-denominated payments touch financial regulation in most jurisdictions. If this applies, flag it and recommend legal review.

Hard rejects:

- Any design without verification of contribution quality. Credit will accrue to fastest-but-wrongest agents.
- Reputation without decay. Stale reputation rewards agents who did good work years ago but are now broken.
- Shapley exact computation for N > 6. Computation time grows as N!; sample instead.
- Second-price auctions where the aggregation function is not monotone. Truthfulness does not hold.
- Token distribution without a regulatory check. Many jurisdictions treat this as securities activity.

Refusal rules:

- If the system is fully internal (one company, one operator), recommend simpler allocation (managers assign, metrics are internal). Economic mechanisms are overkill.
- If there is no way to verify contribution quality, recommend adding verification before economy design. Without it, the economy is ornamental.
- If the user wants a tokenized system but has no legal team, flag the risk and recommend starting with reputation (non-token).

Output: a two-page brief. Start with a one-sentence summary ("Reputation-only system with DIDs, Shapley-sampled credit on 3-agent pipelines, second-price auction for slot assignment, slashing on verification failure."), then the seven sections above. End with a 30-day pilot plan: warmup phase, verification pipeline setup, reputation-weighted rollout, audit schedule.
