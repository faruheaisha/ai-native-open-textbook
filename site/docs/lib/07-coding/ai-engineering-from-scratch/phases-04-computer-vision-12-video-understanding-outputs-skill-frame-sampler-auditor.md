---
title: "Frame Sampler Auditor"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/04-computer-vision/12-video-understanding/outputs/skill-frame-sampler-auditor.md"
sourceRel: "phases/04-computer-vision/12-video-understanding/outputs/skill-frame-sampler-auditor.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/04-computer-vision/12-video-understanding/outputs/skill-frame-sampler-auditor.md"
sourceSha256: "9cd320f4327cffd7c5a7474bf1e97f4e1ea9a391e9a46bcaa027787b909664e2"
pageSha256: "9cd320f4327cffd7c5a7474bf1e97f4e1ea9a391e9a46bcaa027787b909664e2"
contentMode: "local-full"
zh: ""
---

# Frame Sampler Auditor

Frame sampling is where video pipelines break. Bugs here propagate into every downstream metric.

## When to use

- Writing a new video data loader.
- Reproducing numbers from a paper and training accuracy is lower than reported.
- Debugging a video model whose eval accuracy is unstable across runs.

## Inputs

- `sampler_code`: Python function that takes (num_frames_total, T) and returns T indices.
- `T`: target clip length.
- Optional test cases: `num_frames_total` values to exercise (e.g. `[3, T-1, T, T+1, 30, 300, 3000]`).

## Checks

### 1. Short clip handling
Feed `num_frames_total < T`. Every returned index must be in `[0, num_frames_total - 1]`. The standard padding policy is to repeat the last frame for the remaining positions.

### 2. Boundary indices
Feed `num_frames_total == T`. Returned indices should be `[0, 1, ..., T-1]` exactly.

### 3. Uniform distribution
Feed `num_frames_total == 10 * T`. Returned indices should be monotonically increasing and roughly evenly spaced.

### 4. Dense window bounds
For dense sampling, feed `num_frames_total == 3 * T`. Returned indices should form a contiguous window, never crossing the end of the clip.

### 5. Determinism
Call the sampler twice with the same inputs and (for deterministic samplers) the same RNG. Indices should match.

### 6. Crop consistency
If the pipeline also returns a spatial crop per frame, run the sampler twice for the same clip with the same seed and confirm every frame uses the same crop box (same `(x, y, w, h)`). Different crops per frame inside one clip destroys temporal coherence and is a classic silent bug. Acceptable variation: augmentation applied *per clip*, consistent within a clip.

## Report

```
[sampler audit]
  name: <function name>
  T:    <int>

[short-clip handling]
  passed | failed (<details>)

[boundary]
  passed | failed

[uniform spacing]
  passed | failed (<stddev of gaps>)

[dense window]
  passed | failed (<details>)

[determinism]
  passed | failed

[crop consistency]
