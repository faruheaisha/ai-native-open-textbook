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
sourceRel: "docs/en/api/beta/sessions/events.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/events.md"
sourceSha256: "f0e0c20f4abb8b0c003df5a7b79ed32e56eaa3f30efeb7e3c91931c3e4e1cb51"
pageSha256: "7d1f091d21611059c5191b20aac4cc1b5acd105c376d2169986c30042011585e"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Image Block

- `BetaManagedAgentsImageBlock object`

  Image content specified directly as base64 data or as a reference via a URL.

  - `type: "image"`

  - `source: BetaManagedAgentsBase64ImageSource or BetaManagedAgentsURLImageSource or BetaManagedAgentsFileImageSource`

    Union type for image source variants.

    - `BetaManagedAgentsBase64ImageSource object`

      Base64-encoded image data.

      - `type: "base64"`

      - `data: string`

        Base64-encoded image data.

        minLength: 1

      - `media_type: string`

        MIME type of the image (e.g., "image/png", "image/jpeg", "image/gif", "image/webp").

        minLength: 1

    - `BetaManagedAgentsURLImageSource object`

      Image referenced by URL.

      - `type: "url"`

      - `url: string`

        URL of the image to fetch.

        minLength: 1

    - `BetaManagedAgentsFileImageSource object`

      Image referenced by file ID.

      - `type: "file"`

      - `file_id: string`

        ID of a previously uploaded file.

        minLength: 1
