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
pageSha256: "9d142c7899dc36c25cb99db1edda739eb2f9f106261497a5c3a8e0db9b169839"
contentMode: "local-full"
zh: ""
---

## Organization › Spend Limits

### Set Spend Limit

**POST** `/v1/organizations/spend_limits`

Set a per-user spend limit override.

Upsert keyed on (scope, period): setting a limit that already exists
overwrites it in place. Only `scope.type: "user"` is accepted; seat-tier,
group, and organization-level defaults are configured in claude.ai.

#### Body parameters

- `amount: string or null`

  Limit amount as a non-negative integer decimal string in the minor unit of the organization's billing currency (cents for USD): "50000" is $500.00. `null` sets an explicit no-limit override for this scope and `period` only — each period resolves independently, so caps for other periods still apply.

- `scope: object`

  Scope selecting a single member of the organization.

  - `type: "user"`

    Scope type. Always `user` for this scope.

    default: user

  - `user_id: string`

    Tagged ID of the member the spend limit applies to.

- `period: optional "daily" or "monthly" or "weekly"`

  - `"daily"`

  - `"monthly"`

  - `"weekly"`

#### Returns

- `BetaSpendLimit object`

  A configured spend limit: a cap on metered spend for one scope and period.

  - `type: "spend_limit"`

    Object type. Always `spend_limit`.

    default: spend_limit

  - `id: string`

    Unique tagged ID of the spend limit (`spl_...`).

  - `amount: string or null`

    Limit amount as a non-negative integer decimal string in the minor unit of `currency` (cents for USD): "50000" is $500.00. `null` means no numeric cap is configured at this scope — see the effective report for whether a limit applies.

  - `created_at: string`

    RFC 3339 datetime at which the spend limit was created.

    format: date-time

  - `currency: string`

    ISO 4217 code of the organization's billing currency; the unit for `amount`.

  - `period: "daily" or "monthly" or "weekly"`

    Length of the window the limit resets over. `amount` caps spend within each period.

    - `"daily"`

    - `"monthly"`

    - `"weekly"`

  - `scope: object or object or object or 2 more`

    What the limit applies to. A tagged union on `type`; each variant carries the identifier for its scope.

    - `User object`

      Scope selecting a single member of the organization.

      - `type: "user"`

        Scope type. Always `user` for this scope.

        default: user

      - `user_id: string`

        Tagged ID of the member the spend limit applies to.

    - `SeatTier object`

      - `type: "seat_tier"`

        default: seat_tier

      - `seat_tier: string`

    - `RBACGroup object`

      - `type: "rbac_group"`

        default: rbac_group

      - `rbac_group_id: string`

    - `OrganizationService object`

      - `type: "organization_service"`

        default: organization_service

      - `service: string`

    - `Organization object`

      - `type: "organization"`

        default: organization

  - `updated_at: string`

    RFC 3339 datetime at which the spend limit was last modified.

    format: date-time

#### Example

```bash
curl https://api.anthropic.com/v1/organizations/spend_limits \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "amount": "50000",
          "scope": {
            "type": "user",
            "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q"
          },
          "period": "monthly"
        }'
```

##### Response (200)

```json
{
  "id": "id",
  "amount": "50000",
  "created_at": "2019-12-27T18:11:19.117Z",
  "currency": "USD",
  "period": "monthly",
  "scope": {
    "type": "user",
    "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q"
  },
  "type": "spend_limit",
  "updated_at": "2019-12-27T18:11:19.117Z"
}
```

### Get Spend Limit

**GET** `/v1/organizations/spend_limits/\{spend_limit_id\}`

Retrieve a spend limit by ID.

#### Path parameters

- `spend_limit_id: string`

  ID of the Spend Limit.

#### Returns

- `BetaSpendLimit object`

  A configured spend limit: a cap on metered spend for one scope and period.

  - `type: "spend_limit"`

    Object type. Always `spend_limit`.

    default: spend_limit

  - `id: string`

    Unique tagged ID of the spend limit (`spl_...`).

  - `amount: string or null`

    Limit amount as a non-negative integer decimal string in the minor unit of `currency` (cents for USD): "50000" is $500.00. `null` means no numeric cap is configured at this scope — see the effective report for whether a limit applies.

  - `created_at: string`

    RFC 3339 datetime at which the spend limit was created.

    format: date-time

  - `currency: string`

    ISO 4217 code of the organization's billing currency; the unit for `amount`.

  - `period: "daily" or "monthly" or "weekly"`

    Length of the window the limit resets over. `amount` caps spend within each period.

    - `"daily"`

    - `"monthly"`

    - `"weekly"`

  - `scope: object or object or object or 2 more`

    What the limit applies to. A tagged union on `type`; each variant carries the identifier for its scope.

    - `User object`

      Scope selecting a single member of the organization.

      - `type: "user"`

        Scope type. Always `user` for this scope.

        default: user

      - `user_id: string`

        Tagged ID of the member the spend limit applies to.

    - `SeatTier object`

      - `type: "seat_tier"`

        default: seat_tier

      - `seat_tier: string`

    - `RBACGroup object`

      - `type: "rbac_group"`

        default: rbac_group

      - `rbac_group_id: string`

    - `OrganizationService object`

      - `type: "organization_service"`

        default: organization_service

      - `service: string`

    - `Organization object`

      - `type: "organization"`

        default: organization

  - `updated_at: string`

    RFC 3339 datetime at which the spend limit was last modified.

    format: date-time

