---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization.md"
sourceSha256: "94290dadf163628ee70a57296045d482832b0d0670488cc9c3f0586427471f41"
pageSha256: "e96ecf103d5d34bd7c0f016f854aed93233f77e5a4450196cca684e18b58fc3d"
contentMode: "local-full"
zh: ""
---

## Get Current Organization

**GET** `/v1/organizations/me`

Retrieve information about the organization associated with the authenticated API key.

### Returns

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

### Example

```bash
curl https://api.anthropic.com/v1/organizations/me \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

#### Response (200)

```json
{
  "id": "12345678-1234-5678-1234-567812345678",
  "name": "Organization Name",
  "type": "organization"
}
```
