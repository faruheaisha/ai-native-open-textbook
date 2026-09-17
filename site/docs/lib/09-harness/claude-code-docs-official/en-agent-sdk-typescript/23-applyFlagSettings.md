---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/typescript.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/typescript.md"
sourceSha256: "305f751e4d47db29303c15a79aa95777deff6625785b12533072bc0548010547"
pageSha256: "e301c0b5ac03ef2d4e71f0e9792862676c353690a6e61299f3fa9e5b2268a822"
contentMode: "local-full"
zh: ""
---

#### `applyFlagSettings()`

Changes [settings](https://code.claude.com/docs/en/settings) on a running session without restarting the query. Use it when a setting that has no dedicated setter needs to change mid-session, such as tightening `permissions` after the agent reads untrusted input. `setModel()` and `setPermissionMode()` are dedicated setters for those two keys; `applyFlagSettings()` is the general form that accepts any subset of the settings keys, and passing `model` here behaves the same as `setModel()`.

Only some keys take effect mid-session:

* **Applied on the next turn**: `effortLevel`, `ultracode`, `permissions`, `hooks`, `skillOverrides`, `fastMode`, `agent`. Switching `agent` also applies that agent's model override and hooks on the next turn. Its system prompt applies on the next turn, or, in a session that [reuses a recorded system prompt](https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts#change-the-prompt-of-an-existing-session), once the session is compacted.
* **Applied during the current turn**: `model`. If you switch `model` while Claude is working on a turn, the response Claude is already generating finishes on the old model, and the rest of the turn, starting with the next call Claude Code makes to the model, uses the new one. Subagents keep their own model. Before v2.1.212, a mid-turn switch waited for the next turn.
* **No effect mid-session**: the system prompt options. These are resolved once at startup, so the running session keeps the original value even though the call succeeds. To change them, start a new session.

`effortLevel` accepts an [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) name. It also accepts `"ultracode"`, which requests `xhigh` effort with [ultracode](https://code.claude.com/docs/en/workflows#let-claude-decide-with-ultracode) on. `applyFlagSettings()` declares `effortLevel` without that value, so pass the equivalent `\{ ultracode: true \}` in TypeScript. The `ultracode` value requires Claude Code v2.1.203 or later and is accepted only by `applyFlagSettings()`, not by the `effortLevel` key in a settings file.

The values are written to the flag-settings layer, the same layer the inline `settings` option of `query()` populates at startup. This is the same tier the [on-page precedence section](#settings-precedence) calls programmatic options.

Successive calls shallow-merge top-level keys. A second call with `\{ permissions: \{...\} \}` replaces the entire `permissions` object from the prior call rather than deep-merging into it. To clear a key from the flag layer and fall back to lower-precedence sources, pass `null` for that key. Passing `undefined` has no effect because JSON serialization drops it.

Only available in streaming input mode, the same constraint as `setModel()` and `setPermissionMode()`.

The example below switches the active model mid-session, then clears the override so the model falls back to whatever the user or project settings specify.

```typescript theme={null}
import { query } from "@anthropic-ai/claude-agent-sdk";

const q = query({ prompt: messageStream });

// Override the model for the rest of the session
await q.applyFlagSettings({ model: "claude-opus-4-6" });

// Later: clear the override and fall back to lower-precedence settings
await q.applyFlagSettings({ model: null });
```

  `applyFlagSettings()` is TypeScript-only. The Python SDK does not expose an equivalent method.

### `WarmQuery`

Handle returned by [`startup()`](#startup). The subprocess is already spawned and initialized, so calling `query()` on this handle writes the prompt directly to a ready process with no startup latency.

```typescript theme={null}
interface WarmQuery extends AsyncDisposable {
  query(prompt: string | AsyncIterable<SDKUserMessage>): Query;
  close(): void;
}
```
