---
title: "Voices"
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
pageSha256: "5febe20efb5a6ae134de8aa2f5a2349db1bb2b0bb479b4e161daad25ac8adda4"
contentMode: "local-full"
zh: ""
---

# Voices

## Create voice

**post** `/audio/voices`

Creates a custom voice.

### Returns

- `id: string`

  The voice identifier, which can be referenced in API endpoints.

- `created_at: number`

  The Unix timestamp (in seconds) for when the voice was created.

- `name: string`

  The name of the voice.

- `object: "audio.voice"`

  The object type, which is always `audio.voice`.

  - `"audio.voice"`

### Example

```http
curl https://api.openai.com/v1/audio/voices \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F 'audio_sample=@/path/to/audio_sample' \
    -F consent=consent \
    -F name=name
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "audio.voice"
}
```

### Example

```http
curl https://api.openai.com/v1/audio/voices \
  -X POST \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "name=My new voice" \
  -F "consent=cons_1234" \
  -F "audio_sample=@$HOME/audio_sample.wav;type=audio/x-wav"
```

## Domain Types

### Voice Create Response

- `VoiceCreateResponse object \{ id, created_at, name, object \}`

  A custom voice that can be used for audio output.

  - `id: string`

    The voice identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the voice was created.

  - `name: string`

    The name of the voice.

  - `object: "audio.voice"`

    The object type, which is always `audio.voice`.

    - `"audio.voice"`
