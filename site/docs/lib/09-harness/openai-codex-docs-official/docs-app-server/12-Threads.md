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
pageSha256: "9d136624e4ae6f90d8fbb677978fcc06fb4da004a753d09e046b76f83895ec88"
contentMode: "local-full"
zh: ""
---

## Threads

- `thread/read` reads a stored thread without subscribing to it; set `includeTurns` to include turns.
- `thread/turns/list` is experimental and pages through a stored thread's turn history without
  resuming it. Use `itemsView` to choose whether turn items are omitted,
  summarized, or fully loaded.
- `thread/items/list` is experimental and pages through persisted thread items, optionally restricted to one turn.
- `thread/list` supports cursor pagination plus `modelProviders`, `sourceKinds`, `archived`, `isPinned`, `cwd`, `useStateDbOnly`, `searchTerm`, and experimental `parentThreadId` or `ancestorThreadId` filtering.
- `thread/loaded/list` returns the thread IDs currently in memory.
- `thread/archive` moves the thread's persisted JSONL log into the archived directory and attempts to archive spawned descendant thread logs that aren't already archived.
- `thread/delete` permanently deletes a persisted active or archived thread and its spawned descendant threads.
- `thread/metadata/update` patches stored thread metadata, including persisted `gitInfo` and `isPinned`.
- `thread/unsubscribe` unsubscribes the current connection from a loaded thread and can trigger `thread/closed` after an inactivity grace period.
- `thread/unarchive` restores an archived thread rollout back into the active sessions directory.
- `thread/compact/start` triggers compaction and returns `\{\}` immediately.
- `thread/rollback` is deprecated. It drops the last N turns from the in-memory context and records a rollback marker in the thread's persisted JSONL log.
- `thread/inject_items` appends raw Responses API items to a loaded thread's model-visible history without starting a user turn.

### Start or resume a thread

Start a fresh thread when you need a new Codex conversation.

```json
{ "method": "thread/start", "id": 10, "params": {
  "model": "gpt-5.6-terra",
  "cwd": "/Users/me/project",
  "approvalPolicy": "never",
  "sandbox": "workspaceWrite",
  "personality": "friendly",
  "serviceName": "my_app_server_client"
} }
{ "id": 10, "result": {
  "thread": {
    "id": "thr_123",
    "sessionId": "thr_123",
    "preview": "",
    "ephemeral": false,
    "modelProvider": "openai",
    "createdAt": 1730910000
  }
} }
{ "method": "thread/started", "params": { "thread": { "id": "thr_123" } } }
```

`serviceName` is optional. Set it when you want app-server to tag thread-level metrics with your integration's service name.

`thread/start`, `thread/resume`, and `thread/fork` return
`instructionSources`, an array of loaded instruction-file paths. Each path uses
its source environment's native absolute syntax, including for remote
environments.

Experimental clients can set `historyMode` on `thread/start` to `"legacy"`
(the default) or `"paginated"`. Paginated thread creation isn't supported yet
and returns JSON-RPC error `-32601`. App-server can list and read summaries for
existing paginated records, but full-history reads, turn pagination, and resume
fail closed until paginated history is supported.

Beta clients that opt into `capabilities.experimentalApi` can pass a named
permission-profile id in `permissions` instead of the legacy `sandbox` field.
Don't send `permissions` and `sandbox` together. Use
`permissionProfile/list` with the project `cwd` to discover available profiles
and whether managed requirements allow each one.

`thread.sessionId` identifies the current live session tree root. Root threads
use their own thread id as the session id; forked threads keep the session id
of the root they came from. Clients should read the session id from
`thread.sessionId` instead of deriving it from the thread id.

To continue a stored session, call `thread/resume` with the `thread.id` you recorded earlier. The response shape matches `thread/start`. You can also pass the same configuration overrides supported by `thread/start`, such as `personality`:

```json
{ "method": "thread/resume", "id": 11, "params": {
  "threadId": "thr_123",
  "personality": "friendly"
} }
{ "id": 11, "result": { "thread": { "id": "thr_123", "name": "Bug bash notes", "ephemeral": false } } }
```

Resuming a thread doesn't update `thread.updatedAt` (or the rollout file's modified time) by itself. The timestamp updates when you start a turn.

If you mark an enabled MCP server as `required` in config and that server fails to initialize, `thread/start` and `thread/resume` fail instead of continuing without it.

`dynamicTools` on `thread/start` is an experimental field (requires `capabilities.experimentalApi = true`). Codex persists these dynamic tools in the thread rollout metadata and restores them on `thread/resume` when you don't supply new dynamic tools.

If you resume with a different model than the one recorded in the rollout, Codex emits a warning and applies a one-time model-switch instruction on the next turn.

### Manage a thread goal

