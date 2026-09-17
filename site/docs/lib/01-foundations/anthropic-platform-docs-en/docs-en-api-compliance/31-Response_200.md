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
sourceRel: "docs/en/api/compliance.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance.md"
sourceSha256: "8af66acb3141be9f44ca167f0bc76f30e333a12e3a466766363c4f330e5eed7d"
pageSha256: "fd4c2e39d6e8c30f4bdab7358d7434f44bb391ae2d751c19fdd5f141240a7b9d"
contentMode: "local-full"
zh: ""
---

##### Response (200)

```json
{
  "data": [
    {
      "id": "cart_01Tu9VwXyZaBcDeFgHiJkLmN",
      "organization_uuid": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
      "owner_user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
      "published_version_id": "1741803761-9f3a",
      "read_mode": "org",
      "updated_at": "2025-03-14T09:05:17.456789Z",
      "user": {
        "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
        "email_address": "jane.doe@example.com"
      },
      "versions": [
        {
          "id": "1741803761-9f3a",
          "created_at": "2025-03-12T18:22:41.123456Z",
          "name": "Team dashboard"
        }
      ]
    }
  ],
  "has_more": true,
  "next_page": "cGFnZV90b2tlbl9leGFtcGxlXzE3MzQ1Njc4OTA="
}
```

### Download Code Artifact Version Content

**GET** `/v1/compliance/apps/code/artifacts/\{artifact_id\}/versions/\{version_id\}`

Streams the content of one version of a Claude Code Artifact as the
response body.

Returns 404 for Artifacts that don't exist or belong to another parent
organization. A listed version id can start returning 404 if subsequent
publishes rotated it out of retained history — re-list on 404. Returns
503 while the version's content upload is
still in flight or was abandoned — retry with backoff. Oversized
encoded content aborts mid-stream: headers and initial bytes arrive
but the body terminates early — an aborted chunked transfer is the
only truncation signal for encoded content. `Content-MD5` is emitted
only for identity-stored content; validate against it when present.

#### Path parameters

- `artifact_id: string`

  The Artifact ID (tagged ID, e.g., cart_abc123)

- `version_id: string`

  Opaque version identifier from the Artifact's `versions` list

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/code/artifacts/$ARTIFACT_ID/versions/$VERSION_ID \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

### Delete Code Artifact

**DELETE** `/v1/compliance/apps/code/artifacts/\{artifact_id\}`

Permanently deletes a Code Artifact and all its versions. This is a
destructive operation that cannot be undone. A 200 response means the
deletion is initiated and the Artifact is claimed; content removal
completes asynchronously.

Returns 404 for Artifacts that don't exist or belong to another parent
organization. Returns 404 on a repeated delete of an already-deleted
Artifact.

#### Path parameters

- `artifact_id: string`

  The Artifact ID (tagged ID, e.g., cart_abc123)

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `type: "code_artifact_deleted"`

  Constant string confirming deletion

  default: code_artifact_deleted

- `id: string`

  The ID of the Artifact that was deleted

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/code/artifacts/$ARTIFACT_ID \
    -X DELETE \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
