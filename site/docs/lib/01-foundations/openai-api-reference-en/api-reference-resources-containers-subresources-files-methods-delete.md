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
sourceRel: "api/reference/resources/containers/subresources/files/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/containers/subresources/files/methods/delete.md"
sourceSha256: "ece4a11527be667575dc607dae0b94799780eec5526211ab43707bf0d3843f97"
pageSha256: "ece4a11527be667575dc607dae0b94799780eec5526211ab43707bf0d3843f97"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete a container file

**delete** `/containers/\{container_id\}/files/\{file_id\}`

Delete Container File

### Path Parameters

- `container_id: string`

- `file_id: string`

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID/files/$FILE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/containers/cntr_682dfebaacac8198bbfe9c2474fb6f4a085685cbe3cb5863/files/cfile_682e0e8a43c88191a7978f477a09bdf5 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
    "id": "cfile_682e0e8a43c88191a7978f477a09bdf5",
    "object": "container.file.deleted",
    "deleted": true
}
```
