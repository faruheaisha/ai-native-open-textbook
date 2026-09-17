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
pageSha256: "4e0e4841b85660a1faf25fe39c5314020652be8a333bb26e4ec063e193e17d87"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Thread Message Received Event

- `BetaManagedAgentsAgentThreadMessageReceivedEvent object`

  Delivery event written to the target thread's input stream when an agent-to-agent message arrives.

  - `type: "agent.thread_message_received"`

  - `id: string`

    Unique identifier for this event.

  - `content: array of BetaManagedAgentsTextBlock or BetaManagedAgentsImageBlock or BetaManagedAgentsDocumentBlock or BetaManagedAgentsRedactedBlock`

    Message content blocks.

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

    - `BetaManagedAgentsRedactedBlock object`

      Placeholder for content withheld by Anthropic model policy.

      - `type: "redacted"`

  - `from_session_thread_id: string`

    Public `sthr_` ID of the thread that sent the message.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `from_agent_name: optional string or null`

    Name of the callable agent this message came from. Absent when received from the primary agent.