Use `thread/goal/set`, `thread/goal/get`, and `thread/goal/clear` to manage the
same persisted goal state surfaced by `/goal` in the TUI.

```json
{ "method": "thread/goal/set", "id": 13, "params": {
  "threadId": "thr_123",
  "objective": "Finish the migration and keep tests green",
  "status": "active",
  "tokenBudget": 40000
} }
{ "id": 13, "result": { "goal": {
  "threadId": "thr_123",
  "objective": "Finish the migration and keep tests green",
  "status": "active",
  "tokenBudget": 40000,
  "tokensUsed": 0,
  "timeUsedSeconds": 0
} } }
{ "method": "thread/goal/updated", "params": {
  "threadId": "thr_123",
  "goal": {
    "threadId": "thr_123",
    "objective": "Finish the migration and keep tests green",
    "status": "active",
    "tokenBudget": 40000,
    "tokensUsed": 0,
    "timeUsedSeconds": 0
  }
} }
```

Goal objectives must be non-empty and at most 4,000 characters. Supplying a new
objective replaces the goal and resets usage accounting. Supplying the current
non-terminal objective, or omitting `objective`, updates status or token budget
while preserving usage history.

To branch from a stored session, call `thread/fork` with the `thread.id`. This creates a new thread id and emits a `thread/started` notification for it. Pass
`lastTurnId` to copy history through that turn, inclusive, and omit later
turns:

```json
{ "method": "thread/fork", "id": 12, "params": { "threadId": "thr_123", "lastTurnId": "turn_456" } }
{ "id": 12, "result": { "thread": { "id": "thr_456", "sessionId": "thr_123", "forkedFromId": "thr_123" } } }
{ "method": "thread/started", "params": { "thread": { "id": "thr_456" } } }
```

App-server rejects an in-progress `lastTurnId`. If you omit the field while the
source thread is mid-turn, the fork records an interruption marker instead of
retaining an unmarked partial turn.

Pass `ephemeral: true` to create an in-memory fork without adding it to stored
thread listings:

```json
{
  "method": "thread/fork",
  "id": 13,
  "params": {
    "threadId": "thr_123",
    "ephemeral": true
  }
}
{
  "id": 13,
  "result": {
    "thread": {
      "id": "thr_789",
      "sessionId": "thr_789",
      "forkedFromId": "thr_123",
      "ephemeral": true
    }
  }
}
```

Ephemeral forks of paginated threads also require `excludeTurns: true`. That
field is experimental and requires `capabilities.experimentalApi = true`.

When a user-facing thread title has been set, app-server hydrates `thread.name` on `thread/list`, `thread/read`, `thread/resume`, `thread/unarchive`, and `thread/rollback` responses. `thread/start` and `thread/fork` may omit `name` (or return `null`) until a title is set later.

### Read a stored thread (without resuming)

Use `thread/read` when you want stored thread data but don't want to resume the thread or subscribe to its events.

- `includeTurns` - when `true`, the response includes the thread's turns; when `false` or omitted, you get the thread summary only.
- Returned `thread` objects include runtime `status` (`notLoaded`, `idle`, `systemError`, or `active` with `activeFlags`).

```json
{ "method": "thread/read", "id": 19, "params": { "threadId": "thr_123", "includeTurns": true } }
{ "id": 19, "result": { "thread": { "id": "thr_123", "name": "Bug bash notes", "ephemeral": false, "status": { "type": "notLoaded" }, "turns": [] } } }
```

Unlike `thread/resume`, `thread/read` doesn't load the thread into memory or emit `thread/started`.

### List thread turns

`thread/turns/list` is experimental. Use it to page a stored thread's turn history without resuming it. Results default to newest-first so clients can fetch older turns with `nextCursor`. The response also includes `backwardsCursor`; pass it as `cursor` with `sortDirection: "asc"` to fetch turns newer than the first item from the earlier page.

`itemsView` controls how much turn-item data the response includes:

- `notLoaded` omits items.
- `summary` returns summarized item data and is the default when omitted.
- `full` returns full item data.

```json
{ "method": "thread/turns/list", "id": 20, "params": {
  "threadId": "thr_123",
  "limit": 50,
  "sortDirection": "desc",
  "itemsView": "summary"
} }
{ "id": 20, "result": {
  "data": [],
  "nextCursor": "older-turns-cursor-or-null",
  "backwardsCursor": "newer-turns-cursor-or-null"
} }
```

`thread/items/list` is also experimental. It pages persisted items without
resuming the thread. Pass `turnId` to restrict results to one turn, or omit it
to page items across the thread. The active thread store must support item
pagination; otherwise, the server returns an unsupported-method error.

### List threads (with pagination & filters)

`thread/list` lets you render a history UI. Results default to newest-first by `createdAt`. Filters apply before pagination. Pass any combination of:

