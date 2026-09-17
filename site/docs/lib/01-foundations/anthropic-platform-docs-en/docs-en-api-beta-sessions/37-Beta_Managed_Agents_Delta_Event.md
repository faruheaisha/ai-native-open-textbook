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
pageSha256: "af4d7be7583d7fbcb9785989e4300e5d8a8050dd0b3be47a0dfc6d2ed8e89461"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Delta Event

- `BetaManagedAgentsDeltaEvent object`

  An incremental update to an event that is still being streamed. Deltas are best-effort and may stop early; when the buffered event with id == event_id is produced it carries the complete content. A model request that ends early (an error or interrupt) produces no buffered event — its terminal span.model_request_end closes the preview. Only sent on stream connections that opt in via event_deltas; never appears in event history.

  - `type: "event_delta"`

  - `delta: BetaManagedAgentsDeltaContent`

    One fragment of the previewed event. The delta type is named for the previewed event's field it streams into: agent.message events stream content_delta fragments, each a partial element of the content array.

    - `type: "content_delta"`

    - `content: BetaManagedAgentsTextBlock`

      Regular text content.

      - `type: "text"`

      - `text: string`

        The text content.

        minLength: 1

    - `index: optional number`

      Which entry in the previewed event's content array this fragment lands in. Insert content as that entry when the index is new; append to the existing entry otherwise.

      format: uint32

  - `event_id: string`

    The id of the event being previewed. Matches event.id on the corresponding event_start and the buffered event that reconciles the preview.
