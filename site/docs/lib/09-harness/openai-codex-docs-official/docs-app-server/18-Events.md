---
title: "openai-codex-docs-official"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/app-server.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/app-server.md"
sourceSha256: "a72a5c88ab05ab9737ec28b432708f2776f696be48eae09ee39c02dd2f9480e0"
pageSha256: "9f6f77ba0d1d6e4f1d8ff16b7f6a977a386b2d57a2ec922974e6ad5b967c8af0"
contentMode: "local-full"
zh: ""
---

## Events

Event notifications are the server-initiated stream for thread lifecycles, turn lifecycles, and the items within them. After you start or resume a thread, keep reading the active transport stream for `thread/started`, `thread/archived`, `thread/unarchived`, `thread/closed`, `thread/status/changed`, `turn/*`, `item/*`, and `serverRequest/resolved` notifications.

### Notification opt-out

Clients can suppress specific notifications per connection by sending exact method names in `initialize.params.capabilities.optOutNotificationMethods`.

- Exact-match only: `item/agentMessage/delta` suppresses only that method.
- Unknown method names are ignored.
- Applies to the current `thread/*`, `turn/*`, `item/*`, and related v2 notifications.
- Doesn't apply to requests, responses, or errors.

### Fuzzy file search events (experimental)

The fuzzy file search session API emits per-query notifications:

- `fuzzyFileSearch/sessionUpdated` - `\{ sessionId, query, files \}` with the current matches for the active query.
- `fuzzyFileSearch/sessionCompleted` - `\{ sessionId \}` once indexing and matching for that query completes.

### Warning events

- `configWarning` - `\{ summary, details?, path?, range? \}` for recoverable
  configuration or initialization problems.
- `warning` - `\{ threadId?, message \}` for non-fatal runtime warnings.

### Windows sandbox setup events

- `windowsSandbox/setupCompleted` - `\{ mode, success, error \}` emitted after a `windowsSandbox/setupStart` request finishes.

### Turn events

- `turn/started` - `\{ turn \}` with the turn id, empty `items`, and `status: "inProgress"`.
- `turn/completed` - `\{ turn \}` where `turn.status` is `completed`, `interrupted`, or `failed`; failures carry `\{ error: \{ message, codexErrorInfo?, additionalDetails? \} \}`.
- `turn/diff/updated` - `\{ threadId, turnId, diff \}` with the latest aggregated unified diff across every file change in the turn.
- `turn/plan/updated` - `\{ turnId, explanation?, plan \}` whenever the agent shares or changes its plan; each `plan` entry is `\{ step, status \}` with `status` in `pending`, `inProgress`, or `completed`.
- `hook/started` and `hook/completed` - `\{ threadId, turnId?, run \}` when a synchronous lifecycle hook starts and when its final run summary is available. These notifications aren't emitted for asynchronous hooks.
- `model/safetyBuffering/updated` - `\{ threadId, turnId, model, useCases, reasons, showBufferingUi, fasterModel \}` when a response enters transient safety buffering.
- `model/rerouted` - `\{ threadId, turnId, fromModel, toModel, reason \}` when the service routes a request to another model.
- `model/verification` - `\{ threadId, turnId, verifications \}` when the service requires additional account verification.
- `thread/tokenUsage/updated` - usage updates for the active thread.

`turn/diff/updated` and `turn/plan/updated` currently include empty `items` arrays even when item events stream. Use `item/*` notifications as the source of truth for turn items.

### Items

`ThreadItem` is the tagged union carried in turn responses and `item/*` notifications. Common item types include:

- `userMessage` - `\{id, content\}` where `content` is a list of user inputs (`text`, `image`, or `localImage`).
- `functionCallOutput` - `\{id, name, namespace, output\}` for standalone tool output supplied through `turn/start.toolOutput`. `namespace` can be `null`.
- `agentMessage` - `\{id, text, phase?\}` containing the accumulated agent reply. When present, `phase` uses Responses API wire values (`commentary`, `final_answer`).
- `plan` - `\{id, text\}` containing proposed plan text in plan mode. Treat the final `plan` item from `item/completed` as authoritative.
- `reasoning` - `\{id, summary, content\}` where `summary` holds streamed reasoning summaries and `content` holds raw reasoning blocks.
- `commandExecution` - `\{id, command, cwd, status, commandActions, aggregatedOutput?, exitCode?, durationMs?\}`.
- `fileChange` - `\{id, changes, status\}` describing proposed edits; `changes` list `\{path, kind, diff\}`.
- `mcpToolCall` - `\{id, server, tool, status, arguments, appContext?, pluginId?, result?, error?\}`. For trusted MCP apps, `appContext` can include `connectorId`, `linkId`, `resourceUri`, `appName`, `templateId`, and the stable connector `actionName`. Older persisted items can omit newer metadata. Use `appContext.resourceUri` instead of the deprecated top-level `mcpAppResourceUri`.
- `dynamicToolCall` - `\{id, tool, arguments, status, contentItems?, success?, durationMs?\}` for client-executed dynamic tool invocations.
- `collabToolCall` - `\{id, tool, status, senderThreadId, receiverThreadId?, newThreadId?, prompt?, agentStatus?\}`.
- `webSearch` - `\{id, query, action?\}` for web search requests issued by the agent.
- `imageView` - `\{id, path\}` emitted when the agent invokes the image viewer tool.
- `enteredReviewMode` - `\{id, review\}` sent when the reviewer starts.
- `exitedReviewMode` - `\{id, review\}` emitted when the reviewer finishes.
- `contextCompaction` - `\{id\}` emitted when Codex compacts the conversation history.

For `webSearch.action`, the action `type` can be `search` (`query?`, `queries?`), `openPage` (`url?`), or `findInPage` (`url?`, `pattern?`).

The app server deprecates the legacy `thread/compacted` notification; use the `contextCompaction` item instead.

All items emit two shared lifecycle events:

- `item/started` - emits the full `item` when a new unit of work begins; the `item.id` matches the `itemId` used by deltas.
- `item/completed` - sends the final `item` once work finishes; treat this as the authoritative state.

### Item deltas

- `item/agentMessage/delta` - appends streamed text for the agent message.
- `item/plan/delta` - streams proposed plan text. The final `plan` item may not exactly equal the concatenated deltas.
- `item/reasoning/summaryTextDelta` - streams readable reasoning summaries; `summaryIndex` increments when a new summary section opens.
- `item/reasoning/summaryPartAdded` - marks a boundary between reasoning summary sections.
- `item/reasoning/textDelta` - streams raw reasoning text (when supported by the model).
- `item/commandExecution/outputDelta` - streams stdout/stderr for a command; append deltas in order.
- `item/fileChange/outputDelta` - deprecated compatibility notification for legacy `apply_patch` text output. Current app-server versions no longer emit it; use `fileChange` items and `turn/diff/updated` instead.
