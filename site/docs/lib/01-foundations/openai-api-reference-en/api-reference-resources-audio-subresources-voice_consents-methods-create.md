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
sourceRel: "api/reference/resources/audio/subresources/voice_consents/methods/create.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/audio/subresources/voice_consents/methods/create.md"
sourceSha256: "25a330537ff997efa786c6f6863b986b46c72a9939f4f7b86a0246d41812f65c"
pageSha256: "25a330537ff997efa786c6f6863b986b46c72a9939f4f7b86a0246d41812f65c"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Create voice consent

**post** `/audio/voice_consents`

Upload a voice consent recording.

### Returns

- `id: string`

  The consent recording identifier.

- `created_at: number`

  The Unix timestamp (in seconds) for when the consent recording was created.

- `language: string`

  The BCP 47 language tag for the consent phrase (for example, `en-US`).

- `name: string`

  The label provided when the consent recording was uploaded.

- `object: "audio.voice_consent"`

  The object type, which is always `audio.voice_consent`.

  - `"audio.voice_consent"`

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F language=language \
    -F name=name \
    -F 'recording=@/path/to/recording'
```

#### Response

```json
{
  "id": "cons_1234",
  "created_at": 0,
  "language": "language",
  "name": "name",
  "object": "audio.voice_consent"
}
```

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents \
  -X POST \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "name=John Doe" \
  -F "language=en-US" \
  -F "recording=@$HOME/consent_recording.wav;type=audio/x-wav"
```
