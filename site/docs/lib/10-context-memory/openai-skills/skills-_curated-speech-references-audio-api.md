---
title: "Audio Speech API quick reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/speech/references/audio-api.md"
sourceRel: "skills/.curated/speech/references/audio-api.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/speech/references/audio-api.md"
sourceSha256: "dba58cfc0d5e125cf1ac13875193950233aa948639b268ed7799ca17bca66bfe"
pageSha256: "dba58cfc0d5e125cf1ac13875193950233aa948639b268ed7799ca17bca66bfe"
contentMode: "local-full"
zh: ""
---

# Audio Speech API quick reference

## Endpoint
- Create speech: `POST /v1/audio/speech`

## Default model
- `gpt-4o-mini-tts-2025-12-15`

## Other speech models (if requested)
- `gpt-4o-mini-tts`
- `tts-1`
- `tts-1-hd`

## Core parameters
- `model`: speech model
- `input`: text to synthesize (max 4096 characters)
- `voice`: built-in voice name
- `instructions`: optional style directions (not supported for `tts-1` or `tts-1-hd`)
- `response_format`: `mp3`, `opus`, `aac`, `flac`, `wav`, or `pcm`
- `speed`: 0.25 to 4.0

## Built-in voices
- `alloy`, `ash`, `ballad`, `cedar`, `coral`, `echo`, `fable`, `marin`, `nova`, `onyx`, `sage`, `shimmer`, `verse`

## Output notes
- Default format is `mp3`.
- `pcm` is raw 24 kHz 16-bit little-endian samples (no header).
- `wav` includes a header (better for quick playback).

## Compliance note
- Provide a clear disclosure that the voice is AI-generated.
