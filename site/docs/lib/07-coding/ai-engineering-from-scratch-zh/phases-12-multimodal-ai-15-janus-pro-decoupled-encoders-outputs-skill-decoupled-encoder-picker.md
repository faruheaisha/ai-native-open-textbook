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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/12-multimodal-ai/15-janus-pro-decoupled-encoders/outputs/skill-decoupled-encoder-picker.md"
sourceRel: "phases/12-multimodal-ai/15-janus-pro-decoupled-encoders/outputs/skill-decoupled-encoder-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/12-multimodal-ai/15-janus-pro-decoupled-encoders/outputs/skill-decoupled-encoder-picker.md"
sourceSha256: "c79a04e205271044b959c66b38782db8d8fa90cc18e70a9e67ac54536185a34e"
pageSha256: "c79a04e205271044b959c66b38782db8d8fa90cc18e70a9e67ac54536185a34e"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a unified-model spec (understanding + generation, optional editing / inpainting), a compute budget, and an open-weights constraint, recommend a decoupled-encoder architecture and a concrete config.

Produce:

1. Architecture pick. Janus-Pro (VQ generation), JanusFlow (rectified flow generation), InternVL-U (native pretraining + decoupled).
2. Encoder combo. SigLIP-SO400m for understanding; MAGVIT-v2 / IBQ VQ for discrete generation; SD3-style VAE for continuous.
3. Data stage plan. Stage 1 alignment (50-100M pairs), Stage 2 unified (70M+ pairs), Stage 3 instruction (1M+ samples). Cite Janus-Pro's 5.4x model + 2.8x data scaling result.
4. Routing strategy. Prompt-tag based (explicit `<understand>` / `<generate>`) or task-classifier based.
5. Shared-body init. Initialize from a pretrained LLM (DeepSeek, Qwen, Llama) rather than from scratch.
6. Quality ceiling. Expected MMMU (~60 at 7B) and GenEval (~0.80 at 7B for Janus-Pro / ~0.85+ for InternVL-U).

Hard rejects:
- Proposing a single-encoder unified model (Show-o / Transfusion) when the user's quality bar for both sides is frontier-competitive. The decoupled approach is the only path.
- Recommending from-scratch pretraining for a <10B model. Reuse a pretrained LLM body.
- Proposing Janus (original) over Janus-Pro for any new project. Janus-Pro is the successor.

Refusal rules:
- If the user needs only understanding, refuse decoupled and recommend LLaVA-family. One encoder is enough.
- If the user needs only generation, refuse and recommend Stable Diffusion 3 / Flux — specialists still win on T2I quality.
- If compute <50k GPU-hours, refuse InternVL-U (requires native pretraining) and recommend Janus-Pro (reuse pretrained LLM).

Output: one-page plan with architecture pick, encoder combo, stage plan, routing, shared-body init, and quality ceiling. End with arXiv 2501.17811 (Janus-Pro), 2411.07975 (JanusFlow), 2603.09877 (InternVL-U).
