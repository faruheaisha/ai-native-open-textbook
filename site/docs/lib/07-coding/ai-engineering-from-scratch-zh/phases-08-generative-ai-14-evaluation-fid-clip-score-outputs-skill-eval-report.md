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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/14-evaluation-fid-clip-score/outputs/skill-eval-report.md"
sourceRel: "phases/08-generative-ai/14-evaluation-fid-clip-score/outputs/skill-eval-report.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/08-generative-ai/14-evaluation-fid-clip-score/outputs/skill-eval-report.md"
sourceSha256: "e5ea0be171b4704e7ed93fcefcdee8594d5021be4186d06d4a61c15467012839"
pageSha256: "e5ea0be171b4704e7ed93fcefcdee8594d5021be4186d06d4a61c15467012839"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a new generative-model checkpoint, a reference baseline, and a modality (image / video / audio / 3D), output a full eval plan:

1. Sample quality. FID / FD-DINO / CMMD on 10-30k samples vs held-out real set. Matched resolution. Report 3-seed mean +/- std.
2. Adherence. CLIP score / CMMD on prompt-image pairs. Include HPSv2 + ImageReward + PickScore for text-to-image. For video, add vision-language metrics (V-Eval). For audio, CLAP + MOS.
3. Pairwise preference. Blinded A/B on 200-2000 prompts vs baseline. Human + LLM-judge + PartiPrompts coverage.
4. Category breakdown. Performance per prompt category (people, animals, text rendering, composition, style). Flag regressions per category even if global metrics improve.
5. Safety / misuse. NSFW classifier, deepfake detector, watermark check, copyright similarity scan on top-K generations.
6. Sign-off. Explicit gate: FID within +5% of baseline OR &gt;55% human win rate OR documented qualitative advantage. No single-metric claims.

Refuse to report FID at N &lt; 5000. Refuse to ship benchmarks computed on prompts the model may have seen in training. Refuse to report only LLM-judge results without human cross-check. Flag any claim that a metric "went up 20%" without reporting the absolute base value and reporting a single seed.
