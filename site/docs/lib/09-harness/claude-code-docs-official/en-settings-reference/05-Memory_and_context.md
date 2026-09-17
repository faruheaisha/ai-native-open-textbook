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
sourceRel: "en/settings-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/settings-reference.md"
sourceSha256: "811cfad7d21b8ebbbd64aeb288e903c6720594286d2a21d2b787639b7ab0ac1b"
pageSha256: "b25eb5577eadfcf4b1f015993bdb9f5eef8da664373618f60b11dad69c43d14a"
contentMode: "local-full"
zh: ""
---

## Memory and context

Control what Claude Code loads into context, how it compacts, and where it keeps memory and plans. See [Manage context](https://code.claude.com/docs/en/context-window) and [Memory](https://code.claude.com/docs/en/memory).

### `autoCompactEnabled`

Have Claude Code [compact the conversation automatically](https://code.claude.com/docs/en/context-window#when-your-context-fills-up) when context approaches the limit. Appears in `/config` as **Auto-compact**, and toggling it there writes this key to your user settings.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code compacts the conversation automatically when context approaches the limit
  * `false`: Claude Code doesn't compact automatically
* **Default**: `true`
* **Per-session overrides**: [`DISABLE_AUTO_COMPACT`](https://code.claude.com/docs/en/env-vars) turns auto-compact off for one session; whichever of the two turns it off, the other can't turn it back on

```json settings.json theme={null}
{
  "autoCompactEnabled": false
}
```

The manual `/compact` command keeps working while auto-compact is off.

### `autoCompactWindow`

Set how full the context window gets before Claude Code [compacts automatically](https://code.claude.com/docs/en/context-window#when-your-context-fills-up).

* **Scope**: [`Any file`](#scopes)
* **Type**: number of tokens, from `100000` to `1000000`. Claude Code caps the value at your model's context window; the [models overview](https://platform.claude.com/docs/en/about-claude/models/overview) lists each model's window
* **Default**: unset, so Claude Code picks a window tuned for your model
* **Per-session overrides**: [`--autocompact`](https://code.claude.com/docs/en/cli-reference#cli-flags) takes precedence over this key for one session, and [`CLAUDE_CODE_AUTO_COMPACT_WINDOW`](https://code.claude.com/docs/en/env-vars) takes precedence over both

```json settings.json theme={null}
{
  "autoCompactWindow": 500000
}
```

Set it with the [`/autocompact`](https://code.claude.com/docs/en/commands#all-commands) command, which writes this key to your user settings. [Set the auto-compact window](https://code.claude.com/docs/en/model-config#set-the-auto-compact-window) covers how the command, flag, variable, and setting interact.

### `autoMemoryDirectory`

Store [auto memory](https://code.claude.com/docs/en/memory#storage-location) in a directory of your choice instead of the per-project default.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, an absolute or `~/`-prefixed directory path
* **Default**: unset, so Claude Code uses `~/.claude/projects/<project>/memory/`

```json settings.json theme={null}
{
  "autoMemoryDirectory": "~/my-memory-dir"
}
```

From project or local settings, Claude Code honors this key under the same [workspace trust rule as hooks](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder), since a cloned repository can supply those files.

### `autoMemoryEnabled`

Turn [auto memory](https://code.claude.com/docs/en/memory#enable-or-disable-auto-memory) on or off. When `false`, Claude doesn't read from or write to the auto memory directory. You can also toggle it with `/memory` during a session, which writes this key to your user settings.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: the same as unset; auto memory stays on unless something that outranks this key turns it off for the session, such as `--bare`, safe mode, or `CLAUDE_CODE_DISABLE_AUTO_MEMORY`
  * `false`: Claude doesn't read from or write to the auto memory directory
* **Default**: `true`
* **Per-session overrides**: [`CLAUDE_CODE_DISABLE_AUTO_MEMORY`](https://code.claude.com/docs/en/env-vars) takes precedence over this key for one session, in either direction

```json settings.json theme={null}
{
  "autoMemoryEnabled": false
}
```

### `bashOutputMaxChars`

Set how many characters of a successful Bash or PowerShell command's [output Claude receives inline](https://code.claude.com/docs/en/tools-reference#output-limits). When output passes the limit, Claude Code saves it to a file and Claude receives a short preview plus the file's path. Raise the limit when command output, such as a verbose build or a full test-suite log, routinely overflows the default and you want Claude to read it without opening the file. Requires Claude Code v2.1.261 or later.

* **Scope**: [`Any file`](#scopes)
* **Type**: number of characters, a positive integer. Claude Code clamps the value into the range `4000` to `128000`
* **Default**: unset, so Claude receives up to 30,000 characters inline

```json settings.json theme={null}
{
  "bashOutputMaxChars": 100000
}
```

When you set this key, Claude Code ignores the [`BASH_MAX_OUTPUT_LENGTH`](https://code.claude.com/docs/en/env-vars) environment variable.

### `claudeMd`

Inject CLAUDE.md-style instructions as organization-managed memory without deploying a separate file. Claude Code loads the text as a managed memory entry ahead of user and project CLAUDE.md files.

* **Scope**: [`Managed`](#scopes)
* **Type**: string, the text of a CLAUDE.md file; write it as you would the file, Markdown included, with line breaks as `\n`
* **Default**: unset

This example deploys two rules as a short Markdown list:

```json managed-settings.json theme={null}
{
  "claudeMd": "# Engineering rules\n\n- Always run make lint before committing.\n- Never push directly to main."
}
```

See [Deploy organization-wide CLAUDE.md](https://code.claude.com/docs/en/memory#deploy-organization-wide-claude-md).

### `claudeMdExcludes`

Skip specific `CLAUDE.md` files when Claude Code loads [memory](https://code.claude.com/docs/en/memory#exclude-specific-claude-md-files). In a large monorepo, use it to skip CLAUDE.md files from other teams that aren't relevant to your work; [Exclude irrelevant CLAUDE.md files](https://code.claude.com/docs/en/large-codebases#exclude-irrelevant-claude-md-files) in the large-codebases guide walks through that case. Patterns match against absolute file paths.

* **Scope**: [`Any file`](#scopes)
* **Type**: array of strings, each a glob pattern or absolute path
* **Default**: unset, so Claude Code loads every CLAUDE.md it finds

```json settings.json theme={null}
{
  "claudeMdExcludes": ["**/vendor/**/CLAUDE.md"]
}
```

Exclusions apply only to user, project, and local memory files; managed policy CLAUDE.md files can't be excluded.

&lt;span id="environment-variables" />

### `env`

Set environment variables for every session and for the subprocesses Claude Code starts from it. Any variable in the [environment variables reference](https://code.claude.com/docs/en/env-vars) can go here, which is how you apply one to every session or roll it out to your team.

* **Scope**: [`Any file`](#scopes)
* **Type**: object mapping variable names to string values
* **Default**: unset

This example turns off automatic compaction and routes API requests through a proxy:

```json settings.json theme={null}
{
  "env": {
    "DISABLE_AUTO_COMPACT": "1",
    "ANTHROPIC_BASE_URL": "https://proxy.example.com"
  }
}
```

#### How `env` values interact with your shell

* A value here overwrites the same variable exported in your shell, and when more than one settings file sets a variable, the [highest-precedence](https://code.claude.com/docs/en/settings#settings-precedence) one applies.
* To cancel a shell export, set the variable to `""`. Claude Code treats an empty value as unset for provider selection, and subprocesses inherit the empty value.
* `NO_COLOR` and `FORCE_COLOR` set here reach only subprocesses. To change Claude Code's own interface colors, set them in your shell before launching `claude`.
* Values here are plain text in the settings file and reach every subprocess Claude Code starts. For an OTLP bearer token that rotates, use [`otelHeadersHelper`](#otelheadershelper); for API credentials, use [`apiKeyHelper`](#apikeyhelper).

#### When Claude Code applies `env` values

* From user settings, `--settings`, and managed settings: at startup, and again in the running session when a saved change alters the merged `env`.
* From project and local settings: after you trust the workspace, or at startup in `-p` mode, which never shows the trust dialog, and again when a saved change alters the merged `env`.
* Variables Claude Code classifies as safe, such as model selection, timeouts and limits, feature toggles, and telemetry settings: at startup from every settings file, apart from the [variables project and local settings can't set](#variables-claude-code-ignores-in-env).
* After you [move the session with `/cd`](https://code.claude.com/docs/en/permissions#move-the-session-to-another-directory) on v2.1.246 or later: the new directory's project and local `env` values, on top of the previous directory's.

#### Variables Claude Code ignores in `env`

* Project and local settings can't set variables that a checked-out repository shouldn't control; set those in your shell, user settings, or managed settings instead. Claude Code drops each one and logs a warning you can see with `claude --debug`. They include:

  * Variables that choose where Claude Code stores or writes its own files: `CLAUDE_CONFIG_DIR`, `CLAUDE_CODE_TMPDIR`, and the operating-system directory variables such as `HOME`, `TMPDIR`, `TMP`, `TEMP`, and the `XDG_*` family.
  * Variables that export session content: [`OTEL_LOG_RAW_API_BODIES`](https://code.claude.com/docs/en/env-vars#variables) and the detailed beta tracing pair `ENABLE_BETA_TRACING_DETAILED` and `BETA_TRACING_ENDPOINT`.
  * Variables that change how Claude Code starts or syncs, such as `CLAUDE_CODE_PROCESS_WRAPPER`, `CLAUDE_CODE_SYNC_SKILLS`, `CLAUDE_CODE_SYNC_PLUGINS`, `CLAUDE_CODE_PLUGIN_CACHE_DIR`, and `CLAUDE_CODE_PLUGIN_SEED_DIR`.

  Before v2.1.251, project and local settings could set every variable this list names except `HOME`, `XDG_CONFIG_HOME`, and the variables that change how Claude Code starts or syncs.
* Identity variables that Claude Code's hosting environments own, such as `CLAUDE_CODE_REMOTE` and `CLAUDE_CODE_ACCOUNT_UUID`, are ignored from every file.
* [`CLAUDE_CODE_MESSAGING_SOCKET` and `CLAUDE_CODE_MESSAGING_TOKEN`](https://code.claude.com/docs/en/env-vars#variables), which Claude Code exports itself, are ignored from every file. Ignoring the socket variable requires Claude Code v2.1.224 or later, and ignoring the token requires v2.1.228 or later.
* [`CLAUDE_CODE_PROJECT_DIR_NAME`](https://code.claude.com/docs/en/sessions#name-the-project-directory-yourself), which Claude Code reads from the launch environment only, is ignored from every file; requires v2.1.234 or later.
* [`CLAUDE_CODE_RESTRICTED`](https://code.claude.com/docs/en/env-vars#variables), which Claude Code reads from the launch environment only, is ignored from every file.

### `fileCheckpointingEnabled`

Have Claude Code snapshot files before each edit so [`/rewind`](https://code.claude.com/docs/en/checkpointing) can restore them. Appears in `/config` as **Rewind code (checkpoints)**, and toggling it there writes this key to your user settings.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code snapshots files before each edit so `/rewind` can restore them
  * `false`: Claude Code doesn't snapshot files, so `/rewind` can't restore them
* **Default**: `true`
* **Per-session overrides**: [`CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING`](https://code.claude.com/docs/en/env-vars) turns checkpointing off for one session; whichever of the two turns it off, the other can't turn it back on

```json settings.json theme={null}
{
  "fileCheckpointingEnabled": false
}
```

In a `-p` run or an Agent SDK session, Claude Code ignores this key. The SDK turns checkpointing on with its `enableFileCheckpointing` option, and a bare `-p` run needs `CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING=true`. See [File checkpointing in the Agent SDK](https://code.claude.com/docs/en/agent-sdk/file-checkpointing).

### `plansDirectory`

Choose where Claude Code stores the plan files it writes in [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode). Claude Code resolves the path relative to the project root and keeps the default when the path resolves outside it.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, a path relative to the project root
* **Default**: unset, so Claude Code uses `~/.claude/plans`

```json settings.json theme={null}
{
  "plansDirectory": "./plans"
}
```

### `skillListingBudgetFraction`

Each turn, Claude sees a [listing of your skills](https://code.claude.com/docs/en/skills#skill-descriptions-are-cut-short) with their descriptions, and Claude Code caps that listing at a share of the context window. When the listing is over the cap, Claude Code keeps every skill's name but drops the descriptions of the least-used skills, so Claude can still invoke those skills but is less likely to choose one on its own. Raise this key to keep more descriptions visible at the cost of more context per turn.

* **Scope**: [`Any file`](#scopes)
* **Type**: number, a fraction greater than `0` and at most `1`
* **Default**: `0.01`, which reserves 1% of the context window

```json settings.json theme={null}
{
  "skillListingBudgetFraction": 0.02
}
```

To see how much context the listing uses and which skills contribute most, run `/doctor`.

### `skillListingMaxDescChars`

Each turn, Claude sees a [listing of your skills](https://code.claude.com/docs/en/skills#skill-descriptions-are-cut-short) that shows each skill's `description` and `when_to_use` text. This key caps how many characters of that text Claude Code shows per skill; longer text is cut at the cap.

* **Scope**: [`Any file`](#scopes)
* **Type**: number of characters, a positive integer
* **Default**: `1536`

```json settings.json theme={null}
{
  "skillListingMaxDescChars": 2048
}
```

Raise it to keep long descriptions intact at the cost of more context per turn; lower it to fit more skills under [`skillListingBudgetFraction`](#skilllistingbudgetfraction).

### `taskOutputMaxChars`

Set how many characters of a [background task's](https://code.claude.com/docs/en/tools-reference#background-commands) output Claude receives inline when Claude reads the task with the `TaskOutput` tool. When a finished task's output is longer, Claude receives the most recent characters. Raise the limit when your background tasks routinely produce more output than the default. Requires Claude Code v2.1.261 or later.

* **Scope**: [`Any file`](#scopes)
* **Type**: number of characters, a positive integer. Claude Code clamps the value into the range `4000` to `128000`
* **Default**: unset, so Claude receives up to 32,000 characters inline

```json settings.json theme={null}
{
  "taskOutputMaxChars": 100000
}
```

When you set this key, Claude Code ignores the [`TASK_MAX_OUTPUT_LENGTH`](https://code.claude.com/docs/en/env-vars) environment variable.
