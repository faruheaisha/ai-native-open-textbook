---
title: "Delete Spend Limit"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/spend_limits/delete.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/spend_limits/delete.md"
sourceSha256: "cfc282484a3e654b64d55f8a48c683a6acc9d7a621ab36b5c548d3853717a8e4"
pageSha256: "cfc282484a3e654b64d55f8a48c683a6acc9d7a621ab36b5c548d3853717a8e4"
contentMode: "local-full"
zh: ""
---

# Delete Spend Limit

**DELETE** `/v1/organizations/spend_limits/\{spend_limit_id\}`

Delete a per-user spend limit override.

The member falls back to any inherited spend limit at that period.
Seat-tier, group, and organization-level rows cannot be deleted via
this endpoint.

## Path parameters

- `spend_limit_id: string`

  ID of the Spend Limit.

## Returns

- `type: "spend_limit_deleted"`

  default: spend_limit_deleted

- `id: string`

## Example

```bash
curl https://api.anthropic.com/v1/organizations/spend_limits/$SPEND_LIMIT_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "id",
  "type": "spend_limit_deleted"
}
```
