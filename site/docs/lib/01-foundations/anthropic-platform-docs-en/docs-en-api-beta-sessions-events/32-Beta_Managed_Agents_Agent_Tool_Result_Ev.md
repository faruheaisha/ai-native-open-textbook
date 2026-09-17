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
pageSha256: "00b2e09f5dd70c5f5f7ca0137dde5d3b05d80049767a2bfb1e64cea880d01726"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Tool Result Event

- `BetaManagedAgentsAgentToolResultEvent object`

  Event representing the result of an agent tool execution.

  - `type: "agent.tool_result"`

  - `id: string`

    Unique identifier for this event.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `tool_use_id: string`

    The id of the `agent.tool_use` event this result corresponds to.

  - `content: optional array of BetaManagedAgentsTextBlock or BetaManagedAgentsImageBlock or BetaManagedAgentsDocumentBlock or BetaManagedAgentsSearchResultBlock`

    The result content returned by the tool.

    - `BetaManagedAgentsTextBlock object`

      Regular text content.

      - `type: "text"`

      - `text: string`

        The text content.

        minLength: 1

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

    - `BetaManagedAgentsSearchResultBlock object`

      A block containing a web search result.

      - `type: "search_result"`

      - `citations: BetaManagedAgentsSearchResultCitations`

        Citation settings for a search result.

        - `enabled: boolean`

          Whether citations are enabled for this search result.

      - `content: array of BetaManagedAgentsSearchResultContent`

        Array of text content blocks from the search result.

        - `type: "text"`

        - `text: string`

          The text content.

          minLength: 1

      - `source: string`

        The URL source of the search result.

        minLength: 1

      - `title: string`

        The title of the search result.

        minLength: 1

  - `is_error: optional boolean or null`

    Whether the tool execution resulted in an error.
