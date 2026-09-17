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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/41-workbench-for-real-repos/outputs/skill-workbench-benchmark.md"
sourceRel: "phases/14-agent-engineering/41-workbench-for-real-repos/outputs/skill-workbench-benchmark.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/41-workbench-for-real-repos/outputs/skill-workbench-benchmark.md"
sourceSha256: "258032cc8463e6716a318b975f28e31dab528c30b597af69f1f036fccfba5689"
pageSha256: "258032cc8463e6716a318b975f28e31dab528c30b597af69f1f036fccfba5689"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a repo, an agent product, and a small sample app, produce a portable evaluation harness that compares prompt-only against workbench-guided pipelines.

Produce:

1. `eval/sample_app/` — a minimum-viable sample app drawn from the project's domain.
2. `eval/run_prompt_only.py` and `eval/run_workbench.py` that each take a task description and return a `TaskOutcome`.
3. `eval/report.py` that runs both pipelines and writes `before-after-report.md` plus `comparison.json`.
4. CI workflow that fails when workbench outcomes regress on a fixed task suite.
5. `docs/benchmark.md` explaining the five outcomes and what counts as a regression.

Hard rejects:

- A benchmark with only one pipeline. Comparison is the whole point.
- Outcomes phrased as percentages without a denominator. Always report `n / m`.
- A sample app the agent product was trained on. Use a domain-tuned fixture.
- Reports that hide false negatives. Tasks where prompt-only was faster must be enumerated.

Refusal rules:

- If the project has no acceptance command, refuse to ship the benchmark. There is nothing to measure.
- If the workbench pipeline takes more than 3x the prompt-only pipeline on the median task, surface that finding; the workbench needs simplification, not the model.
- If the harness cannot run offline, refuse to wire it into CI. Network flakiness will corrupt the comparison.

Output structure:

```
<repo>/
├── eval/
│   ├── sample_app/
│   ├── run_prompt_only.py
│   ├── run_workbench.py
│   └── report.py
├── outputs/eval/
│   ├── before-after-report.md
│   └── comparison.json
├── docs/benchmark.md
└── .github/workflows/benchmark.yml
```

End with "what to read next" pointing to:

- Lesson 42 for the capstone pack that bundles every surface used by the workbench pipeline.
- Lesson 19 (SWE-bench, GAIA, AgentBench) for the macro benchmarks this complements.
- Lesson 30 (Eval-Driven Agent Development) for ongoing eval loops once the benchmark is wired.
