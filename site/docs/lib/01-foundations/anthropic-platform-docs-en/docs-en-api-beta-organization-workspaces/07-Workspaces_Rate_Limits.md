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
sourceRel: "docs/en/api/beta/organization/workspaces.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/workspaces.md"
sourceSha256: "59ead53aa38c708a91f6d122366be8911a47357f3e5c1e6f0e2be4106cc78c73"
pageSha256: "1082813eff48353225bdae9bab370ae69c22fb192cb79e00a56b7dec448a9af6"
contentMode: "local-full"
zh: ""
---

## Workspaces › Rate Limits

### List Workspace Rate Limits

**GET** `/v1/organizations/workspaces/\{workspace_id\}/rate_limits`

List rate-limit overrides configured for a workspace.

Returns only the groups and limiter types that have a workspace-level
override. Groups without overrides inherit the organization limits and
are not listed; use `GET /v1/organizations/rate_limits` to see those.

When `limit` is omitted, every matching entry is returned in a single
page; when `limit` truncates the result, follow `next_page` to fetch
the remaining entries.

#### Path parameters

- `workspace_id: string`

  The ID of the workspace.

#### Query parameters

- `group_type: optional "batch" or "files" or "model_group" or 3 more`

  Filter by group type.

  - `"batch"`

  - `"files"`

  - `"model_group"`

  - `"skills"`

  - `"token_count"`

  - `"web_search"`

- `limit: optional number`

  Maximum number of items to return per page. Ranges from `1` to `1000`.

  When omitted, every remaining entry is returned in a single page and `next_page` is `null`.

  maximum: 1000, minimum: 1

- `page: optional string`

  Opaque cursor from a previous response's `next_page`.

#### Returns

- `data: array of BetaWorkspaceRateLimit`

  Rate-limit entries for the workspace, one per group that has at least one override.

  - `type: "workspace_rate_limit"`

    Object type. Always `workspace_rate_limit` for workspace rate-limit entries.

    default: workspace_rate_limit

  - `group_type: "batch" or "files" or "model_group" or 3 more`

    The kind of rate-limit group this entry represents. `model_group` entries apply to a family of models (listed in `models`); other values apply to an API-surface category and have `models` set to `null`.

    - `"batch"`

    - `"files"`

    - `"model_group"`

    - `"skills"`

    - `"token_count"`

    - `"web_search"`

  - `limits: array of BetaWorkspaceRateLimitValue`

    The limiter values overridden for this group in this workspace. Limiter types without a workspace override are omitted and inherit the organization value.

    - `type: string`

      The limiter type (for example, `requests_per_minute` or `input_tokens_per_minute`).

    - `org_limit: number or null`

      The organization-level value for the same limiter type, for reference. `null` when the organization has no limit configured for this limiter type.

    - `value: number`

      The workspace-level override value for this limiter type.

  - `models: array of string or null`

    Model names this entry's limits apply to, including aliases. `null` when `group_type` is not `"model_group"`.

  - `rate_limit_id: string`

    The `id` of the RateLimit group this override applies to.

  - `workspace_id: string`

    ID of the Workspace this override applies to.

- `next_page: string or null`

  Opaque cursor for the next page of results, or `null` when no entries remain beyond this response.

#### Example

```bash
curl https://api.anthropic.com/v1/organizations/workspaces/$WORKSPACE_ID/rate_limits \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

##### Response (200)

```json
{
  "data": [
    {
      "group_type": "batch",
      "limits": [
        {
          "org_limit": 0,
          "type": "type",
          "value": 0
        }
      ],
      "models": [
        "string"
      ],
      "rate_limit_id": "rate_limit_id",
      "type": "workspace_rate_limit",
      "workspace_id": "workspace_id"
    }
  ],
  "next_page": "next_page"
}
```