#### Example

```bash
curl https://api.anthropic.com/v1/organizations/spend_limits/$SPEND_LIMIT_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

##### Response (200)

```json
{
  "id": "id",
  "amount": "50000",
  "created_at": "2019-12-27T18:11:19.117Z",
  "currency": "USD",
  "period": "monthly",
  "scope": {
    "type": "user",
    "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q"
  },
  "type": "spend_limit",
  "updated_at": "2019-12-27T18:11:19.117Z"
}
```

### Delete Spend Limit

**DELETE** `/v1/organizations/spend_limits/\{spend_limit_id\}`

Delete a per-user spend limit override.

The member falls back to any inherited spend limit at that period.
Seat-tier, group, and organization-level rows cannot be deleted via
this endpoint.

#### Path parameters

- `spend_limit_id: string`

  ID of the Spend Limit.

#### Returns

- `type: "spend_limit_deleted"`

  default: spend_limit_deleted

- `id: string`

#### Example

```bash
curl https://api.anthropic.com/v1/organizations/spend_limits/$SPEND_LIMIT_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

##### Response (200)

```json
{
  "id": "id",
  "type": "spend_limit_deleted"
}
```

### List Effective Spend Limits

**GET** `/v1/organizations/spend_limits/effective`

List each member's effective spend limit and period-to-date spend.

Returns one row per (member, period) the member resolves a spend limit
for, with the `source` scope the spend limit was inherited from.
Paginates by member, so a member's periods never split across pages.

#### Query parameters

- `limit: optional number`

  Maximum number of members per page. A member's period rows never split across pages, so a page may carry more rows than this. Defaults to `20`.

  default: 20, maximum: 1000, minimum: 1

- `page: optional string`

  Opaque cursor from a previous response's `next_page` field.

- `period: optional array of "daily" or "monthly" or "weekly"`

  Restrict the report to these limit periods. Omit to return one row per period each member resolves a spend limit for.

  maxItems: 3

  - `"daily"`

  - `"monthly"`

  - `"weekly"`

- `user_ids: optional array of string`

  Restrict the report to these members, by tagged user ID (`user_...`). At most 100 entries.

  maxItems: 100

#### Returns

- `data: array of BetaSpendSummary`

  - `actor: object`

    A user within the organization. `name` and `email_address` are
    null when the underlying account is unavailable or has been deleted;
    `deleted` is true only for deleted accounts.

    - `type: "user_actor"`

      Actor type. Always `user_actor`.

      default: user_actor

    - `deleted: boolean`

      True only when the underlying account has been deleted.

      default: false

    - `email_address: string or null`

      The user's email address. Null when the account is unavailable or has been deleted.

    - `name: string or null`

      The user's current display name. Null when the account is unavailable, has been deleted, or has no name set.

    - `user_id: string`

      Tagged ID of the user.

  - `amount: string or null`

    Effective limit amount as a non-negative integer decimal string in the minor unit of `currency` (cents for USD). `null` means no limit applies for this row's `period` — each period resolves independently, so another period may still cap this member.

  - `currency: string`

    ISO 4217 code of the organization's billing currency; the unit for `amount` and `period_to_date_spend`.

  - `period: "daily" or "monthly" or "weekly"`

    Period this row's effective limit and spend are reported for.

    - `"daily"`

    - `"monthly"`

    - `"weekly"`

  - `period_to_date_spend: string`

    The member's spend so far in the current period, as a non-negative decimal string in the minor unit of `currency` (cents for USD). May carry fractional minor units up to three decimal places (e.g. `"12050.5"`) — metered usage is not rounded to whole cents. Reads as `"0"` when the spend reading is temporarily unavailable.

  - `scope: object`

    Scope selecting a single member of the organization.

    - `type: "user"`

      Scope type. Always `user` for this scope.

      default: user

    - `user_id: string`

      Tagged ID of the member the spend limit applies to.

  - `source: object or object or object or 2 more`

    Scope selecting a single member of the organization.

    - `User object`

      Scope selecting a single member of the organization.

      - `type: "user"`

        Scope type. Always `user` for this scope.

        default: user

      - `user_id: string`

        Tagged ID of the member the spend limit applies to.

    - `SeatTier object`

      - `type: "seat_tier"`

        default: seat_tier

      - `seat_tier: string`

    - `RBACGroup object`

      - `type: "rbac_group"`

        default: rbac_group

      - `rbac_group_id: string`

    - `OrganizationService object`

      - `type: "organization_service"`

        default: organization_service

      - `service: string`

    - `Organization object`

      - `type: "organization"`

        default: organization

  - `spend_limit_id: string`

- `next_page: string or null`

#### Example

```bash
curl https://api.anthropic.com/v1/organizations/spend_limits/effective \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

##### Response (200)

```json
{
  "data": [
    {
      "actor": {
        "deleted": true,
        "email_address": "email_address",
        "name": "name",
        "type": "user_actor",
        "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q"
      },
      "amount": "50000",
      "currency": "USD",
      "period": "monthly",
      "period_to_date_spend": "12050.5",
      "scope": {
        "type": "user",
        "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q"
      },
      "source": {
        "type": "user",
        "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q"
      },
      "spend_limit_id": "spend_limit_id"
    }
  ],
  "next_page": "next_page"
}
```
