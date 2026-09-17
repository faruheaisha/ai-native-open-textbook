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
pageSha256: "4622e179e95b447171bab045f59e79785b70a165796f32e73d419e36fc1ea10c"
contentMode: "local-full"
zh: ""
---

## API overview

- `thread/start` - create a new thread; emits `thread/started` and automatically subscribes you to turn/item events for that thread.
- `thread/resume` - reopen an existing thread by id so later `turn/start` calls append to it.
- `thread/fork` - fork a thread into a new thread id by copying stored history. Pass `lastTurnId` to copy history through that turn and omit later turns, or `ephemeral: true` to create an in-memory fork. Emits `thread/started` for the new thread; returned threads include `forkedFromId` when available.
- `thread/read` - read a stored thread by id without resuming it; set `includeTurns` to return full turn history. Returned `thread` objects include runtime `status`.
- `thread/list` - page through stored thread logs; supports cursor-based pagination plus `modelProviders`, `sourceKinds`, `archived`, `isPinned`, `cwd`, `useStateDbOnly`, `searchTerm`, and experimental `parentThreadId` or `ancestorThreadId` filters. Returned `thread` objects include runtime `status`.
- `thread/turns/list` - experimental; page through a stored thread's turn history without resuming it. `itemsView` controls whether turn items are omitted, summarized, or fully loaded.
- `thread/items/list` - experimental; page through persisted thread items, optionally restricted to one `turnId`. The active thread store must support item pagination.
- `thread/loaded/list` - list the thread ids currently loaded in memory.
- `thread/name/set` - set or update a thread's user-facing name for a loaded thread or a persisted rollout; emits `thread/name/updated`.
- `thread/goal/set` - set the goal for a thread; emits `thread/goal/updated`.
- `thread/goal/get` - read the current goal for a thread.
- `thread/goal/clear` - clear the goal for a thread; emits `thread/goal/cleared`.
- `thread/metadata/update` - patch SQLite-backed stored thread metadata, including persisted `gitInfo` and `isPinned`.
- `thread/archive` - move a thread's log file into the archived directory and attempt to archive spawned descendant thread logs that aren't already archived; returns `\{\}` on success and emits `thread/archived` for each archived thread.
- `thread/delete` - permanently delete a persisted active or archived thread and any spawned descendant threads; returns `\{\}` on success and emits `thread/deleted` for each deleted thread.
- `thread/unsubscribe` - unsubscribe this connection from thread turn/item events. If this was the last subscriber, the server unloads the thread after a no-subscriber inactivity grace period and emits `thread/closed`.
- `thread/unarchive` - restore an archived thread rollout back into the active sessions directory; returns the restored `thread` and emits `thread/unarchived`.
- `thread/status/changed` - notification emitted when a loaded thread's runtime `status` changes.
- `thread/compact/start` - trigger conversation history compaction for a thread; returns `\{\}` immediately while progress streams via `turn/*` and `item/*` notifications.
- `thread/shellCommand` - run a user-initiated shell command against a thread. This runs outside the sandbox with full access and doesn't inherit the thread sandbox policy.
- `thread/backgroundTerminals/clean` - stop all running background terminals for a thread (experimental; requires `capabilities.experimentalApi`).
- `thread/backgroundTerminals/list` - list running background terminals for a loaded thread (experimental; requires `capabilities.experimentalApi`).
- `thread/backgroundTerminals/terminate` - terminate one running background terminal by app-server `processId` (experimental; requires `capabilities.experimentalApi`).
- `thread/rollback` - deprecated; drop the last N turns from the in-memory context and persist a rollback marker; returns the updated `thread`.
- `turn/start` - add user input or standalone tool output to a thread and begin Codex generation; responds with the initial `turn` and streams events. For `collaborationMode`, `settings.developer_instructions: null` means "use built-in instructions for the selected mode."
- `thread/inject_items` - append raw Responses API items to a loaded thread's model-visible history without starting a user turn.
- `turn/steer` - append user input to the active in-flight turn for a thread; returns the accepted `turnId`.
- `turn/interrupt` - request cancellation of an in-flight turn; success is `\{\}` and the turn ends with `status: "interrupted"`.
- `review/start` - kick off the Codex reviewer for a thread; emits `enteredReviewMode` and `exitedReviewMode` items.
- `command/exec` - run a single command under the server sandbox without starting a thread/turn.
- `command/exec/write` - write `stdin` bytes to a running `command/exec` session or close `stdin`.
- `command/exec/resize` - resize a running PTY-backed `command/exec` session.
- `command/exec/terminate` - stop a running `command/exec` session.
- `command/exec/outputDelta` (notify) - emitted for base64-encoded stdout/stderr chunks from a streaming `command/exec` session.
- `process/spawn` - start an explicit process session outside Codex's sandbox (experimental; requires `capabilities.experimentalApi`).
- `process/writeStdin` - write stdin bytes to a running `process/spawn` session or close stdin (experimental).
- `process/resizePty` - resize a running PTY-backed process session (experimental).
- `process/kill` - terminate a running process session (experimental).
- `process/outputDelta` and `process/exited` (notify) - emitted for streaming process output and process exit status (experimental).
- `model/list` - list available models (set `includeHidden: true` to include entries with `hidden: true`) with effort options, optional `upgrade`, and `inputModalities`.
- `modelProvider/capabilities/read` - read provider capability bounds for model/provider combinations.
- `experimentalFeature/list` - list feature flags with lifecycle stage metadata and cursor pagination.
- `experimentalFeature/enablement/set` - patch in-memory runtime settings for supported feature keys such as `apps` and `plugins`.
- `environment/info` - experimental; connect to a configured execution environment and return its shell plus default working directory.
- `permissionProfile/list` - list beta permission profiles and whether effective requirements allow them, with cursor pagination.
- `collaborationMode/list` - list collaboration mode presets (experimental, no pagination).
- `skills/list` - list skills for one or more `cwd` values (supports `forceReload` and optional `perCwdExtraUserRoots`).
- `skills/extraRoots/set` - replace the process-level extra roots used to discover standalone skills without persisting them.
- `skills/changed` (notify) - emitted when watched local skill files change.
- `hooks/list` - list discovered lifecycle hooks for one or more `cwd` values.
- `marketplace/add` - add a remote plugin marketplace and persist it into the user's marketplace config.
- `marketplace/remove` - remove a configured marketplace and its installed marketplace root when present.
- `marketplace/upgrade` - refresh a configured Git marketplace, or all configured Git marketplaces when you omit the marketplace name.
- `plugin/list` - under development; list discovered plugin marketplaces and plugin state, including install/auth policy metadata, marketplace load errors, featured plugin ids, and local, Git, package-registry, or remote plugin source metadata. Summaries can include remote `version`, local `localVersion`, structured light/dark icons, and `installPolicySource`, which can be `null`, `WORKSPACE_SETTING`, or `IMPLICIT_CANONICAL_APP` for current remote rows. Don't call this method from production clients yet.
- `plugin/read` - under development; read one plugin by marketplace path or remote marketplace name and plugin name, including bundled skills, apps, MCP server names, and a remote plugin `shareUrl` when the remote catalog provides one. Don't call this method from production clients yet.
- `plugin/install` - under development; install a plugin from a marketplace path or remote marketplace name. Don't call this method from production clients yet.
- `plugin/uninstall` - under development; uninstall an installed plugin. Don't call this method from production clients yet.
- `plugin/skill/read` - read remote plugin skill Markdown on demand by remote marketplace, plugin id, and skill name.
- `app/installed` - read installed app runtime state, including each app's effective enabled and callable states.
- `app/list` - list available apps (connectors) with pagination plus accessibility/enabled metadata.
- `app/read` - fetch metadata and optional display-only tool summaries for specific app ids.
- `skills/config/write` - enable or disable skills by path.
- `mcpServer/oauth/login` - start an OAuth login for a configured MCP server; returns an authorization URL and emits `mcpServer/oauthLogin/completed` on completion.
- `tool/requestUserInput` - prompt the user with 1-3 short questions for a tool call (experimental); questions can set `isOther` for a free-form option.
- `mcpServer/elicitation/request` (server request) - ask the client for structured form input or confirmation of a URL flow requested by an MCP server.
- `item/permissions/requestApproval` (server request) - ask the client to grant a subset of network or filesystem permissions requested by the built-in `request_permissions` tool.
- `config/mcpServer/reload` - reload MCP server configuration from disk and queue a refresh for loaded threads.
- `mcpServerStatus/list` - list MCP servers, tools, resources, and auth status (cursor + limit pagination). Use `detail: "full"` for full data or `detail: "toolsAndAuthOnly"` to omit resources.
- `mcpServer/resource/read` - read a single MCP resource through an initialized MCP server.
- `mcpServer/tool/call` - call a tool on a thread's configured MCP server.
- `mcpServer/startupStatus/updated` (notify) - emitted when a configured MCP server's startup status changes for a loaded thread.
- `windowsSandbox/setupStart` - start Windows sandbox setup for `elevated` or `unelevated` mode; returns quickly and later emits `windowsSandbox/setupCompleted`.
- `feedback/upload` - submit a feedback report (classification + optional reason/logs + conversation id, plus optional `extraLogFiles` attachments).
- `config/read` - fetch the effective configuration on disk after resolving configuration layering.
- `externalAgentConfig/detect` - detect external-agent artifacts that can be migrated with `includeHome` and optional `cwds`; each detected item includes `cwd` (`null` for home).
- `externalAgentConfig/import` - apply selected external-agent migration items by passing explicit `migrationItems` with `cwd` (`null` for home). Supported item types include config, skills, `AGENTS.md`, plugins, MCP server config, subagents, hooks, commands, and sessions; non-empty imports emit `externalAgentConfig/import/progress` and `externalAgentConfig/import/completed` as work finishes. Plugin and session imports can complete asynchronously.
- `config/value/write` - write a single configuration key/value to the user's `config.toml` on disk.
- `config/batchWrite` - apply configuration edits atomically to the user's `config.toml` on disk.
- `configRequirements/read` - fetch requirements from `requirements.toml` and/or MDM, including exact managed configuration, allowlists, pinned `featureRequirements`, and network requirements (or `null` if you haven't set any up).
- `fs/readFile`, `fs/writeFile`, `fs/createDirectory`, `fs/getMetadata`, `fs/readDirectory`, `fs/remove`, `fs/copy`, `fs/watch`, `fs/unwatch`, and `fs/changed` (notify) - operate on absolute filesystem paths through the app-server v2 filesystem API.

Plugin summaries include a `source` union. Local plugins return
`\{ "type": "local", "path": ... \}`, Git-backed marketplace entries return
`\{ "type": "git", "url": ..., "path": ..., "refName": ..., "sha": ... \}`,
package-registry entries return
`\{ "type": "npm", "package": ..., "version": ..., "registry": ... \}`, and
remote catalog entries return `\{ "type": "remote" \}`. For remote-only catalog
entries, `PluginMarketplaceEntry.path` can be `null`; pass
`remoteMarketplaceName` instead of `marketplacePath` when reading or installing
those plugins.
