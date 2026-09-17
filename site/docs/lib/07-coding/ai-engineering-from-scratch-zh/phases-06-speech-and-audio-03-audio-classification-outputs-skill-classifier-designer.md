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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/06-speech-and-audio/03-audio-classification/outputs/skill-classifier-designer.md"
sourceRel: "phases/06-speech-and-audio/03-audio-classification/outputs/skill-classifier-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/06-speech-and-audio/03-audio-classification/outputs/skill-classifier-designer.md"
sourceSha256: "77c93503565302d31bb2bd020b8aa0965203e750b11508bf2bfc25a390db522c"
pageSha256: "77c93503565302d31bb2bd020b8aa0965203e750b11508bf2bfc25a390db522c"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given an audio classification task (domain, label count, label density per clip, data volume, deployment target), output:

1. Architecture. k-NN-MFCC / 2D CNN / AST / BEATs / Whisper-encoder. One-sentence reason.
2. Augmentations. SpecAugment params (time mask, freq mask counts), mixup α, background noise mix level.
3. Class balance. Balanced sampler vs focal loss vs class weights. Pin to the tail-to-head ratio.
4. Loss + metric. CE / BCE / focal; primary metric (top-1 / mAP / macro-F1) and secondary.
5. Split + eval plan. Stratified k-fold, speaker-disjoint if speech, temporal split if streaming data.

Refuse any multi-label task scored only with top-1 accuracy; require mAP. Refuse to evaluate a speaker-conditioned task without speaker-disjoint splits. Flag any architecture from scratch on <10k labeled clips — start with a SSL-pretrained backbone.
