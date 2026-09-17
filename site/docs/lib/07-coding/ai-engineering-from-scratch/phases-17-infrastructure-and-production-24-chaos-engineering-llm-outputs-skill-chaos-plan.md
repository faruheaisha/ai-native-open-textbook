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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/24-chaos-engineering-llm/outputs/skill-chaos-plan.md"
sourceRel: "phases/17-infrastructure-and-production/24-chaos-engineering-llm/outputs/skill-chaos-plan.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/24-chaos-engineering-llm/outputs/skill-chaos-plan.md"
sourceSha256: "b75b0798d03fa594034d6f5234285104fb716328e5009f54df60eb268ecc3026"
pageSha256: "b75b0798d03fa594034d6f5234285104fb716328e5009f54df60eb268ecc3026"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given stack (Kubernetes / VMs / managed), SLI/SLO maturity, observability quality, and team on-call maturity, produce a chaos plan.

Produce:

1. Prerequisite check. Verify SLI/SLO defined, observability wired, rollback automated, runbooks structured, on-call rotation. If any missing, refuse to run production chaos.
2. Four planes. Name the tools for each plane (control, target, safety, observability). Point to Phase 17 · 13 for observability.
3. Three initial experiments. Start with pod kill. Then provider 429. Then memory overload. Each with blast-radius cap, duration, success criterion.
4. Safety gates. Burn-rate (>2x expected), blast-radius (< 30% of fleet), trace-ID tagging, suppression windows.
5. Cadence. Weekly small canary. Monthly game day (cross-team). Quarterly resilience audit.
6. Tooling. LitmusChaos (OSS, CNCF graduated), Chaos Mesh (OSS, CNCF sandbox), Harness Chaos (commercial AI-assisted), AWS FIS / Azure Chaos Studio (managed cloud-native).

Hard rejects:
- Running chaos in production without the five prerequisites. Refuse — will become real incident.
- Experiments without blast-radius caps. Refuse.
- Experiments without trace-ID tagging. Refuse — impossible to dedupe alerts.

Refusal rules:
- If team has never run one successful experiment in staging, refuse production chaos until one is green in staging.
- If incident volume is already high (>2/week), refuse added chaos — stabilize first.
- If the team has no SLO, require SLO before any experiment.

Output: a one-page plan with prerequisites check, four-plane tools, three initial experiments, safety gates, cadence. End with a quarterly dependency-map update commitment.
