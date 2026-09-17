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
sourceRel: "api/reference/resources/audio/subresources/voice_consents/methods/update.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/audio/subresources/voice_consents/methods/update.md"
sourceSha256: "b105aeee9e076a62c8e0b1eba8e5c1d271ce0a17151e075f51b590c541260785"
pageSha256: "b105aeee9e076a62c8e0b1eba8e5c1d271ce0a17151e075f51b590c541260785"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Update voice consent

**post** `/audio/voice_consents/\{consent_id\}`

Updates a voice consent recording (metadata only).

### Path Parameters

- `consent_id: string`

### Body Parameters

- `name: string`

  The updated label for this consent recording.

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
curl https://api.openai.com/v1/audio/voice_consents/$CONSENT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "name"
        }'
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
curl https://api.openai.com/v1/audio/voice_consents/cons_1234 \
  -X POST \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe"
  }'
```
