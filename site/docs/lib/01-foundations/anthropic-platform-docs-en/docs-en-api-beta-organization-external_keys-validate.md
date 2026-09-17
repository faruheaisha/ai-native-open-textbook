---
title: "Validate External Key"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/external_keys/validate.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/external_keys/validate.md"
sourceSha256: "5245891d5546ba9dbfcabfdbbfb107b81fb9fac8c292b5c93a9f98f92fd4b873"
pageSha256: "5245891d5546ba9dbfcabfdbbfb107b81fb9fac8c292b5c93a9f98f92fd4b873"
contentMode: "local-full"
zh: ""
---

# Validate External Key

**POST** `/v1/organizations/external_keys/\{external_key_id\}/validate`

Validate an external key config against the customer's KMS.

Anthropic performs an encrypt/decrypt roundtrip against the configured
KMS key and waits up to 30 seconds for the result. The response status is
`success` if the roundtrip succeeded, or `failure` with an error
message if it failed or timed out.

## Path parameters

- `external_key_id: string`

  ID of the External Key.

  maxLength: 2048

## Returns

- `type: "external_key_validation"`

  default: external_key_validation

- `error: string or null`

  Error message when status is `failure`. Null otherwise.

- `status: "failure" or "success"`

  `success` — encrypt/decrypt roundtrip succeeded. `failure` — the roundtrip failed or timed out; see `error`.

  - `"failure"`

  - `"success"`

## Example

```bash
curl https://api.anthropic.com/v1/organizations/external_keys/$EXTERNAL_KEY_ID/validate \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "error": "error",
  "status": "failure",
  "type": "external_key_validation"
}
```
