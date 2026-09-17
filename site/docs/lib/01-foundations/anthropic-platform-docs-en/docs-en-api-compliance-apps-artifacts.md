---
title: "Artifacts"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/compliance/apps/artifacts.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance/apps/artifacts.md"
sourceSha256: "5fe4206156ccf3fb0045574135645143f7f07aeff38fd4e2ee636034892bcd8e"
pageSha256: "5fe4206156ccf3fb0045574135645143f7f07aeff38fd4e2ee636034892bcd8e"
contentMode: "local-full"
zh: ""
---

# Artifacts

## Get artifact metadata

**GET** `/v1/compliance/apps/artifacts/\{artifact_version_id\}`

Returns metadata for an artifact version, without the content body.

Use the sibling `/content` endpoint to fetch the artifact text. The
`md5` and `size_bytes` fields here are computed over the UTF-8
encoding of that text, so a DLP consumer can dedupe or match hashes
without downloading every artifact.

### Path parameters

- `artifact_version_id: string`

  The artifact version ID (tagged ID, e.g., claude_artifact_version_abc123)

### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

### Returns

- `id: string`

  Artifact ID e.g. 'claude_artifact_abc123'

- `artifact_type: string or null`

  MIME-like artifact type e.g. 'application/vnd.ant.code'

- `claude_chat_id: string`

  The chat this artifact belongs to

- `created_at: string`

  Artifact version creation timestamp

  format: date-time

- `md5: string`

  Lowercase hex MD5 of the artifact content (UTF-8 encoded). Matches the `content` field returned by the sibling `/content` endpoint.

- `size_bytes: number`

  Size in bytes of the artifact content (UTF-8 encoded)

- `title: string or null`

  Artifact title

- `version_id: string`

  Artifact version ID e.g. 'claude_artifact_version_abc123'

### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/artifacts/$ARTIFACT_VERSION_ID \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

#### Response (200)

```json
{
  "id": "id",
  "artifact_type": "artifact_type",
  "claude_chat_id": "claude_chat_id",
  "created_at": "2019-12-27T18:11:19.117Z",
  "md5": "md5",
  "size_bytes": 0,
  "title": "title",
  "version_id": "version_id"
}
```

## Download artifact content

**GET** `/v1/compliance/apps/artifacts/\{artifact_version_id\}/content`

Download the content of an artifact version for compliance purposes.

Returns the full text content of the artifact version.

### Path parameters

- `artifact_version_id: string`

  The artifact version ID (tagged ID, e.g., claude_artifact_version_abc123)

### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/artifacts/$ARTIFACT_VERSION_ID/content \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

## Domain types

### Artifact Retrieve Response

- `ArtifactRetrieveResponse object`

  Artifact version metadata for GET /v1/compliance/apps/artifacts/\{artifact_version_id\}.

  Returns metadata only. Use the sibling `/content` endpoint to fetch the
  artifact body.

  - `id: string`

    Artifact ID e.g. 'claude_artifact_abc123'

  - `artifact_type: string or null`

    MIME-like artifact type e.g. 'application/vnd.ant.code'

  - `claude_chat_id: string`

    The chat this artifact belongs to

  - `created_at: string`

    Artifact version creation timestamp

    format: date-time

  - `md5: string`

    Lowercase hex MD5 of the artifact content (UTF-8 encoded). Matches the `content` field returned by the sibling `/content` endpoint.

  - `size_bytes: number`

    Size in bytes of the artifact content (UTF-8 encoded)

  - `title: string or null`

    Artifact title

  - `version_id: string`

    Artifact version ID e.g. 'claude_artifact_version_abc123'
