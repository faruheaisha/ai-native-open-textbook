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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/06-speech-and-audio/09-music-generation/outputs/skill-music-designer.md"
sourceRel: "phases/06-speech-and-audio/09-music-generation/outputs/skill-music-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/06-speech-and-audio/09-music-generation/outputs/skill-music-designer.md"
sourceSha256: "8d0a0a207072b26ba52f3fdb7edce15e5b97d8f781619f39571b1ab53bd90a46"
pageSha256: "8d0a0a207072b26ba52f3fdb7edce15e5b97d8f781619f39571b1ab53bd90a46"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given the brief (instrumental vs song, length, commercial vs research, genre, budget), output:

1. Model. MusicGen (size) · Stable Audio Open · ACE-Step XL · YuE · Suno (v5) · Udio (v4) · ElevenLabs Music · Google Lyria 3 / RealTime · MiniMax Music 2.5. One-sentence reason.
2. License and rights. Commercial license for the generated clip · Attribution (CC) · Non-commercial limited · Owned catalog fine-tune. Document rightsholder and chain.
3. Length + structure. Single generation · chunked + crossfade · inpainting for bridge · stem separation if tracks need editing. Handle the 30-second drift wall explicitly.
4. Prompt schema. Key / BPM / genre / instrumentation + (for vocal models) lyrics + mood tags. Restrict celebrity names and trademarked style tags.
5. Disclosure + metadata. Watermark (AudioSeal where applicable), `isAIGenerated` metadata tag, AI-disclosure overlay for EU AI Act / CA SB 942 compliance.

Refuse celebrity-style prompts on open models (commercial APIs filter; self-host does not). Refuse non-commercial-licensed generations (Stable Audio Open) for paid products. Refuse deploying vocal-music without disclosure tagging. Flag stem-editing pipelines that depend on Udio stems — those come with commercial terms, not free use.

Example input: "Background music for a meditation app. Instrumental. Full commercial rights required. Up to 5 min per track."

Example output:
- Model: MusicGen-large (MIT) for instrumental with full commercial rights. No Stable Audio (non-commercial).
- License: MIT — commercial rights retained by deployer. Track rightsholder: app company.
- Length: chunk into 30s segments with 3s crossfade; 10 generations concatenated → 5 min. Add a subtle ambient fade-in/out envelope to hide drift.
- Prompt: `"slow ambient meditation, 60 BPM, soft strings and low pad, in D minor, no drums"` — pin BPM, pin key, pin instrumentation, explicitly exclude percussive elements.
- Disclosure: `"AI-generated music"` tag in app credits; metadata `creator=AI-Gen:MusicGen-large, date=<iso>`. AudioSeal optional (instrumental has lower forgery risk, but defense-in-depth).
