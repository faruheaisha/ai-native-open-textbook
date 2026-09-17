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
pageSha256: "ad6f844bfacf2495b7cb231bd79eed4df90e29aac13195891c54012f66dec81d"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Document Block

- `BetaManagedAgentsDocumentBlock object`

  Document content, either specified directly as base64 data, as text, or as a reference via a URL.

  - `type: "document"`

  - `source: BetaManagedAgentsBase64DocumentSource or BetaManagedAgentsPlainTextDocumentSource or BetaManagedAgentsURLDocumentSource or BetaManagedAgentsFileDocumentSource`

    Union type for document source variants.

    - `BetaManagedAgentsBase64DocumentSource object`

      Base64-encoded document data.

      - `type: "base64"`

      - `data: string`

        Base64-encoded document data.

        minLength: 1

      - `media_type: string`

        MIME type of the document (e.g., "application/pdf").

        minLength: 1

    - `BetaManagedAgentsPlainTextDocumentSource object`

      Plain text document content.

      - `type: "text"`

      - `data: string`

        The plain text content.

        minLength: 1

      - `media_type: "text/plain"`

        MIME type of the text content. Must be "text/plain".

    - `BetaManagedAgentsURLDocumentSource object`

      Document referenced by URL.

      - `type: "url"`

      - `url: string`

        URL of the document to fetch.

        minLength: 1

    - `BetaManagedAgentsFileDocumentSource object`

      Document referenced by file ID.

      - `type: "file"`

      - `file_id: string`

        ID of a previously uploaded file.

        minLength: 1

  - `context: optional string or null`

    Additional context about the document for the model.

  - `title: optional string or null`

    The title of the document.
