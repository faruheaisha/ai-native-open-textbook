---
title: "Download File"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/files/download.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/files/download.md"
sourceSha256: "74f6c8470bd1d17c1aca6567430fd02f5f36de4451cad36117fff299a8bd1d1c"
pageSha256: "74f6c8470bd1d17c1aca6567430fd02f5f36de4451cad36117fff299a8bd1d1c"
contentMode: "local-full"
zh: ""
---

# Download File

**GET** `/v1/files/\{file_id\}/content`

Download File

## Path parameters

- `file_id: string`

  ID of the File.

## Headers

- `"anthropic-workspace-id": optional string`

## Example

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID/content \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```