- `cursor` - opaque string from a prior response; omit for the first page.
- `limit` - server defaults to a reasonable page size if unset.
- `sortKey` - `created_at` (default), `updated_at`, or `recency_at`.
- `sortDirection` - `desc` (default) or `asc`.
- `modelProviders` - restrict results to specific providers; unset, null, or an empty array includes all providers.
- `sourceKinds` - restrict results to specific thread sources. When omitted or `[]`, the server defaults to interactive sources only: `cli` and `vscode`.
- `archived` - when `true`, list archived threads only. When `false` or omitted, list non-archived threads (default).
- `isPinned` - when provided, return only threads with the matching persisted pin state. Omit it to return pinned and unpinned threads.
- `cwd` - restrict results to threads whose session current working directory exactly matches this path, or one of the paths in an array. Relative paths resolve from the app-server process working directory.
- `useStateDbOnly` - when `true`, return state database results without scanning JSONL thread logs to repair metadata. Omit it or pass `false` for the default scan-and-repair behavior.
- `searchTerm` - restrict results to threads whose extracted title contains this case-sensitive text fragment.
- `parentThreadId` - restrict results to direct child threads of the given parent thread. This filter is experimental and requires `capabilities.experimentalApi = true`.
- `ancestorThreadId` - restrict results to spawned descendants of the given thread at any depth. This filter is experimental and requires `capabilities.experimentalApi = true`; don't combine it with `parentThreadId`.

`sourceKinds` accepts the following values:

- `cli`
- `vscode`
- `exec`
- `appServer`
- `subAgent`
- `subAgentReview`
- `subAgentCompact`
- `subAgentThreadSpawn`
- `subAgentOther`
- `unknown`

Example:

```json
{ "method": "thread/list", "id": 20, "params": {
  "cursor": null,
  "limit": 25,
  "sortKey": "created_at"
} }
{ "id": 20, "result": {
  "data": [
    { "id": "thr_a", "preview": "Create a TUI", "ephemeral": false, "isPinned": true, "modelProvider": "openai", "createdAt": 1730831111, "updatedAt": 1730831111, "name": "TUI prototype", "status": { "type": "notLoaded" } },
    { "id": "thr_b", "preview": "Fix tests", "ephemeral": false, "isPinned": false, "modelProvider": "openai", "createdAt": 1730750000, "updatedAt": 1730750000, "status": { "type": "notLoaded" } }
  ],
  "nextCursor": "opaque-token-or-null"
} }
```

When `nextCursor` is `null`, you have reached the final page.

### Update stored thread metadata

Use `thread/metadata/update` to patch stored thread metadata without resuming the
thread. Set `isPinned` to pin or unpin the thread, or update `gitInfo` to change
persisted Git metadata. Omitted fields stay unchanged; explicit `null` clears a
stored Git metadata value.

```json
{ "method": "thread/metadata/update", "id": 21, "params": {
  "threadId": "thr_123",
  "isPinned": true,
  "gitInfo": { "branch": "feature/sidebar-pr" }
} }
{ "id": 21, "result": {
  "thread": {
    "id": "thr_123",
    "isPinned": true,
    "gitInfo": { "sha": null, "branch": "feature/sidebar-pr", "originUrl": null }
  }
} }
```

### Track thread status changes

`thread/status/changed` is emitted whenever a loaded thread's runtime status changes. The payload includes `threadId` and the new `status`.

```json
{
  "method": "thread/status/changed",
  "params": {
    "threadId": "thr_123",
    "status": { "type": "active", "activeFlags": ["waitingOnApproval"] }
  }
}
```

### List loaded threads

`thread/loaded/list` returns thread IDs currently loaded in memory.

```json
{ "method": "thread/loaded/list", "id": 21 }
{ "id": 21, "result": { "data": ["thr_123", "thr_456"] } }
```

### Unsubscribe from a loaded thread

`thread/unsubscribe` removes the current connection's subscription to a thread. The response status is one of:

- `unsubscribed` when the connection was subscribed and is now removed.
- `notSubscribed` when the connection wasn't subscribed to that thread.
- `notLoaded` when the thread isn't loaded.

If this was the last subscriber, the server keeps the thread loaded until it has no subscribers and no thread activity for 30 minutes. When the grace period expires, app-server unloads the thread and emits a `thread/status/changed` transition to `notLoaded` plus `thread/closed`.

```json
{ "method": "thread/unsubscribe", "id": 22, "params": { "threadId": "thr_123" } }
{ "id": 22, "result": { "status": "unsubscribed" } }
```

If the thread later expires:

```json
{ "method": "thread/status/changed", "params": {
    "threadId": "thr_123",
    "status": { "type": "notLoaded" }
} }
{ "method": "thread/closed", "params": { "threadId": "thr_123" } }
```

### Archive a thread

