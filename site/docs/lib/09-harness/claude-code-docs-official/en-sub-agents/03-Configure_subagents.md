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
sourceRel: "en/sub-agents.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sub-agents.md"
sourceSha256: "73532b0b6accc67223319be1b24adec1e3b41a9d96a580770694ce718437d2bc"
pageSha256: "3da6d87acde4ef2734df10d1d09e7c802cce87b7ce21adaeb2509c0d3311316e"
contentMode: "local-full"
zh: ""
---

## Configure subagents

A subagent's file location determines who it's available to, and its frontmatter determines what it can do. This section covers where subagent files live and every field they support.

### Choose the subagent scope

Store subagent files in different locations depending on scope. When multiple subagents share the same name, Claude Code uses the one from the higher-priority location.

| Location                     | Scope                   | Priority    | How to create                                 |
| :--------------------------- | :---------------------- | :---------- | :-------------------------------------------- |
| Managed settings             | Organization-wide       | 1 (highest) | Deployed via [managed settings](https://code.claude.com/docs/en/settings) |
| `--agents` CLI flag          | Current session         | 2           | Pass JSON when launching Claude Code          |
| `.claude/agents/`            | Current project         | 3           | Ask Claude, or create the file manually       |
| `~/.claude/agents/`          | All your projects       | 4           | Ask Claude, or create the file manually       |
| Plugin's `agents/` directory | Where plugin is enabled | 5 (lowest)  | Installed with [plugins](https://code.claude.com/docs/en/plugins)         |

**Project subagents** (`.claude/agents/`) are ideal for subagents specific to a codebase. Check them into version control so your team can use and improve them collaboratively.

Project subagents are discovered by walking up from the current working directory, so every `.claude/agents/` between there and the repository root is scanned. As of v2.1.178, when more than one of these nested directories defines the same `name`, Claude Code uses the definition closest to the working directory.

When you add a directory with `--add-dir` or `/add-dir`, Claude Code also loads its `.claude/agents/` folder, alongside your project subagents. See [Additional directories](https://code.claude.com/docs/en/permissions#additional-directories-grant-file-access-not-configuration) for which other configuration types load from `--add-dir`. To share subagents across projects without `--add-dir`, use `~/.claude/agents/` or a [plugin](https://code.claude.com/docs/en/plugins).

**User subagents** (`~/.claude/agents/`) are personal subagents available in all your projects.

Claude Code scans `.claude/agents/` and `~/.claude/agents/` recursively, so you can organize definitions into subfolders such as `agents/review/` or `agents/research/`. The subdirectory path doesn't affect how a subagent is identified or invoked, because identity comes only from the `name` frontmatter field.

Keep `name` values unique across the whole tree: if two files under the same `.claude/agents/` directory, including its subfolders, declare the same name, Claude Code loads only one of them, chosen by filesystem read order rather than a documented precedence. Across nested project directories, the definition closest to the working directory wins, as described above. The [`/doctor`](https://code.claude.com/docs/en/commands#all-commands) setup checkup reports files in the same directory that share a name and proposes renaming or removing all but one. Before v2.1.205, `/doctor` opened a diagnostics screen that listed duplicates and showed which definition was active.

Plugin `agents/` directories are also scanned recursively. Unlike project and user scopes, a subfolder inside a plugin's `agents/` directory becomes part of the [scoped identifier](#invoke-subagents-explicitly): a file at `agents/review/security.md` in plugin `my-plugin` registers as `my-plugin:review:security`.

**CLI-defined subagents** are passed as JSON when launching Claude Code. They exist only for that session and aren't saved to disk, making them useful for quick testing or automation scripts. You can define multiple subagents in a single `--agents` call:

    ```bash theme=\{null\}
    claude --agents '\{
      "code-reviewer": \{
        "description": "Expert code reviewer. Use proactively after code changes.",
        "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
        "tools": ["Read", "Grep", "Glob", "Bash"],
        "model": "sonnet"
      \},
      "debugger": \{
        "description": "Debugging specialist for errors and test failures.",
        "prompt": "You are an expert debugger. Analyze errors, identify root causes, and provide fixes."
      \}
    \}'
    ```

    ```powershell theme=\{null\}
    claude --agents @'
    \{
      "code-reviewer": \{
        "description": "Expert code reviewer. Use proactively after code changes.",
        "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
        "tools": ["Read", "Grep", "Glob", "Bash"],
        "model": "sonnet"
      \},
      "debugger": \{
        "description": "Debugging specialist for errors and test failures.",
        "prompt": "You are an expert debugger. Analyze errors, identify root causes, and provide fixes."
      \}
    \}
    '@
    ```

The `--agents` flag accepts JSON with a `prompt` field plus these [frontmatter](#supported-frontmatter-fields) fields: `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `mcpServers`, `hooks`, `maxTurns`, `skills`, `initialPrompt`, `memory`, `effort`, `background`, and `isolation`. Use `prompt` for the system prompt, equivalent to the markdown body in file-based subagents. Each top-level key in the JSON is the agent's name. Don't start a name with `-`.

For what Claude Code does with a value it can't load, and the flags and environment variable that skip that check, see [`Invalid --agents configuration`](https://code.claude.com/docs/en/errors#invalid-agents-configuration).

**Managed subagents** are deployed by organization administrators. Place markdown files in `.claude/agents/` inside the [managed settings directory](https://code.claude.com/docs/en/managed-settings#delivery-mechanisms), using the same frontmatter format as project and user subagents. Managed definitions take precedence over project and user subagents with the same name.

**Plugin subagents** come from [plugins](https://code.claude.com/docs/en/plugins) you've installed. They load automatically alongside your custom subagents and appear in the @-mention typeahead under their scoped name. See the [plugin components reference](https://code.claude.com/docs/en/plugins-reference#agents) for details on creating plugin subagents.

  For security reasons, plugin subagents don't support the `hooks`, `mcpServers`, or `permissionMode` frontmatter fields. These fields are ignored when loading agents from a plugin. If you need them, copy the agent file into `.claude/agents/` or `~/.claude/agents/`. You can also add rules to [`permissions.allow`](https://code.claude.com/docs/en/settings-reference#permissions-allow) in `settings.json` or `settings.local.json`, but these rules apply to the entire session, not only the plugin subagent.

Subagent definitions from any of these scopes are also available to [agent teams](https://code.claude.com/docs/en/agent-teams#use-subagent-definitions-for-teammates): when spawning a teammate, you can reference a subagent type, and Claude Code applies parts of that definition to the teammate. See [agent teams](https://code.claude.com/docs/en/agent-teams#use-subagent-definitions-for-teammates) for which parts apply in each display mode.

### Write subagent files

Subagent files use YAML frontmatter for configuration, followed by the system prompt in Markdown:

  Claude Code watches `~/.claude/agents/` and `.claude/agents/`. When you add or edit a subagent file on disk, or ask Claude to write one for you, Claude Code detects the change within a few seconds and the next delegation uses the updated definition, with no restart needed.

  Three cases still need a restart:

  * The watcher covers only directories that existed when the session started, so after creating a scope's first agent file in a new `agents` directory, restart to load it.
  * Claude Code doesn't watch `.claude/agents/` inside directories added with `--add-dir` or `/add-dir`, so after adding or editing a subagent there, restart to load the change.
  * Sessions started with `--disable-slash-commands` don't watch these directories at all.

```markdown .claude/agents/code-reviewer.md theme={null}
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

The frontmatter defines the subagent's metadata and configuration. The body becomes the system prompt that guides the subagent's behavior. Subagents receive only this system prompt plus basic environment details like the working directory, not the Claude Code system prompt.

In [non-interactive mode](https://code.claude.com/docs/en/headless), pass [`--append-subagent-system-prompt`](https://code.claude.com/docs/en/cli-reference#cli-flags) to append your text to the end of every subagent's system prompt, nested subagents included, apart from a [forked subagent](#fork-the-current-conversation), which reuses the conversation's own prompt. Requires Claude Code v2.1.205 or later. If your text is too long to pass on the command line, save it to a file and pass the path with `--append-subagent-system-prompt-file` instead. The file flag requires Claude Code v2.1.261 or later.

A subagent starts in the main conversation's current working directory. Within a subagent, `cd` commands don't persist between Bash or PowerShell tool calls and don't affect the main conversation's working directory. To give the subagent an isolated copy of the repository instead, set [`isolation: worktree`](#supported-frontmatter-fields).

A subagent with `isolation: worktree` runs its Bash and PowerShell commands inside its worktree. A command whose working directory resolves to your main checkout instead, for example because the worktree directory was removed while the subagent was running, fails with an error. Before v2.1.203, such a command could run in the main checkout.

This working-directory check covers the whole repository containing the directory you launched Claude Code from. When your session runs in a linked [worktree](https://code.claude.com/docs/en/worktrees) of its own, the check also covers the main checkout that worktree is linked from. Before v2.1.210, the check covered only the launch directory itself. A command whose working directory resolved elsewhere in the same repository, such as the repository root when you launched Claude Code from a monorepo subdirectory, ran there instead of failing.

For Bash commands, Claude Code also checks the command itself in two ways:

* It blocks a command that redirects git into the main checkout.
* It refuses a command when it can't verify from the command text that any git the command runs stays inside the worktree, for example when the command name is computed at runtime.

The redirect vectors and the shape rules are listed under [How Claude Code enforces isolation](https://code.claude.com/docs/en/worktrees#how-claude-code-enforces-isolation). PowerShell commands get only the working-directory check.

[Monitor](https://code.claude.com/docs/en/tools-reference#monitor-tool) commands go through the same working-directory and command-content checks as Bash commands.

When the main conversation itself runs isolated in a worktree, Claude Code applies the same checks to the session and to every subagent it spawns, including subagents without `isolation: worktree`; see [How Claude Code enforces isolation](https://code.claude.com/docs/en/worktrees#how-claude-code-enforces-isolation).

#### Supported frontmatter fields

The following fields can be used in the YAML frontmatter. Only `name` and `description` are required.

| Field             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`            | Yes      | Unique identifier using lowercase letters and hyphens. [Hooks](https://code.claude.com/docs/en/hooks#subagentstart) receive this value as `agent_type`. The filename doesn't have to match. Names can't contain `:`, which is reserved for [plugin-scoped identifiers](https://code.claude.com/docs/en/plugins) such as `my-plugin:reviewer`. Claude Code doesn't load a file whose name contains one and logs an error to the debug log. Before v2.1.218, such names were accepted                                                                  |
| `description`     | Yes      | When Claude should delegate to this subagent                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `tools`           | No       | [Tools](#available-tools) the subagent can use. Inherits every tool available to subagents if omitted. If no entry in the list resolves to a tool, the subagent usually [fails to launch](https://code.claude.com/docs/en/errors#agent-would-be-spawned-with-zero-tools) with an error naming the entries. To preload Skills into context, use the `skills` field rather than listing `Skill` here                                                                                                                       |
| `disallowedTools` | No       | Tools to deny, removed from inherited or specified list                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `model`           | No       | [Model](#choose-a-model) to use: `sonnet`, `opus`, `haiku`, `fable`, a full model ID such as `claude-opus-5`, or `inherit`. When you omit it, Claude Code picks the model in the [subagent model order](#choose-a-model)                                                                                                                                                                                                                                                                     |
| `permissionMode`  | No       | [Permission mode](#permission-modes): `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan`, or `manual` as an alias for `default`. The `manual` alias requires Claude Code v2.1.200 or later. Ignored for [plugin subagents](#choose-the-subagent-scope)                                                                                                                                                                                                                 |
| `maxTurns`        | No       | Maximum number of agentic turns before the subagent stops. When the subagent reaches the limit, Claude Code returns its output marked as partial, and Claude can [resume it](#resume-subagents) to continue. The partial marking requires Claude Code v2.1.246 or later                                                                                                                                                                                                                      |
| `skills`          | No       | [Skills](https://code.claude.com/docs/en/skills) to preload into the subagent's context at startup. The full skill content is injected, not only the description. Subagents can still invoke unlisted project, user, and plugin skills through the Skill tool                                                                                                                                                                                                                                                            |
| `mcpServers`      | No       | [MCP servers](https://code.claude.com/docs/en/mcp) available to this subagent. Each entry is either a server name referencing an already-configured server (e.g., `"slack"`) or an inline definition with the server name as key and a full [MCP server config](https://code.claude.com/docs/en/mcp#installing-mcp-servers) as value. Ignored for [plugin subagents](#choose-the-subagent-scope)                                                                                                                                                     |
| `hooks`           | No       | [Lifecycle hooks](#define-hooks-for-subagents) scoped to this subagent. Ignored for [plugin subagents](#choose-the-subagent-scope)                                                                                                                                                                                                                                                                                                                                                           |
| `memory`          | No       | [Persistent memory scope](#enable-persistent-memory): `user`, `project`, or `local`. Enables cross-session learning                                                                                                                                                                                                                                                                                                                                                                          |
| `background`      | No       | Set to `true` to keep this subagent in the background even when Claude asks to run it in the foreground. Where [fork mode](#turn-fork-mode-on-or-off) is on, Claude Code already runs the subagents Claude spawns [in the background](#run-subagents-in-foreground-or-background)                                                                                                                                                                                                            |
| `effort`          | No       | Effort level when this subagent is active. Overrides the session effort level. Default: inherits from session. Options: `low`, `medium`, `high`, `xhigh`, `max`; available levels depend on the model                                                                                                                                                                                                                                                                                        |
| `isolation`       | No       | Set to `worktree` to run the subagent in a temporary [git worktree](https://code.claude.com/docs/en/worktrees), giving it an isolated copy of the repository branched by default from your [default branch](https://code.claude.com/docs/en/worktrees#choose-the-base-branch) rather than the parent session's `HEAD`. The worktree is automatically cleaned up if the subagent makes no changes                                                                                                                                                     |
| `color`           | No       | Display color for the subagent in the task list and transcript. Accepts `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, or `cyan`                                                                                                                                                                                                                                                                                                                                              |
| `initialPrompt`   | No       | Auto-submitted as the first user turn when this agent runs as the main session agent (via `--agent` or the `agent` setting). [Commands](https://code.claude.com/docs/en/commands) and [skills](https://code.claude.com/docs/en/skills) are processed. Prepended to any user-provided prompt                                                                                                                                                                                                                                                          |
| `experimental`    | No       | Map of experimental options. Set its `cacheTtl` key to `5m` or `1h` to choose the [prompt cache lifetime](https://code.claude.com/docs/en/prompt-caching#choose-the-ttl-yourself) for this subagent's requests, at the frontmatter's place in the [cache lifetime precedence](https://code.claude.com/docs/en/prompt-caching#choose-the-ttl-yourself). Claude Code ignores any other value, ignores `1h` while your Claude subscription is using usage credits, and reads the field only from subagent files. Requires Claude Code v2.1.248 or later |

Write `cacheTtl` inside the `experimental` map, not at the top level of the frontmatter.

```yaml theme={null}
---
name: repo-auditor
description: Audits a large repository and reports what it finds
experimental:
  cacheTtl: 1h
---
```

#### Subagent files Claude Code skips

Claude Code skips a file in a project, user, or managed `agents` directory, or in one under a directory you add with `--add-dir`, without reporting it in the session, when the frontmatter has any of these problems:

* **No `name`**: Claude Code treats the file as documentation kept beside your agents.
* **An opening `---` that isn't the file's first line**: Claude Code reads the file as having no frontmatter and treats it as documentation.
* **A `name` that starts with `-` or contains `:`**: Claude Code skips the file and writes an error to the debug log. See the `name` row in the table above.
* **A `name` but no `description`**: Claude Code skips the file and writes the reason to the debug log.
* **YAML that doesn't parse**: Claude Code reads no fields from the file, skips it, and writes the parse error to the debug log.

To see the debug log, run Claude Code with `--debug`.

A [plugin subagent](https://code.claude.com/docs/en/plugins-reference#agents) whose frontmatter has no `name` or doesn't parse still loads, under its filename.

##### Check an `agents` directory before a session

To find files in an `agents` directory whose frontmatter doesn't parse, run `claude plugin validate` against the directory, for example `.claude/agents` or `~/.claude/agents`. Claude Code checks only [the directory you name](https://code.claude.com/docs/en/plugin-marketplaces#validate-a-plugin-or-a-directory-without-a-manifest), and doesn't flag a file whose frontmatter parses but has no `name`. Requires Claude Code v2.1.233 or later.

### Choose a model

The `model` field controls which model the subagent uses:

* **Model alias**: use one of the available aliases: `sonnet`, `opus`, `haiku`, or `fable`
* **Full model ID**: use a full model ID such as `claude-opus-5` or `claude-sonnet-5`. Accepts the same values as the `--model` flag
* **inherit**: use the same model as the main conversation

When Claude invokes a subagent, it can also pass a `model` parameter for that specific invocation. Claude Code resolves the subagent's model in this order:

1. The per-invocation `model` parameter
2. The subagent definition's `model` frontmatter, where `inherit` selects the main conversation's model
3. The [`CLAUDE_CODE_SUBAGENT_MODEL`](https://code.claude.com/docs/en/model-config#environment-variables) environment variable, when you set it to a model alias or model ID
4. The main conversation's model

Setting `CLAUDE_CODE_SUBAGENT_MODEL` by itself doesn't change the model the built-in Explore and Plan subagents run on. To change it, see [Run every subagent on one model](#run-every-subagent-on-one-model).

Before v2.1.251, `CLAUDE_CODE_SUBAGENT_MODEL` came first in this order and overrode both the per-invocation parameter and the frontmatter, including `model: inherit`.

Setting the variable to `inherit` is the same as leaving it unset. Before v2.1.196, that value forced subagents onto the main conversation's model and ignored the other sources.

Claude Code checks the per-invocation parameter, frontmatter, and environment variable values against your organization's [`availableModels`](https://code.claude.com/docs/en/model-config#restrict-model-selection) allowlist. For a blocked value, it substitutes another model:

* When the blocked value is a family alias such as `opus`, Claude Code runs the subagent on the newest version of that family the allowlist permits, following the same [substitution rules and provider scope](https://code.claude.com/docs/en/model-config#restrict-model-selection) as `/model`. Before v2.1.222, Claude Code ran the subagent on the inherited model for a blocked family alias as well.
* For any other blocked value, on providers where that substitution doesn't operate, or when the allowlist permits no version of the family, Claude Code runs the subagent on the inherited model instead. If you set `CLAUDE_CODE_SUBAGENT_MODEL`, Claude Code tries that model first, under these same rules.

In interactive sessions, Claude Code shows a warning naming the requested model and the model the subagent runs on, for either substitution.

To check which model a subagent is running on, run [`/tasks`](https://code.claude.com/docs/en/commands). Claude Code names the model on the subagent's row, and adds the [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) when the subagent's definition, or the skill it forked from, sets [`effort`](#supported-frontmatter-fields). Requires Claude Code v2.1.242 or later.

A per-invocation `model` parameter also applies when the subagent is [resumed or sent a follow-up message](#resume-subagents), so the subagent stays on that model. Before v2.1.211, resuming dropped the per-invocation value and the subagent reverted to its definition's `model` field or, without one, the main conversation's model.

As of v2.1.198, subagents also inherit the main conversation's [extended thinking](https://code.claude.com/docs/en/model-config#extended-thinking) configuration: if thinking is on in your session, it's on for the subagent, and if it's off, it stays off. There is no per-subagent thinking setting. Before v2.1.198, subagents ran with extended thinking disabled regardless of the main conversation's setting.

#### Run every subagent on one model

`CLAUDE_CODE_SUBAGENT_MODEL` is a default, so a subagent's definition or a model Claude passes still takes precedence over it. To apply one model to every subagent, [teammate](https://code.claude.com/docs/en/agent-teams#specify-teammates-and-models), and [workflow agent](https://code.claude.com/docs/en/workflows), also set `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` to `1`. Requires Claude Code v2.1.257 or later.

* If you set both variables, subagents run on the model in `CLAUDE_CODE_SUBAGENT_MODEL`.
* If you set only `CLAUDE_CODE_SUBAGENT_MODEL_FORCE`, subagents run on the main conversation's model.

For example, to run every subagent on Haiku, set both variables in the `env` block of a [settings file](https://code.claude.com/docs/en/settings):

```json theme={null}
{
  "env": {
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku",
    "CLAUDE_CODE_SUBAGENT_MODEL_FORCE": "1"
  }
}
```

To check that the setting took effect, run [`/tasks`](https://code.claude.com/docs/en/commands) while a subagent is running. The subagent's row shows the model it runs on.

While `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` is [on](https://code.claude.com/docs/en/env-vars), Claude Code ignores the `model` field of every subagent definition, including the built-in Explore and Plan subagents, and Claude can't pass a model when it starts a subagent. Two kinds of subagent still run on the main conversation's model:

* A [fork](#fork-the-current-conversation)
* A [skill that runs in a subagent](https://code.claude.com/docs/en/skills#run-skills-in-a-subagent) with `model: inherit`

When you set only `CLAUDE_CODE_SUBAGENT_MODEL_FORCE`, the built-in Explore subagent keeps its [model cap](#built-in-subagents).

### Control subagent capabilities

You can control what subagents can do through tool access, permission modes, and conditional rules.

#### Available tools

Subagents inherit the [built-in tools](https://code.claude.com/docs/en/tools-reference) and MCP tools available in the main conversation, narrowed by two filters: the first removes a short list of tools from every subagent, and the second reduces the built-in tool set for subagents that run in the [background](#run-subagents-in-foreground-or-background), which is the default. [Forks](#fork-the-current-conversation) skip both filters and receive the main conversation's exact tool pool. The first filter removes these tools, even when listed in the `tools` field:

* `Agent`, when the subagent is at the [depth limit](#let-subagents-spawn-their-own-subagents); in a [fork](#fork-the-current-conversation) the tool stays listed but returns an error instead of spawning
* `AskUserQuestion`
* `EndConversation`, which can end only the main conversation; see [EndConversation tool behavior](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior)
* `EnterPlanMode`
* `ExitPlanMode`, unless the subagent's [`permissionMode`](#permission-modes) is `plan`
* `ScheduleWakeup`
* `TaskOutput`
* `WaitForMcpServers`
* `Workflow`

The second filter applies to subagents running in the background. Apart from `Agent` and `ExitPlanMode`, which follow the first filter's conditions wherever the subagent runs, a background subagent keeps every MCP tool but only these built-in tools: `Read`, `Grep`, `Glob`, `Bash`, `PowerShell`, `Edit`, `Write`, `NotebookEdit`, `WebFetch`, `WebSearch`, `TodoWrite`, `Skill`, `ToolSearch`, `EnterWorktree`, `ExitWorktree`, `Monitor`, `TaskStop`, `SendMessage`, and `Artifact`. Claude Code removes every other built-in tool from a background subagent, whether inherited or listed in the `tools` field, so the same definition can resolve to different tools in the foreground and the background. The removal reports no error unless it leaves the `tools` list [resolving to nothing](https://code.claude.com/docs/en/errors#agent-would-be-spawned-with-zero-tools).

[`ListAgents`](https://code.claude.com/docs/en/cross-session-messaging) follows these filters like any built-in tool: a foreground subagent inherits it in sessions where cross-session messaging is enabled, and a background subagent doesn't keep it.

Teammates in [agent teams](https://code.claude.com/docs/en/agent-teams) additionally keep the task tools and cron tools: `TaskCreate`, `TaskGet`, `TaskList`, `TaskUpdate`, `CronCreate`, `CronDelete`, and `CronList`.

In a [session without the Task tools](https://code.claude.com/docs/en/tools-reference#task-tool-availability), Claude Code doesn't provide the task tools to subagents either, even when the subagent runs a different model. An in-process teammate follows your session the same way, while a teammate in its own [split pane](https://code.claude.com/docs/en/agent-teams#choose-a-display-mode) runs as a separate Claude Code process, so its own model decides.

To restrict tools, use the `tools` field as an allowlist or the `disallowedTools` field as a denylist. This example uses `tools` to allow only Read, Grep, Glob, and Bash. The subagent can't edit files, write files, or use any MCP tools:

```yaml theme={null}
---
name: safe-researcher
description: Research agent with restricted capabilities
tools: Read, Grep, Glob, Bash
---
```

This example uses `disallowedTools` to inherit the subagent's tool pool except Write and Edit. The subagent keeps Bash, MCP tools, and the rest of its pool:

```yaml theme={null}
---
name: no-writes
description: Inherits the available tools except file writes
disallowedTools: Write, Edit
---
```

If both are set, `disallowedTools` is applied first, then `tools` is resolved against the remaining pool. A tool listed in both is removed.

When nothing in the `tools` list resolves to a tool, for example because every entry is misspelled or names a tool that isn't available to subagents, Claude Code usually refuses to launch the subagent and the Agent tool returns an error naming the unresolved entries; see [Agent would be spawned with zero tools](https://code.claude.com/docs/en/errors#agent-would-be-spawned-with-zero-tools) for the message and how to fix each entry. Before v2.1.208, that subagent launched with no tools and could return an empty or confusing result.

Both fields accept MCP server-level patterns in addition to exact tool names: `mcp__<server>` or `mcp__<server>__*` grants or removes every tool from the named server. In `disallowedTools`, `mcp__*` also removes every MCP tool from any server. This example removes every tool from the `github` MCP server while keeping tools from other servers and the built-in tools in its pool:

```yaml theme={null}
---
name: local-only
description: Inherits every tool except those from the github MCP server
disallowedTools: mcp__github
---
```

#### Restrict which subagents can be spawned

When an agent runs as the main thread with `claude --agent`, it can spawn subagents using the Agent tool. To restrict which subagent types it can spawn, use `Agent(agent_type)` syntax in the `tools` field.

&lt;Note>In version 2.1.63, the Task tool was renamed to Agent. Existing `Task(...)` references in settings and agent definitions still work as aliases.&lt;/Note>

```yaml theme={null}
---
name: coordinator
description: Coordinates work across specialized agents
tools: Agent(worker, researcher), Read, Bash
---
```

This is an allowlist: only the `worker` and `researcher` subagents can be spawned. If the agent tries to spawn any other type, the request fails and the agent sees only the allowed types in its prompt. To block specific agents while allowing all others, use [`permissions.deny`](#disable-specific-subagents) instead.

To allow spawning any subagent without restrictions, use `Agent` without parentheses:

```yaml theme={null}
tools: Agent, Read, Bash
```

If you omit `Agent` from the `tools` list entirely, the agent can't spawn any subagents with the Agent tool.

The `Agent(agent_type)` allowlist syntax applies only to an agent running as the main thread with `claude --agent`. In a subagent definition, listing `Agent` in `tools` lets that subagent spawn subagents of its own while the [depth limit](#let-subagents-spawn-their-own-subagents) allows it, but any type list inside the parentheses is ignored.

#### Scope MCP servers to a subagent

Use the `mcpServers` field to give a subagent access to [MCP](https://code.claude.com/docs/en/mcp) servers that aren't available in the main conversation. Inline servers defined here are connected when the subagent starts, subject to the [trust rule for the agent file's folder](#inline-server-trust), and disconnected when it finishes. String references share the parent session's connection.

  The `mcpServers` field applies in both contexts where an agent file can run:

  * As a subagent, spawned through the Agent tool or an @-mention
  * As the main session, launched with [`--agent`](#invoke-subagents-explicitly) or the `agent` setting

  When the agent is the main session, inline server definitions connect at startup alongside servers from [`.mcp.json`](https://code.claude.com/docs/en/mcp) and settings files, under the same [trust rule for the agent file's folder](#inline-server-trust). In `/mcp`, a remote (HTTP or SSE) server you've used before can show the [`cached` status](https://code.claude.com/docs/en/mcp#managing-your-servers) instead; Claude Code connects it when Claude first calls one of its tools.

Each entry in the list is either an inline server definition or a string referencing an MCP server already configured in your session:

```yaml theme={null}
---
name: browser-tester
description: Tests features in a real browser using Playwright
mcpServers:
  # Inline definition: scoped to this subagent only
  - playwright:
      type: stdio
      command: npx
      args: ["-y", "@playwright/mcp@latest"]
  # Reference by name: reuses an already-configured server
  - github
---

Use the Playwright tools to navigate, screenshot, and interact with pages.
```

Inline definitions use the same schema as `.mcp.json` server entries, keyed by the server name, and support the `stdio`, `http`, `sse`, and `ws` types.

To keep an MCP server out of the main conversation entirely and avoid its tool descriptions consuming context there, define it inline here rather than in `.mcp.json`. The subagent gets the tools; the parent conversation doesn't.

&lt;span id="inline-server-trust" />Claude Code loads an inline server from an agent file in your project's `.claude/agents/` directory, or in an `--add-dir` directory's `.claude/agents/`, only after you [trust the folder the agent file came from](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder). Before v2.1.238, Claude Code loaded these servers without checking trust.

* **Trust that doesn't count**: a parent folder's trust, and the automatic trust a `-p` or SDK session gets for [hooks in settings files](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder)
* **Until then**: Claude Code skips every inline server in that agent file and writes the exact `projects["<path>"].hasTrustDialogAccepted` key for `~/.claude.json` to the debug log
* **`--add-dir` directories**: a directory outside your trusted workspace's repository needs its own trust entry, since its `.claude/agents/` files don't inherit your workspace's trust

Claude Code loads two kinds of server without checking trust for the folder the agent file came from:

* A name that references a server you already configured
* An inline server in an agent file from `~/.claude/agents/`, in one you pass with `--agents` or the SDK `agents` option, or in one that managed settings supplies

As of v2.1.153, the MCP restrictions that apply to the main session also cover servers declared in subagent frontmatter:

* [`--strict-mcp-config`](https://code.claude.com/docs/en/cli-reference) and [`--bare`](https://code.claude.com/docs/en/cli-reference)
* [Enterprise managed MCP configuration](https://code.claude.com/docs/en/managed-mcp)
* [`allowedMcpServers` and `deniedMcpServers` policies](https://code.claude.com/docs/en/managed-mcp#policy-based-control-with-allowlists-and-denylists)

When one of these blocks a server, Claude Code skips it and shows a warning naming the blocked servers.

Managed-settings restrictions apply to every subagent regardless of how it is defined. `--strict-mcp-config` doesn't filter servers you pass inline via `--agents` or the SDK `agents` option, since those are explicit caller input.

#### Permission modes

Set `permissionMode` to choose the permission mode a subagent runs in. Use the modes' config values, so Manual mode is `default`. If you leave it unset, the subagent inherits the main conversation's mode, which starts as [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) on Pro, Max, and Team plans unless your settings or your organization change it.

The main conversation's permission mode decides whether Claude Code uses the value you set:

* When the main conversation is in `bypassPermissions`, `acceptEdits`, or [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode), the subagent runs in that same mode and Claude Code ignores the `permissionMode` you set. Under auto mode, the classifier evaluates the subagent's tool calls with the main conversation's block and allow rules.
* When the main conversation is in `default`, `dontAsk`, or `plan` mode, the subagent runs in the permission mode you set, except `bypassPermissions`. A subagent that declares `bypassPermissions` keeps the main conversation's mode instead. The `bypassPermissions` exception requires Claude Code v2.1.267 or later.

`permissionMode` accepts these values, and `manual` as an alias for `default`:

| Mode                | Behavior                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`           | Manual mode: prompts for permission                                                                                                                                                                                                                                                                                                                                                |
| `acceptEdits`       | Auto-accept file edits and common filesystem commands for paths in the working directory or `additionalDirectories`                                                                                                                                                                                                                                                                |
| `auto`              | [Auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode): a background classifier reviews commands and protected-directory writes                                                                                                                                                                                                                                        |
| `dontAsk`           | Auto-deny permission prompts. Explicitly allowed tools still work; `AskUserQuestion`, MCP tools marked [`requiresUserInteraction`](https://code.claude.com/docs/en/mcp#require-approval-for-a-specific-tool), and connector tools [your organization set to `ask`](https://code.claude.com/docs/en/mcp#organization-controls-on-connector-tools) in sessions where that setting reaches Claude Code are denied even if you've allowed them |
| `bypassPermissions` | [Skip permission prompts](https://code.claude.com/docs/en/permission-modes#skip-all-checks-with-bypasspermissions-mode). A subagent runs in this mode only when the main conversation does                                                                                                                                                                                                                     |
| `plan`              | Plan mode (read-only exploration)                                                                                                                                                                                                                                                                                                                                                  |

#### Preload skills into subagents

Use the `skills` field to inject skill content into a subagent's context at startup. This gives the subagent domain knowledge without requiring it to discover and load skills during execution.

```yaml theme={null}
---
name: api-developer
description: Implement API endpoints following team conventions
skills:
  - api-conventions
  - error-handling-patterns
---

Implement API endpoints. Follow the conventions and patterns from the preloaded skills.
```

The full content of each listed skill is injected into the subagent's context at startup. This field controls which skills are preloaded, not which skills the subagent can access: without it, the subagent can still discover and invoke project, user, and plugin skills through the Skill tool during execution. To prevent a subagent from invoking skills entirely, omit `Skill` from the [`tools`](#available-tools) list or add it to `disallowedTools`.

You can't preload skills that set [`disable-model-invocation: true`](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill), since preloading draws from the same set of skills Claude can invoke. This includes the bundled `/verify` skill: only you can run it, so it can't be preloaded either.

If a listed skill is missing or disabled, for example by your organization's policy, Claude Code skips it and logs a warning to the debug log.

  This is the inverse of [running a skill in a subagent](https://code.claude.com/docs/en/skills#run-skills-in-a-subagent). With `skills` in a subagent, the subagent controls the system prompt and loads skill content. With `context: fork` in a skill, the skill content is injected into the agent you specify. Both use the same underlying system.

#### Enable persistent memory

The `memory` field gives the subagent a persistent directory that survives across conversations. The subagent uses this directory to build up knowledge over time, such as codebase patterns, debugging insights, and architectural decisions.

```yaml theme={null}
---
name: code-reviewer
description: Reviews code for quality and best practices
memory: user
---

You are a code reviewer. As you review code, update your agent memory with
patterns, conventions, and recurring issues you discover.
```

Choose a scope based on how broadly the memory should apply:

| Scope     | Location                                      | Use when                                                                                   |
| :-------- | :-------------------------------------------- | :----------------------------------------------------------------------------------------- |
