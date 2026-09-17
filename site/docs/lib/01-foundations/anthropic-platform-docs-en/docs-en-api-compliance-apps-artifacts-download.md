---
title: "Download artifact content"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/compliance/apps/artifacts/download.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance/apps/artifacts/download.md"
sourceSha256: "f2720dd6373cb2d68a088e345bdf4d9d053b15d1db59f96d6e4834c84796522c"
pageSha256: "f2720dd6373cb2d68a088e345bdf4d9d053b15d1db59f96d6e4834c84796522c"
contentMode: "local-full"
zh: ""
---

# Download artifact content

**GET** `/v1/compliance/apps/artifacts/\{artifact_version_id\}/content`

Download the content of an artifact version for compliance purposes.

Returns the full text content of the artifact version.

## Path parameters

- `artifact_version_id: string`

  The artifact version ID (tagged ID, e.g., claude_artifact_version_abc123)

## Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

## Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/artifacts/$ARTIFACT_VERSION_ID/content \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
