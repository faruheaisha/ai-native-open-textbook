---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/15-autonomous-systems/19-anthropic-rsp/outputs/skill-scaling-policy-review.md"
sourceRel: "phases/15-autonomous-systems/19-anthropic-rsp/outputs/skill-scaling-policy-review.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/15-autonomous-systems/19-anthropic-rsp/outputs/skill-scaling-policy-review.md"
sourceSha256: "c51228a63abeb4006a35460f1955953cc7f60b4e2bce0796023dccb8b7f88b3e"
pageSha256: "c51228a63abeb4006a35460f1955953cc7f60b4e2bce0796023dccb8b7f88b3e"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a published or proposed scaling policy, produce a structured review comparing it to the RSP v3.0 reference shape (AI R&D-4, affirmative case, two-tier mitigation, Frontier Safety Roadmap, Risk Report, independent review).

Produce:

1. **Two-tier inventory.** Separate commitments into "lab-unilateral" and "industry-wide recommendation." Commitments in the recommendation tier are advocacy, not promises. Count the ratio; a policy where most commitments live in the recommendation tier is a weak policy.
2. **Thresholds.** Name every capability threshold and the mitigation that triggers. Flag thresholds that are qualitative where v2 had quantitative. Flag missing thresholds for capabilities the policy claims to cover.
3. **Pause commitment.** Confirm the policy names a pause clause (training stops, deployment halts, or similar) at specific thresholds. v3.0 removed this; policies that follow suit inherit the regression.
4. **Standing artifacts.** Confirm the policy mandates standing Frontier Safety Roadmap and Risk Report documents with declared cadence. One-off artifacts published post-hoc do not qualify.
5. **Independent review.** Name the external review mechanism. Internal-only review (a "Safety Advisory Group" made of lab employees) does not qualify as independent oversight.

Hard rejects:
- Policies with no named capability threshold.
- Policies whose mitigations all live in the industry-recommendation tier.
- Policies with no standing Roadmap / Risk Report artifacts.
- Policies with no independent review mechanism.
- Policies that claim to "learn from real-world experience" without stating how the policy text updates and on what cadence.

Refusal rules:
- If the policy document is marketing rather than governance (no specific commitments, no thresholds, no cadence), refuse to rate it as a scaling policy.
- If the user treats a policy's existence as equivalent to compliance, refuse. A policy is a commitment device; compliance requires evidence.
- If the user cites an older policy version (e.g., 2023 Anthropic RSP) as current, refuse and require the current version.

Output format:

Return a policy review with:
- **Two-tier ratio** (unilateral / recommendation / total count)
- **Threshold table** (name, type: quantitative / qualitative, trigger, mitigation)
- **Pause commitment** (present y/n, specific clause)
- **Standing artifacts** (Roadmap cadence, Risk Report cadence)
- **Independent review** (mechanism, reviewer identity, frequency)
- **Summary rating** (strong / moderate / weak, justified)
