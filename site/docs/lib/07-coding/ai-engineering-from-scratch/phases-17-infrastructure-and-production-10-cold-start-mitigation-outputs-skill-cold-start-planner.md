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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/10-cold-start-mitigation/outputs/skill-cold-start-planner.md"
sourceRel: "phases/17-infrastructure-and-production/10-cold-start-mitigation/outputs/skill-cold-start-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/10-cold-start-mitigation/outputs/skill-cold-start-planner.md"
sourceSha256: "2e9017716441b075cb1e6ee7943406e38b979b625c0215ac74ac6afdc0c79f73"
pageSha256: "2e9017716441b075cb1e6ee7943406e38b979b625c0215ac74ac6afdc0c79f73"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given model size, SLA (TTFT P99), traffic shape (steady vs bursty), and budget posture, produce a cold-start mitigation plan.

Produce:

1. Cold-start budget. Break down the raw cold-start path (node provision, image pull, weights to HBM, engine init, first forward). Use 2026 nominal seconds for the stated model size.
2. Layer selection. Pick the minimum number of layers that brings total below the SLA: pre-seeded image (L1), model streamer (L2), GPU snapshot (L3), warm pool (L4), tiered loading (L5). Justify each layer against the specific phase it attacks.
3. Warm-pool sizing. State `min_workers` for the primary path. If SLA is TTFT P99 < 60s on a 70B+ model, make warm pool mandatory regardless of cost.
4. Cost estimate. Monthly GPU cost for the chosen warm-pool and the expected number of cold starts per day.
5. Tail policy. What happens to the first user on a fresh replica — do they get queued to a warm replica, or do they pay the cold-start tax? Name a specific policy (e.g., "route first request to any warm replica within 10s; fall through to cold").
6. Failure mode. What happens if a warm replica dies mid-session. Is recovery automatic (live migration), or is it a cold start on the next request?

Hard rejects:
- Proposing "just add warm pool" without computing the monthly cost.
- Claiming a mitigation without a specific phase it attacks (e.g., "use Bottlerocket" without saying it eliminates the 180s image pull).
- Ignoring the per-GPU-topology constraint on GPU snapshots — if the platform migrates SKU, snapshots are invalid.

Refusal rules:
- If SLA is TTFT P99 < 5s on a fresh 70B cold start with no warm pool, refuse — mathematically impossible at 2026 infrastructure speeds.
- If budget forbids warm pool but SLA requires sub-30s cold start, name the platform-specific fix (Modal GPU snapshots, Baseten pre-warming) and refuse to promise the SLA on a different platform without it.
- If the operator asks for scale-to-zero with bursty traffic and a 70B model, refuse to promise SLA — the math does not work without snapshots or warm pools.

Output: a one-page plan listing phases, layers, `min_workers`, monthly cost, tail policy, failure mode. End with the single metric to alert on: P99 cold-start duration over the last rolling hour.
