---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/audio/subresources/translations/methods/create.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/audio/subresources/translations/methods/create.md"
sourceSha256: "4f206d597e7b613c86ec0a856e55338e1b2f338f793b6ae07e18f54e44dcc5ec"
pageSha256: "4f206d597e7b613c86ec0a856e55338e1b2f338f793b6ae07e18f54e44dcc5ec"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Create translation

**post** `/audio/translations`

Translates audio into English.

### Returns

- `Translation object \{ text \}`

  - `text: string`

- `TranslationVerbose object \{ duration, language, text, segments \}`

  - `duration: number`

    The duration of the input audio.

  - `language: string`

    The language of the output translation (always `english`).

  - `text: string`

    The translated text.

  - `segments: optional array of TranscriptionSegment`

    Segments of the translated text and their corresponding details.

    - `id: number`

      Unique identifier of the segment.

    - `avg_logprob: number`

      Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

    - `compression_ratio: number`

      Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

    - `end: number`

      End time of the segment in seconds.

    - `no_speech_prob: number`

      Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

    - `seek: number`

      Seek offset of the segment.

    - `start: number`

      Start time of the segment in seconds.

    - `temperature: number`

      Temperature parameter used for generating the segment.

    - `text: string`

      Text content of the segment.

    - `tokens: array of number`

      Array of token IDs for the text content.

### Example

```http
curl https://api.openai.com/v1/audio/translations \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F 'file=@/path/to/file' \
    -F model=whisper-1
```

#### Response

```json
{
  "text": "text"
}
```

### Example

```http
curl https://api.openai.com/v1/audio/translations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/german.m4a" \
  -F model="whisper-1"
```

#### Response

```json
{
  "text": "Hello, my name is Wolfgang and I come from Germany. Where are you heading today?"
}
```
