---
title: "Delete External Key"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/external_keys/delete.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/external_keys/delete.md"
sourceSha256: "238ae37ec1ee81c80c73fc13fefdae70f504e42bf28a8eba3be133e859e50686"
pageSha256: "238ae37ec1ee81c80c73fc13fefdae70f504e42bf28a8eba3be133e859e50686"
contentMode: "local-full"
zh: ""
---

# Delete External Key

**DELETE** `/v1/organizations/external_keys/\{external_key_id\}`

Delete an external key config.

The request is rejected if any workspace still references this config.

## Path parameters

- `external_key_id: string`

  ID of the External Key.

  maxLength: 2048

## Returns

- `type: "external_key_deleted"`

  default: external_key_deleted

- `id: string`

  ID of the deleted External Key.

## Example

```bash
curl https://api.anthropic.com/v1/organizations/external_keys/$EXTERNAL_KEY_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "ekey_01AbCdEfGhIjKlMnOpQrStUv",
  "type": "external_key_deleted"
}
```
