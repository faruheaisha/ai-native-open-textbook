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
pageSha256: "26a311617219c52a94580f3987580ff1d424f69dc3c827bf21340d7f48364433"
contentMode: "local-full"
zh: ""
---

### Returns

- `BetaManagedAgentsSendSessionEvents object`

  Events that were successfully sent to the session.

  - `data: optional array of BetaManagedAgentsUserMessageEvent or BetaManagedAgentsUserInterruptEvent or BetaManagedAgentsUserToolConfirmationEvent or 4 more`

    Sent events

    - `BetaManagedAgentsUserMessageEvent object`

      A user message event in the session conversation.

      - `type: "user.message"`

      - `id: string`

        Unique identifier for this event.

      - `content: array of BetaManagedAgentsTextBlock or BetaManagedAgentsImageBlock or BetaManagedAgentsDocumentBlock or BetaManagedAgentsRedactedBlock`

        Array of content blocks comprising the user message.

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

      - `processed_at: optional string or null`

        A timestamp in RFC 3339 format

        format: date-time

    - `BetaManagedAgentsUserInterruptEvent object`

      An interrupt event that pauses agent execution and returns control to the user.

      - `type: "user.interrupt"`

      - `id: string`

        Unique identifier for this event.

      - `processed_at: optional string or null`

        A timestamp in RFC 3339 format

        format: date-time

      - `session_thread_id: optional string or null`

        If absent, interrupts every non-archived thread in a multiagent session (or the primary alone in a single-agent session). If present, interrupts only the named thread.

    - `BetaManagedAgentsUserToolConfirmationEvent object`

      A tool confirmation event that approves or denies a pending tool execution.

      - `type: "user.tool_confirmation"`

      - `id: string`

        Unique identifier for this event.

      - `result: "allow" or "deny"`

        UserToolConfirmationResult enum

        - `"allow"`

        - `"deny"`

      - `tool_use_id: string`

        The id of the `agent.tool_use` or `agent.mcp_tool_use` event this result corresponds to, which can be found in the last `session.status_idle` [event's](https://platform.claude.com/docs/en/api/beta/sessions/events/list#beta_managed_agents_session_requires_action.event_ids) `stop_reason.event_ids` field.

      - `deny_message: optional string or null`

        Optional message providing context for a 'deny' decision. Only allowed when result is 'deny'.

        maxLength: 10000

      - `processed_at: optional string or null`

        A timestamp in RFC 3339 format

        format: date-time

      - `session_thread_id: optional string or null`

        When set, the confirmation routes to this subagent's thread rather than the primary. Echo this from the `session_thread_id` on the `agent.tool_use` or `agent.mcp_tool_use` event that prompted the approval.

    - `BetaManagedAgentsUserCustomToolResultEvent object`

      Event sent by the client providing the result of a custom tool execution.

      - `type: "user.custom_tool_result"`

      - `id: string`

        Unique identifier for this event.

      - `custom_tool_use_id: string`

        The id of the `agent.custom_tool_use` event this result corresponds to, which can be found in the last `session.status_idle` [event's](https://platform.claude.com/docs/en/api/beta/sessions/events/list#beta_managed_agents_session_requires_action.event_ids) `stop_reason.event_ids` field.

      - `content: optional array of BetaManagedAgentsTextBlock or BetaManagedAgentsImageBlock or BetaManagedAgentsDocumentBlock or BetaManagedAgentsSearchResultBlock`

        The result content returned by the tool.

        - `BetaManagedAgentsTextBlock object`

          Regular text content.

        - `BetaManagedAgentsImageBlock object`

          Image content specified directly as base64 data or as a reference via a URL.

        - `BetaManagedAgentsDocumentBlock object`

          Document content, either specified directly as base64 data, as text, or as a reference via a URL.

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

      - `processed_at: optional string or null`

        A timestamp in RFC 3339 format

        format: date-time

      - `session_thread_id: optional string or null`

        Routes this result to a subagent thread. Copy from the `agent.custom_tool_use` event's `session_thread_id`.

    - `BetaManagedAgentsUserDefineOutcomeEvent object`

      Echo of a `user.define_outcome` input event. Carries the server-generated `outcome_id` that subsequent `span.outcome_evaluation_*` events reference.

      - `type: "user.define_outcome"`

      - `id: string`

        Unique identifier for this event.

      - `description: string`

        What the agent should produce. Copied from the input event.

      - `max_iterations: number or null`

        Evaluate-then-revise cycles before giving up. Default 3, max 20.

        format: int32

      - `outcome_id: string`

        Server-generated `outc_` ID for this outcome. Referenced by `span.outcome_evaluation_*` events and the session's `outcome_evaluations` list.

      - `processed_at: string`

        A timestamp in RFC 3339 format

        format: date-time

      - `rubric: BetaManagedAgentsFileRubric or BetaManagedAgentsTextRubric`

        Rubric for grading the quality of an outcome.

        - `BetaManagedAgentsFileRubric object`

          Rubric referenced by a file uploaded via the Files API.

          - `type: "file"`

          - `file_id: string`

            ID of the rubric file.

        - `BetaManagedAgentsTextRubric object`

          Rubric content provided inline as text.

          - `type: "text"`

          - `content: string`

            Rubric content. Plain text or markdown — the grader treats it as freeform text.

    - `BetaManagedAgentsUserToolResultEvent object`

      Event sent by the client providing the result of an agent-toolset tool execution. Only valid on `self_hosted` environments, where sandbox-routed tools are executed by the client rather than the server.

      - `type: "user.tool_result"`

      - `id: string`

        Unique identifier for this event.

      - `tool_use_id: string`

        The id of the `agent.tool_use` event this result corresponds to, which can be found in the last `session.status_idle` [event's](https://platform.claude.com/docs/en/api/beta/sessions/events/list#beta_managed_agents_session_requires_action.event_ids) `stop_reason.event_ids` field.

      - `content: optional array of BetaManagedAgentsTextBlock or BetaManagedAgentsImageBlock or BetaManagedAgentsDocumentBlock or BetaManagedAgentsSearchResultBlock`

        The result content returned by the tool.

        - `BetaManagedAgentsTextBlock object`

          Regular text content.

        - `BetaManagedAgentsImageBlock object`

          Image content specified directly as base64 data or as a reference via a URL.

        - `BetaManagedAgentsDocumentBlock object`

          Document content, either specified directly as base64 data, as text, or as a reference via a URL.

        - `BetaManagedAgentsSearchResultBlock object`

          A block containing a web search result.

      - `is_error: optional boolean or null`

        Whether the tool execution resulted in an error.

      - `processed_at: optional string or null`

        A timestamp in RFC 3339 format

        format: date-time

      - `session_thread_id: optional string or null`

        Routes this result to a subagent thread. Copy from the `agent.tool_use` event's `session_thread_id`.

    - `BetaManagedAgentsSystemMessageEvent object`

      A mid-conversation system message event. Carries system-role content that is appended to the session as a `role: "system"` turn.

      - `type: "system.message"`

      - `id: string`

        Unique identifier for this event.

      - `content: array of BetaManagedAgentsSystemContentBlock`

        System content blocks. Text-only.

        - `type: "text"`

        - `text: string`

          The text content.

          minLength: 1

      - `processed_at: optional string or null`

        A timestamp in RFC 3339 format

        format: date-time
