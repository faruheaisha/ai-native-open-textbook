---
title: "Delete File"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/files/delete.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/files/delete.md"
sourceSha256: "0aa91179534a3a2954cfb3f5743fdaa605304f42031b607d4e41a1aa6abc1c90"
pageSha256: "0aa91179534a3a2954cfb3f5743fdaa605304f42031b607d4e41a1aa6abc1c90"
contentMode: "local-full"
zh: ""
---

# Delete File

**DELETE** `/v1/files/\{file_id\}`

Delete File

## Path parameters

- `file_id: string`

  ID of the File.

## Headers

- `"anthropic-workspace-id": optional string`

## Returns

- `DeletedFile object`

  - `type: optional "file_deleted"`

    Deleted object type.

    For file deletion, this is always `"file_deleted"`.

    default: file_deleted

  - `id: string`

    ID of the deleted file.

## Example

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "file_011CNha8iCJcU1wXNR6q4V8w",
  "type": "file_deleted"
}
```
