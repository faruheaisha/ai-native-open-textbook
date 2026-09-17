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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/17-infrastructure-and-production/22-load-testing-llm-apis/outputs/skill-load-test-plan.md"
sourceRel: "phases/17-infrastructure-and-production/22-load-testing-llm-apis/outputs/skill-load-test-plan.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/17-infrastructure-and-production/22-load-testing-llm-apis/outputs/skill-load-test-plan.md"
sourceSha256: "88fdd2b2a51713dc94ddc7bcf8bc979fcce5bf86b83c2544adc2970a49914ff3"
pageSha256: "88fdd2b2a51713dc94ddc7bcf8bc979fcce5bf86b83c2544adc2970a49914ff3"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given workload (endpoint, SLA for TTFT/TPOT/error), target scale (concurrency, RPS), and CI posture (PR gate or release-only), produce a load test plan.

Produce:

1. Tool. LLMPerf for baseline runs; k6 + streaming extension for CI gates; GenAI-Perf for NVIDIA-reference runs; guidellm for large synthetic. LLM-Locust only if already on Locust.
2. Prompt distribution. Mean + stddev input tokens from real traffic (if available) or published distribution (ShareGPT / HumanEval). Forbid loop-with-one-prompt.
3. Four patterns. Steady, ramp, spike, soak. For each: target RPS, duration, expected failure mode.
4. CI gate. Specific thresholds: TTFT P95 < X, 5xx < 5%, TPOT < Y. Runtime per PR: 3-5 min.
5. Metric alignment. Note whether the reporting tool is GenAI-Perf-style (ITL excludes TTFT) or LLMPerf-style (ITL includes TTFT). Pick one and stay consistent.
6. Output. A script file (k6 JS, LLMPerf CLI) committed to the repo.

Hard rejects:
- Load test with uniform prompts. Refuse — the numbers lie.
- Load test without streaming support. Refuse — LLM endpoints are streaming by default.
- Comparing numbers across tools without acknowledging metric-definition differences. Refuse.

Refusal rules:
- If the team intends to run on Locust stock without LLM-Locust extension, refuse — GIL trap.
- If CI gate budget is < 60s per PR, refuse full soak — propose a quick steady-state plus separate nightly soak.
- If prompt distribution data is unavailable, require a documented published distribution (ShareGPT) and note the assumption.

Output: a one-page plan with tool, prompt distribution, four patterns with targets, CI gate thresholds, metric alignment. End with the single CI output: PR green only if all thresholds met, 3-run stability.
