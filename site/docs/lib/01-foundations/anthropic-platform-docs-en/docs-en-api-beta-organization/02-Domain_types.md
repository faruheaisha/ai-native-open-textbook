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
pageSha256: "264512949d8e8c91f90cfee1ae08d2e6745dde6ebf5b8c72f748bd3a0710a80f"
contentMode: "local-full"
zh: ""
---

## Domain types

### Beta Organization

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

### Beta Organization Role

- `BetaOrganizationRole = "admin" or "billing" or "claude_code_user" or 6 more`

  - `"admin"`

  - `"billing"`

  - `"claude_code_user"`

  - `"developer"`

  - `"managed"`

  - `"membership_admin"`

  - `"owner"`

  - `"primary_owner"`

  - `"user"`