Use `thread/archive` to move the persisted thread log (stored as a JSONL file on disk) into the archived sessions directory. Archiving a thread also attempts to archive spawned descendant threads that aren't already archived.

```json
{ "method": "thread/archive", "id": 22, "params": { "threadId": "thr_b" } }
{ "id": 22, "result": {} }
{ "method": "thread/archived", "params": { "threadId": "thr_b" } }
{ "method": "thread/archived", "params": { "threadId": "thr_child" } }
```

Archived threads won't appear in future calls to `thread/list` unless you pass `archived: true`. The server emits one `thread/archived` notification for each thread it actually archives; if a spawned descendant can't be archived, the request can still succeed without an archived notification for that descendant.

### Delete a thread

Use `thread/delete` to permanently delete a persisted active or archived thread
and its spawned descendant threads. The server removes existing rollout files and
associated metadata before returning success; missing rollout files are treated
as already deleted. Ephemeral root threads can't be deleted.

```json
{ "method": "thread/delete", "id": 23, "params": { "threadId": "thr_b" } }
{ "id": 23, "result": {} }
{ "method": "thread/deleted", "params": { "threadId": "thr_b" } }
{ "method": "thread/deleted", "params": { "threadId": "thr_child" } }
```

### Unarchive a thread

Use `thread/unarchive` to move an archived thread rollout back into the active sessions directory.

```json
{ "method": "thread/unarchive", "id": 24, "params": { "threadId": "thr_b" } }
{ "id": 24, "result": { "thread": { "id": "thr_b", "name": "Bug bash notes" } } }
{ "method": "thread/unarchived", "params": { "threadId": "thr_b" } }
```

### Trigger thread compaction

Use `thread/compact/start` to trigger manual history compaction for a thread. The request returns immediately with `\{\}`.

App-server emits progress as standard `turn/*` and `item/*` notifications on the same `threadId`, including a `contextCompaction` item lifecycle (`item/started` then `item/completed`).

```json
{ "method": "thread/compact/start", "id": 25, "params": { "threadId": "thr_b" } }
{ "id": 25, "result": {} }
```

### Run a thread shell command

Use `thread/shellCommand` for user-initiated shell commands that belong to a thread. The request returns immediately with `\{\}` while progress streams through standard `turn/*` and `item/*` notifications.

This API runs outside the sandbox with full access and doesn't inherit the thread sandbox policy. Clients should expose it only for explicit user-initiated commands.

If the thread already has an active turn, the command runs as an auxiliary action on that turn and its formatted output is injected into the turn's message stream. If the thread is idle, app-server starts a standalone turn for the shell command.

Set `timeoutMs` to limit execution time in milliseconds. Omitting it or passing
`null` uses the one-hour default. `0` requests an immediate timeout; negative
values are rejected. The timeout doesn't delay the immediate RPC acknowledgement.

```json
{ "method": "thread/shellCommand", "id": 26, "params": { "threadId": "thr_b", "command": "git status --short", "timeoutMs": 10000 } }
{ "id": 26, "result": {} }
```

### Clean background terminals

Use `thread/backgroundTerminals/clean` to stop all running background terminals associated with a thread. This method is experimental and requires `capabilities.experimentalApi = true`.

```json
{ "method": "thread/backgroundTerminals/clean", "id": 27, "params": { "threadId": "thr_b" } }
{ "id": 27, "result": {} }
```

Use `thread/backgroundTerminals/list` to inspect running background terminals
for a loaded thread. The request supports standard `cursor` and `limit`
pagination, and the returned `processId` is the app-server process id. This
method is experimental and requires `capabilities.experimentalApi = true`:

```json
{ "method": "thread/backgroundTerminals/list", "id": 28, "params": { "threadId": "thr_b" } }
{ "id": 28, "result": { "data": [
  {
    "itemId": "item_456",
    "processId": "42",
    "command": "python3 -m http.server",
    "cwd": "/workspace",
    "osPid": null,
    "cpuPercent": null,
    "rssKb": null
  }
], "nextCursor": null } }
```

Use `thread/backgroundTerminals/terminate` with that `processId` to stop one
background terminal. This method is experimental and requires
`capabilities.experimentalApi = true`:

```json
{ "method": "thread/backgroundTerminals/terminate", "id": 29, "params": { "threadId": "thr_b", "processId": "42" } }
{ "id": 29, "result": { "terminated": true } }
```

### Roll back recent turns

`thread/rollback` is deprecated and will be removed. It removes the last
`numTurns` entries from the in-memory context and persists a rollback marker in
the rollout log. The returned `thread` includes `turns` populated after the
rollback.

```json
{ "method": "thread/rollback", "id": 30, "params": { "threadId": "thr_b", "numTurns": 1 } }
{ "id": 30, "result": { "thread": { "id": "thr_b", "name": "Bug bash notes", "ephemeral": false } } }
```
