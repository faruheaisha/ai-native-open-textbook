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
pageSha256: "4872b5348911469281c48c6845a1ee18b10a964a7d26e36de7192a2ea79e538f"
contentMode: "local-full"
zh: ""
---

## Turns

The `input` field accepts a list of items:

- `\{ "type": "text", "text": "Explain this diff" \}`
- `\{ "type": "image", "url": "https://.../design.png" \}`
- `\{ "type": "localImage", "path": "/tmp/screenshot.png" \}`

You can override configuration settings per turn (model, effort, personality, `cwd`, sandbox policy, summary). When specified, these settings become the defaults for later turns on the same thread. `outputSchema` applies only to the current turn. For `sandboxPolicy.type = "externalSandbox"`, set `networkAccess` to `restricted` or `enabled`; for `workspaceWrite`, `networkAccess` remains a boolean.

For `turn/start.collaborationMode`, `settings.developer_instructions: null` means "use built-in instructions for the selected mode" rather than clearing mode instructions.

### Sandbox read access (`ReadOnlyAccess`)

`sandboxPolicy` supports explicit read-access controls:

- `readOnly`: optional `access` (`\{ "type": "fullAccess" \}` by default, or restricted roots).
- `workspaceWrite`: optional `readOnlyAccess` (`\{ "type": "fullAccess" \}` by default, or restricted roots).

Restricted read access shape:

```json
{
  "type": "restricted",
  "includePlatformDefaults": true,
  "readableRoots": ["/Users/me/shared-read-only"]
}
```

On macOS, `includePlatformDefaults: true` appends a curated platform-default Seatbelt policy for restricted-read sessions. This improves tool compatibility without broadly allowing all of `/System`.

Examples:

```json
{ "type": "readOnly", "access": { "type": "fullAccess" } }
```

```json
{
  "type": "workspaceWrite",
  "writableRoots": ["/Users/me/project"],
  "readOnlyAccess": {
    "type": "restricted",
    "includePlatformDefaults": true,
    "readableRoots": ["/Users/me/shared-read-only"]
  },
  "networkAccess": false
}
```

### Start a turn

```json
{ "method": "turn/start", "id": 30, "params": {
  "threadId": "thr_123",
  "input": [ { "type": "text", "text": "Run tests" } ],
  "cwd": "/Users/me/project",
  "approvalPolicy": "unlessTrusted",
  "sandboxPolicy": {
    "type": "workspaceWrite",
    "writableRoots": ["/Users/me/project"],
    "networkAccess": true
  },
  "model": "gpt-5.6-terra",
  "effort": "medium",
  "summary": "concise",
  "personality": "friendly",
  "outputSchema": {
    "type": "object",
    "properties": { "answer": { "type": "string" } },
    "required": ["answer"],
    "additionalProperties": false
  }
} }
{ "id": 30, "result": { "turn": { "id": "turn_456", "status": "inProgress", "items": [], "error": null } } }
```

To start a turn with output from a tool your client ran, pass `toolOutput`
with a nonempty `name`, an optional `namespace`, and an `output` string or
array of content items. Set `input` to an empty array; you can't combine
`toolOutput` with nonempty user input.

```json
{
  "method": "turn/start",
  "id": 31,
  "params": {
    "threadId": "thr_123",
    "input": [],
    "toolOutput": {
      "name": "run_tests",
      "namespace": null,
      "output": "All 42 tests passed."
    }
  }
}
```

The output remains tool output in the conversation and appears as a
`functionCallOutput` item in notifications and persisted history. If a regular
turn is already active, Codex queues the output for that turn.

### Inject items into a thread

Use `thread/inject_items` to append prebuilt Responses API items to a loaded thread's prompt history without starting a user turn. These items are persisted to the rollout and included in subsequent model requests.

```json
{ "method": "thread/inject_items", "id": 31, "params": {
  "threadId": "thr_123",
  "items": [
    {
      "type": "message",
      "role": "assistant",
      "content": [{ "type": "output_text", "text": "Previously computed context." }]
    }
  ]
} }
{ "id": 31, "result": {} }
```

### Steer an active turn

Use `turn/steer` to append more user input to the active in-flight turn.

- Include `expectedTurnId`; it must match the active turn id.
- The request fails if there is no active turn on the thread.
- `turn/steer` doesn't emit a new `turn/started` notification.
- `turn/steer` doesn't accept turn-level overrides (`model`, `cwd`, `sandboxPolicy`, or `outputSchema`).

```json
{ "method": "turn/steer", "id": 32, "params": {
  "threadId": "thr_123",
  "input": [ { "type": "text", "text": "Actually focus on failing tests first." } ],
  "expectedTurnId": "turn_456"
} }
{ "id": 32, "result": { "turnId": "turn_456" } }
```

### Start a turn (invoke a skill)
