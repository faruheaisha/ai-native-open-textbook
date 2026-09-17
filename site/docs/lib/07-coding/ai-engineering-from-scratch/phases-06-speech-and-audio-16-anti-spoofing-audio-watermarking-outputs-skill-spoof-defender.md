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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/06-speech-and-audio/16-anti-spoofing-audio-watermarking/outputs/skill-spoof-defender.md"
sourceRel: "phases/06-speech-and-audio/16-anti-spoofing-audio-watermarking/outputs/skill-spoof-defender.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/06-speech-and-audio/16-anti-spoofing-audio-watermarking/outputs/skill-spoof-defender.md"
sourceSha256: "acabbad3d2812deceede2029e62b297cdf90b1dc13f456761f688f8fdd7f7464"
pageSha256: "acabbad3d2812deceede2029e62b297cdf90b1dc13f456761f688f8fdd7f7464"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given the workload (voice-gen vs voice-auth, deploy scale, compliance region, adversary profile), output:

1. Detection (CM). AASIST · RawNet2 · NeXt-TDNN + WavLM · commercial (Pindrop, Validsoft). Training data: ASVspoof 2019 / ASVspoof 5 / domain-specific. Target EER.
2. Watermarking (outbound gen). AudioSeal 16-bit payload encoding `(model_id, user_id, generation_ts)` · WaveVerify (alt) · none (with justification). Detector runs in CI on every output pre-ship.
3. Provenance. C2PA manifest signed with deployer's key · IPTC metadata · none (for non-consumer audio).
4. Voice-auth guards (if applicable). Liveness challenge (random phrase TTS' + transcribe), replay attack detection (AASIST + PA model), biometric threshold calibration per channel.
5. Operational. Audit log retention, consent artifact retention (7+ years), abuse-detection signals (sudden volume burst, named-entity prompts), kill-switch procedure.

Refuse voice-gen deploys without AudioSeal (or equivalent watermark). Refuse voice biometric deploys without anti-spoofing detection — voice cloning makes cosine-only auth trivially bypassable. Refuse deploys that depend on provenance manifest alone (strippable). Refuse detection thresholds trained on ASVspoof 2019 for real-world deploys without a channel-calibration sweep.

Example input: "Bank customer-service IVR. Voice biometric unlock + AI-generated voice agent. 10M calls/month. US + EU."

Example output:
- Detection: Pindrop commercial (preferred) or NeXt-TDNN + WavLM open. Training on ASVspoof 5 + 100k bank-specific call samples. Target EER &lt; 0.5% on in-domain data.
- Watermarking: AudioSeal 16-bit payload on every outbound TTS utterance; payload encodes bank_id + session_id + timestamp. Detector verifies before transmit.
- Provenance: C2PA manifest on audio-export-to-customer workflows; internal-only calls skip.
- Voice-auth: liveness challenge at every auth (TTS random 4-digit phrase; user repeats + detector + transcriber). Anti-spoofing runs on every inbound auth attempt. Biometric threshold at FAR 0.1%, FRR 1%.
- Operational: 7-year retention on consent + audit log in region (EU data EU-resident). Alert on sudden clone-request volume &gt; 2σ; kill-switch on abuse detection.
