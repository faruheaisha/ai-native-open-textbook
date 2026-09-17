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
sourceRel: "api/reference/resources/audio/subresources/voice_consents/methods/list.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/audio/subresources/voice_consents/methods/list.md"
sourceSha256: "88da367e6b01c3c8215f37096d04752b6e4ca726b496a75cf5a3ea5efe9142a6"
pageSha256: "88da367e6b01c3c8215f37096d04752b6e4ca726b496a75cf5a3ea5efe9142a6"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## List voice consents

**get** `/audio/voice_consents`

Returns a list of voice consent recordings.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of object \{ id, created_at, language, 2 more \}`

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

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string or null`

- `last_id: optional string or null`

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "cons_1234",
      "created_at": 0,
      "language": "language",
      "name": "name",
      "object": "audio.voice_consent"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents?limit=20 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```
