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
sourceRel: "docs/en/api/beta/sessions.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions.md"
sourceSha256: "e4a8446bb6d4b0344d7f996b22b5ecbd47536df1d7800ee2865d8dc67a16abc2"
pageSha256: "8b81f7a5e5e43dea077f307803e0e636afab686516f259929f075e288fe7df77"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents File Resource Params

- `BetaManagedAgentsFileResourceParams object`

  Mount a file uploaded via the Files API into the session.

  - `type: "file"`

  - `file_id: string`

    ID of a previously uploaded file.

    minLength: 1, maxLength: 128

  - `mount_path: optional string or null`

    Mount path in the container. Defaults to `/mnt/session/uploads/<file_id>`.

    minLength: 1, maxLength: 4096
