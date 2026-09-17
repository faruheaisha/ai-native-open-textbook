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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/06-speech-and-audio/17-audio-evaluation-metrics/outputs/skill-audio-evaluator.md"
sourceRel: "phases/06-speech-and-audio/17-audio-evaluation-metrics/outputs/skill-audio-evaluator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/06-speech-and-audio/17-audio-evaluation-metrics/outputs/skill-audio-evaluator.md"
sourceSha256: "fe8aa151e01e2f6d52121cabe25fff37000479b38bc1838816a910f779fc8f1e"
pageSha256: "fe8aa151e01e2f6d52121cabe25fff37000479b38bc1838816a910f779fc8f1e"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given the task (ASR / TTS / cloning / speaker-verif / diarization / classification / music / LALM / streaming S2S), output:

1. Primary metric. WER · MOS · UTMOS · SECS · EER · DER · mAP · FAD · MMAU-Pro accuracy · latency P95. One choice.
2. Secondary metrics. 1-3 additional axes (speed, diversity, robustness) and reason.
3. Normalization rule. Lowercase, punctuation-strip, number expansion, whitespace collapse. Use Whisper-normalizer or custom, document it.
4. Public benchmark. The canonical leaderboard to report against (Open ASR, TTS Arena, MMAU-Pro, VoxCeleb1-O, AudioSet, LongAudioBench, etc.).
5. In-house set. Held-out domain data with N samples; demographic / acoustic slice breakdown.
6. Reporting format. Distribution (P50/P95/P99 for latency; per-class recall for classification; per-category for MMAU). Release notes template.

Refuse single-number evaluation for latency (report percentiles). Refuse aggregate-only for classification (report per-class). Refuse TTS releases without both MOS/UTMOS and SECS (when cloning). Refuse ASR releases without a WER normalization spec. Refuse music releases with only FAD — always pair with human MOS panel.

Example input: "Release of a new English-Spanish conversational TTS. Need to convince the team it's better than the existing Cartesia-Sonic baseline."

Example output:
- Primary: UTMOS (paired audio samples on 50 prompts per language) + human-panel MOS (20 listeners per language, blind A/B vs baseline).
- Secondary: TTFA median & P95 (must match baseline); SECS &gt; 0.80 vs a fixed voice reference (no speaker regression); CER on round-trip ASR (Whisper-large-v3-turbo) &lt; 2%.
- Normalization: Whisper-normalizer English + Hugging Face multilingual-normalizer Spanish for round-trip WER.
- Public benchmark: TTS Arena (English) and Artificial Analysis Speech for relative ELO positioning. Target: within 50 ELO of the closest competitor.
- In-house: 200 held-out prompts (100 per lang) covering money, dates, product names, 2-sentence narration, emotional read, code-switched. 10 demographic voices.
- Reporting: release note with headline (UTMOS + MOS), P50/P95 TTFA histogram, SECS CDF, CER per-category breakdown, failure-mode callouts (code-switched prompts failed at X%).
