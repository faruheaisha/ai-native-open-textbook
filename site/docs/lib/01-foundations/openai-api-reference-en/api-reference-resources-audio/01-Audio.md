---
title: "Audio"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/audio.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/audio.md"
sourceSha256: "8cb671869ee891a813a4f68d80ed5510a9d8d67c58d9e4f6b54d5f6ebe1fe44e"
pageSha256: "fc16c0754ea2e615ecc956a3beb21a35f26b6b5dcb1943f3aea5655bc22ed19b"
contentMode: "local-full"
zh: ""
---

# Audio

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Domain Types

### Audio Model

- `AudioModel = "whisper-1" or "gpt-transcribe" or "gpt-4o-transcribe" or 3 more`

  - `"whisper-1"`

  - `"gpt-transcribe"`

  - `"gpt-4o-transcribe"`

  - `"gpt-4o-mini-transcribe"`

  - `"gpt-4o-mini-transcribe-2025-12-15"`

  - `"gpt-4o-transcribe-diarize"`

### Audio Response Format

- `AudioResponseFormat = "json" or "text" or "srt" or 3 more`

  The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, `vtt`, or `diarized_json`. For `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`, the only supported format is `json`. For `gpt-4o-transcribe-diarize`, the supported formats are `json`, `text`, and `diarized_json`, with `diarized_json` required to receive speaker annotations.

  - `"json"`

  - `"text"`

  - `"srt"`

  - `"verbose_json"`

  - `"vtt"`

  - `"diarized_json"`
