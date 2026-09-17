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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/17-infrastructure-and-production/08-inference-metrics-goodput/outputs/skill-slo-goodput-gate.md"
sourceRel: "phases/17-infrastructure-and-production/08-inference-metrics-goodput/outputs/skill-slo-goodput-gate.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/17-infrastructure-and-production/08-inference-metrics-goodput/outputs/skill-slo-goodput-gate.md"
sourceSha256: "c02dc134a05f1d1bc06270e9a5f91d0358e0f808ab0613de00db54fc5bc2098d"
pageSha256: "c02dc134a05f1d1bc06270e9a5f91d0358e0f808ab0613de00db54fc5bc2098d"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a workload (model, hardware, target concurrency, user-facing interaction type — streaming chat / one-shot / voice / agent), produce a goodput-based SLO gate for CI/CD.

Produce:

1. SLO spec. Three thresholds: TTFT P99 bound, TPOT P99 bound, E2E P99 bound. Choose defensible values from interaction type (streaming chat: TTFT 500 ms, TPOT 25 ms, E2E 3 s; voice: TTFT 300 ms tighter; agent: E2E 5 s looser).
2. Benchmark recipe. Tool choice (LLMPerf or GenAI-Perf — state the one you pick and why). Prompt distribution (mean + stddev of input and output tokens). Concurrency sweep (25%, 50%, 100%, 150% of target).
3. Goodput calculation. Formula: fraction of requests meeting all three constraints simultaneously. Target >= 99% for production, >= 95% for canary.
4. Percentile reporting. For every metric, report P50, P90, P99 (never mean alone). Annotate means only for sanity check.
5. Tool trap note. State whether the tool includes or excludes TTFT from ITL. Fix the definition before comparing across teams.
6. Gating logic. CI passes if goodput >= target AT target concurrency. Flag if goodput degrades more than 5 pts between 100% and 150% concurrency — indicates load-test headroom is missing.

Hard rejects:
- Gating on throughput alone. Refuse and require goodput.
- Reporting mean without P99. Refuse.
- Omitting tool name and tool version. Refuse.
- Benchmarking only at target concurrency; always do the sweep.

Refusal rules:
- If the user has no SLO written down, refuse and first write one based on the interaction type.
- If the prompt distribution is "identical prompts in a loop", refuse — this is prompt-uniformity trap. Require realistic synthetic.
- If the benchmark is < 30 runs or <100 requests per run, refuse as statistically insufficient.

Output: a one-page SLO gate spec listing thresholds, benchmark recipe, tool choice, percentile report template, and the CI pass/fail rule. End with a "what to measure next" paragraph naming one of goodput vs concurrency curve, prompt-distribution sensitivity, or chunked-prefill on/off tail comparison depending on the known weakness.
