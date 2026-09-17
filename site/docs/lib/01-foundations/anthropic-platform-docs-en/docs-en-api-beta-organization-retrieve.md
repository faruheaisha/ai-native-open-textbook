---
title: "Get Current Organization"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/retrieve.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/retrieve.md"
sourceSha256: "6217256f61e293c671bf3392c1bcbb2d0fb1f932d8919b9096d89ce3489c84c4"
pageSha256: "6217256f61e293c671bf3392c1bcbb2d0fb1f932d8919b9096d89ce3489c84c4"
contentMode: "local-full"
zh: ""
---

# Get Current Organization

**GET** `/v1/organizations/me`

Retrieve information about the organization associated with the authenticated API key.

## Returns

- `BetaOrganization object`

  - `type: "organization"`

    Object type.

    For Organizations, this is always `"organization"`.

    default: organization

  - `id: string`

    ID of the Organization.

    format: uuid

  - `name: string`

    Name of the Organization.

## Example

```bash
curl https://api.anthropic.com/v1/organizations/me \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "12345678-1234-5678-1234-567812345678",
  "name": "Organization Name",
  "type": "organization"
}
```
