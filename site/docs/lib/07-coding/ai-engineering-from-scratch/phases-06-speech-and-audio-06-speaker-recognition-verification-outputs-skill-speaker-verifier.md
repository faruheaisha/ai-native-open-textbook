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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/06-speech-and-audio/06-speaker-recognition-verification/outputs/skill-speaker-verifier.md"
sourceRel: "phases/06-speech-and-audio/06-speaker-recognition-verification/outputs/skill-speaker-verifier.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/06-speech-and-audio/06-speaker-recognition-verification/outputs/skill-speaker-verifier.md"
sourceSha256: "262e4eeaa1e0a63276e104feb647216761aed0bfdf44e5a6f3711d5879341f86"
pageSha256: "262e4eeaa1e0a63276e104feb647216761aed0bfdf44e5a6f3711d5879341f86"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a target (verification vs identification vs diarization, domain, channel, threat model) and data (hours for threshold tuning, number of speakers, enrollment clip budget), output:

1. Embedder. ECAPA-TDNN / WavLM-SV / ReDimNet / x-vector. Reason.
2. Enrollment protocol. Number of clips, min duration, noise gate, channel match.
3. Scoring. Cosine / PLDA; with or without AS-norm; cohort size.
4. Threshold. Target FAR (fraud risk) or EER; tuning set size.
5. Spoof defense. Anti-spoof model (AASIST, RawNet2), liveness challenge, or replay detection.

Refuse any fraud-grade deployment without an anti-spoof front-end. Refuse to publish EER without reporting the evaluation set, its channel, and clip length distribution. Flag cosine thresholds fixed across domains without re-tuning.
