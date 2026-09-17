---
title: "Pipeline Budget Planner"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/04-computer-vision/16-vision-pipeline-capstone/outputs/skill-pipeline-budget-planner.md"
sourceRel: "phases/04-computer-vision/16-vision-pipeline-capstone/outputs/skill-pipeline-budget-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/04-computer-vision/16-vision-pipeline-capstone/outputs/skill-pipeline-budget-planner.md"
sourceSha256: "81e8a8aeb671d0b180cf5a4b48b69139e4040b39430d13e8630df30928f9584c"
pageSha256: "81e8a8aeb671d0b180cf5a4b48b69139e4040b39430d13e8630df30928f9584c"
contentMode: "local-full"
zh: ""
---

# Pipeline Budget Planner

Turn a latency/throughput target into a stage-by-stage budget so every team member knows what number they are engineering toward.

## When to use

- Before building a new vision service, to set expectations for each stage.
- After a first benchmark, to see which stage is farthest from its budget.
- When an SLA changes and budgets need to be renegotiated.

## Inputs

- `p95_latency_target_ms`: per-request budget.
- `target_qps`: throughput per replica.
- `stages`: list of `\{ name: str, current_ms: float \}`.

## Allocation rules

Default allocation across the seven standard stages if no current measurements provided:

| Stage | Share |
|-------|-------|
| decode + preprocess | 15% |
| detector forward | 55% |
| postprocess detections (NMS, clamp) | 5% |
| crop + resize for classifier | 5% |
| classifier forward | 15% |
| schema validation | <1% |
| response serialisation | 4% |

On GPU-bound pipelines (cloud), the detector share often rises to 70%. On CPU, preprocessing and classifier batching eat more.

## Report

```
[budget plan]
  p95 target:  <ms>
  throughput:  <qps per replica>

| stage               | target_ms | current_ms | headroom | gate |
|---------------------|-----------|------------|----------|------|
| decode+preprocess   | ...       | ...        | ...      | ok|X |
| detector            | ...       | ...        | ...      | ok|X |
| ...                 | ...       | ...        | ...      |      |

[bottleneck]
  stage:  <name>
  miss:   <ms over budget>
  lever:  <specific action>

[levers]
  decode+preprocess:   Pillow-SIMD, libjpeg-turbo, decode on GPU via NVJPEG
  detector:            smaller backbone, lower input resolution, INT8, TensorRT
  postprocess:         GPU-side NMS (torchvision.ops), fused masks
  crop+resize:         GPU crop with grid_sample, batched interpolate
  classifier:          smaller backbone, INT8, warm cache, batch
  schema:              skip validation in hot path, validate at boundaries only
  response:            orjson, stream protobuf
```

## Rules

- Never recommend dropping schema validation from the production path; propose moving it to the boundary instead.
- If preprocessing misses its budget, always try Pillow-SIMD or NVJPEG before changing the model.
- If the detector miss is more than 30% of target, switch models instead of optimising the current one.
- Flag the gate as `X` when current_ms > 1.1 * target_ms; mark `ok` if within 10% of budget.
