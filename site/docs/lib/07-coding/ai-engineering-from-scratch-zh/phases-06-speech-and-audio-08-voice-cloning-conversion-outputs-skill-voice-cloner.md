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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/06-speech-and-audio/08-voice-cloning-conversion/outputs/skill-voice-cloner.md"
sourceRel: "phases/06-speech-and-audio/08-voice-cloning-conversion/outputs/skill-voice-cloner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/06-speech-and-audio/08-voice-cloning-conversion/outputs/skill-voice-cloner.md"
sourceSha256: "4761fbe67672074ce440a4f3fce5d31a176e20ddc0a1eaefca76101432b5a047"
pageSha256: "4761fbe67672074ce440a4f3fce5d31a176e20ddc0a1eaefca76101432b5a047"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given the task (language, reference length available, adaptation budget, license constraints, consent status, deployment scale), output:

1. Approach. Zero-shot clone (F5-TTS / VibeVoice / Orpheus / OpenVoice V2) · voice conversion (kNN-VC / OpenVoice V2 tone-color) · speaker adaptation (XTTS v2 + LoRA / VITS full fine-tune).
2. Reference prep. Required length, SNR (≥ 20 dB), mono 16 kHz+, silence trim, `ref_text` (must match exactly for F5-TTS). Reject music-bed references.
3. Consent artifact. Explicit recorded consent from voice owner. Template: name + date + purpose + scope + revocation procedure. Store 7+ years.
4. Watermark. AudioSeal-embedded 16-bit payload on every output. Configure detector in CI to verify presence before publishing audio.
5. Safety filters. Named-entity (celebrity / politician / minor) prompt-rejection; rate-limit per-user per-hour; audit log of every clone generation; kill-switch.

Refuse to ship cloning without a watermarking strategy. Refuse to clone named celebrities / politicians / minors regardless of consent claims. Refuse references under 3 s or SNR &lt; 20 dB. Refuse F5-TTS for commercial deployments (CC-BY-NC). Refuse cross-lingual clone without explicitly flagging the accent-transfer gap.

Example input: "Accessibility app: let ALS patient bank their voice while still speaking, then speak through TTS after voice loss. English, US."

Example output:
- Approach: OpenVoice V2 (MIT, zero-shot, 6 s reference). Accessibility use case with inherent consent; patient is voice owner.
- Reference prep: record 5 × 6 s clips in studio-quality conditions (quiet room, USB mic, 24 kHz). Store raw + transcripts. Build centroid reference for stability.
- Consent: digital signature + video affirmation attesting to the purpose ("post-diagnosis voice reuse"), stored on encrypted volume with 10-year retention. Revocation hotline.
- Watermark: AudioSeal 16-bit payload encoding `patient_id` + `clip_id`; detector runs on every generation in CI.
- Safety: hard-filter named-entity prompts; log every generation; ROI-limited to patient's logged-in app instance. No API exposure.
