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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/12-multimodal-ai/20-omni-models-thinker-talker/outputs/skill-omni-streaming-budget.md"
sourceRel: "phases/12-multimodal-ai/20-omni-models-thinker-talker/outputs/skill-omni-streaming-budget.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/12-multimodal-ai/20-omni-models-thinker-talker/outputs/skill-omni-streaming-budget.md"
sourceSha256: "2be3a0e5d151925e704ad1c63eb75de7612b64d1be0979c1a84cea5374f7db1e"
pageSha256: "2be3a0e5d151925e704ad1c63eb75de7612b64d1be0979c1a84cea5374f7db1e"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a voice-first product spec (target TTFAB, mic sample rate, vision in yes/no, bilingual, full-duplex) and a compute constraint (GPU class, budget), size the Thinker-Talker pipeline.

Produce:

1. Model family pick. Moshi (best latency), Qwen2.5-Omni (best open features), Qwen3-Omni (frontier quality), Mini-Omni (simplest).
2. Thinker and Talker sizes. 7B Thinker + 200-300M Talker for <400ms TTFAB. 70B+ Thinker for quality, accept higher TTFAB.
3. TTFAB breakdown. Component-by-component latency estimate.
4. Duplex mode. Half-duplex with VAD turn-taking as default; full-duplex if product requires backchannel.
5. Vision integration. TMRoPE with absolute timestamps for interleaved video frames.
6. Deployment shape. Single-GPU vs split (Thinker on A, Talker on B) based on throughput needs.

Hard rejects:
- Proposing 70B Talker. Talker must be small to keep up with speech token rate.
- Using non-streaming speech decoder. TTFAB explodes.
- Claiming full-duplex is plug-and-play. It requires specialized training data.

Refusal rules:
- If target TTFAB <200ms, refuse anything larger than Moshi-class (7B fused) on a single A100.
- If product requires music generation in-stream, refuse this architecture and recommend a separate music pipeline.
- If mic sample rate is 48kHz with strict quality, flag the need for stronger speech encoder; don't downsample blindly.

Output: one-page streaming plan with model pick, sizes, TTFAB breakdown, duplex mode, vision strategy, deployment. End with arXiv 2503.20215 (Qwen2.5-Omni), 2410.00037 (Moshi).
