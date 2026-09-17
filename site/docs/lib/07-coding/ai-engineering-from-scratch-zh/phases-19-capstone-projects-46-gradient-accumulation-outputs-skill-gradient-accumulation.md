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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/46-gradient-accumulation/outputs/skill-gradient-accumulation.md"
sourceRel: "phases/19-capstone-projects/46-gradient-accumulation/outputs/skill-gradient-accumulation.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/46-gradient-accumulation/outputs/skill-gradient-accumulation.md"
sourceSha256: "a6c05b895b3753d8a02c8314cdd38e70d2561c2f598b833fe42a6cf9ac198889"
pageSha256: "a6c05b895b3753d8a02c8314cdd38e70d2561c2f598b833fe42a6cf9ac198889"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

## When to use

Effective batch is the lever that smooths the gradient and matches the learning rate schedule. When you cannot afford it in a single forward pass, this is the recipe.

## Recipe

1. Pick `micro_batch` as the largest size that fits in memory and saturates the accelerator.
2. Pick `effective_batch` from the learning rate schedule.
3. Set `accum_steps = effective_batch // (micro_batch * world_size)` and assert it divides evenly.
4. Per micro batch: `loss = criterion(model(x), y) / accum_steps; loss.backward()`.
5. On non-final micros, enter `model.no_sync()` to skip the gradient all-reduce in DDP.
6. After the last micro batch, run `optimizer.step()` once. Zero gradients before the next window.
7. The optimizer state advances once per effective batch; the learning rate schedule ticks once per effective batch.

## Logging

Emit a small JSON record per effective step with `samples_per_sec`, `median_step_ms`, `sync_calls`, `accum_steps`, `effective_batch`. Without this the cost trade is invisible.

## Failure modes

- Forgetting the `/ accum_steps` scaling: gradients explode by N.
- Stepping mid-window: parameters drift.
- Sync on every micro batch: network bound for no statistical gain.
- Mixing this with mixed precision unscaling: scale the unscaled loss only.
