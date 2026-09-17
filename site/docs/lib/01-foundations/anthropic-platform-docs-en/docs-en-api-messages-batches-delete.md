---
title: "Delete a Message Batch"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/messages/batches/delete.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/messages/batches/delete.md"
sourceSha256: "0fff07beff87c95f9f3fc4cb1a561a73dd344941045130b5cd5abfcce3f37d1f"
pageSha256: "0fff07beff87c95f9f3fc4cb1a561a73dd344941045130b5cd5abfcce3f37d1f"
contentMode: "local-full"
zh: ""
---

# Delete a Message Batch

**DELETE** `/v1/messages/batches/\{message_batch_id\}`

Delete a Message Batch.

Message Batches can only be deleted once they've finished processing. If you'd like to delete an in-progress batch, you must first cancel it.

Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

## Path parameters

- `message_batch_id: string`

  ID of the Message Batch.

## Headers

- `"anthropic-workspace-id": optional string`

## Returns

- `DeletedMessageBatch object`

  - `type: "message_batch_deleted"`

    Deleted object type.

    For Message Batches, this is always `"message_batch_deleted"`.

    default: message_batch_deleted

  - `id: string`

    ID of the Message Batch.

## Example

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
  "type": "message_batch_deleted"
}
```
