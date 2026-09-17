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
sourceRel: "api/reference/resources/audio/subresources/voice_consents/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/audio/subresources/voice_consents/methods/delete.md"
sourceSha256: "cfe62213d6985b5b85077cc41e5bdfb1fd1bd36fe819085aabf3d824aa0cb382"
pageSha256: "cfe62213d6985b5b85077cc41e5bdfb1fd1bd36fe819085aabf3d824aa0cb382"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete voice consent

**delete** `/audio/voice_consents/\{consent_id\}`

Deletes a voice consent recording.

### Path Parameters

- `consent_id: string`

### Returns

- `id: string`

  The consent recording identifier.

- `deleted: boolean`

- `object: "audio.voice_consent"`

  - `"audio.voice_consent"`

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents/$CONSENT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "cons_1234",
  "deleted": true,
  "object": "audio.voice_consent"
}
```

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents/cons_1234 \
  -X DELETE \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```
