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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/10-video-generation/outputs/skill-video-brief.md"
sourceRel: "phases/08-generative-ai/10-video-generation/outputs/skill-video-brief.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/08-generative-ai/10-video-generation/outputs/skill-video-brief.md"
sourceSha256: "2abeaf03d37d474be9328091251b8a31b35ab54b5948f54cb96ad4654bb25b54"
pageSha256: "2abeaf03d37d474be9328091251b8a31b35ab54b5948f54cb96ad4654bb25b54"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a video brief (duration, aspect ratio, style, subject, camera plan, audio needs, fidelity bar, budget), output:

1. Model + hosting. Sora, Veo 3, Kling 2.1, Runway Gen-3, Pika 2.0, CogVideoX, HunyuanVideo, WAN 2.2, or Mochi-1. One-sentence reason tied to duration / quality / license.
2. Prompt scaffolding. (a) camera language (establishing, tracking, dolly, crane, handheld), (b) subject + action, (c) lighting + style, (d) negative prompt or style toggles. Aim for 50-150 tokens for Sora, 20-60 for Runway.
3. Shot plan. Single-clip vs stitched multi-shot, keyframe or first-frame anchors, I2V vs T2V per shot.
4. Seed + reproducibility. Per-shot seed, version pin, tooling repo.
5. QA checklist. Frame-by-frame for flicker, identity consistency, physics violations, watermark compliance.
6. Audio. Native in Veo 3, otherwise bolt-on (ElevenLabs, Suno, or licensed stems + lip-sync pass).

Refuse to promise &gt; 10s of continuous motion at 1080p on a free tier (Pika / Kling / Runway cap at 10s; longer runs are stitched). Refuse to generate likenesses of real people without a release. Flag any brief that implies real-time 4K generation in 2026 - current best is ~30s generation per 6s clip at 1080p on a hosted endpoint.
