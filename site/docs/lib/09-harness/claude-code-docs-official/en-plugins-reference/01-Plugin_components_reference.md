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
sourceRel: "en/plugins-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugins-reference.md"
sourceSha256: "c75119ccd8973aad659373d726d412bbe3f5184e6d0ca0d2064512cad255f0a3"
pageSha256: "001bc6e200d7b1a9c4acbc0b2e9bb08cd9cd40e12475d170b70dc3ef96f1903d"
contentMode: "local-full"
zh: ""
---

## Plugin components reference

### Skills

Plugins add skills to Claude Code, creating `/name` shortcuts that you or Claude can invoke.

**Location**: `skills/` or `commands/` directory in plugin root, or a single `SKILL.md` file at the plugin root

**File format**: Skills are directories with `SKILL.md`; commands are simple markdown files

**Skill structure**:

```text theme={null}
skills/
├── pdf-processor/
│   ├── SKILL.md
│   ├── reference.md (optional)
│   └── scripts/ (optional)
└── code-reviewer/
    └── SKILL.md
```

Skills and commands are automatically discovered when the plugin is installed.

If a plugin has no `skills/` directory and no `skills` manifest field, a `SKILL.md` at the plugin root is loaded as a single skill. Set the frontmatter `name` field to control the skill's invocation name. Without it, Claude Code falls back to the install directory name, which for marketplace-installed plugins is a version string that changes on every update. For plugins that ship more than one skill, use the `skills/` directory layout shown above.

In plugin skills and commands, Boolean frontmatter fields such as `disable-model-invocation` accept `yes`, `no`, `on`, `off`, `1`, and `0` in any letter case, in addition to `true` and `false`. Before v2.1.218, Claude Code recognized only `true` and `false`.

For complete details, see [Skills](https://code.claude.com/docs/en/skills).

### Agents

Plugins can provide specialized subagents for specific tasks that Claude can invoke automatically when appropriate.

**Location**: `agents/` directory in plugin root

**File format**: Markdown files describing agent capabilities

**Agent structure**:

```markdown theme={null}
---
name: agent-name
description: What this agent specializes in and when Claude should invoke it
model: sonnet
effort: medium
maxTurns: 20
disallowedTools: Write, Edit
---

Detailed system prompt for the agent describing its role, expertise, and behavior.
```

Plugin agents support `name`, `description`, `model`, `effort`, `maxTurns`, `tools`, `disallowedTools`, `skills`, `memory`, `background`, and `isolation` frontmatter fields. The only valid `isolation` value is `"worktree"`. For security reasons, `hooks`, `mcpServers`, and `permissionMode` are not supported for plugin-shipped agents.

Claude Code loads a plugin agent even when its frontmatter has no `name` or doesn't parse:

* No `name`: Claude Code names the agent after the file, so `agents/reviewer.md` in a plugin named `my-plugin` loads as `my-plugin:reviewer`
* Frontmatter that doesn't parse: Claude Code names the agent after the file, uses `Agent from my-plugin plugin` as its description, and ignores every field in the file

By contrast, Claude Code skips a project, user, or managed agent file whose frontmatter has no `name` or doesn't parse.

To find files in a plugin's default `agents/` directory whose frontmatter doesn't parse, run `claude plugin validate`. The path you pass depends on whether the plugin has a manifest, and both examples use `./my-plugin` as the plugin directory:

* A plugin with a manifest: `claude plugin validate ./my-plugin`
* A plugin without a manifest: `claude plugin validate ./my-plugin/agents`. Requires Claude Code v2.1.233 or later.

Agents appear in the [@-mention typeahead](https://code.claude.com/docs/en/sub-agents#invoke-subagents-explicitly) under their scoped name, such as `my-plugin:code-reviewer`, once the plugin is enabled.

For complete details, see [Subagents](https://code.claude.com/docs/en/sub-agents).

### Hooks

Plugins can provide event handlers that respond to Claude Code events automatically.

**Location**: `hooks/hooks.json` in plugin root, or inline in plugin.json

**Format**: JSON configuration with event matchers and actions

**Hook configuration**:

```json theme={null}
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PLUGIN_ROOT}\"/scripts/format-code.sh"
          }
        ]
      }
    ]
  }
}
```

Plugin hooks respond to the same lifecycle events as [user-defined hooks](https://code.claude.com/docs/en/hooks):

| Event                 | When it fires                                                                                                                                                                                                                                         |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SessionStart`        | When a session begins or resumes                                                                                                                                                                                                                      |
| `Setup`               | When you start Claude Code with `--init-only`, or with `--init` or `--maintenance` in `-p` mode. For one-time preparation in CI or scripts                                                                                                            |
| `UserPromptSubmit`    | When you submit a prompt, before Claude processes it                                                                                                                                                                                                  |
| `UserPromptExpansion` | When a user-typed command expands into a prompt, before it reaches Claude. Can block the expansion                                                                                                                                                    |
| `PreToolUse`          | Before a tool call executes. Can block it                                                                                                                                                                                                             |
| `PermissionRequest`   | When a tool call needs a permission decision                                                                                                                                                                                                          |
| `PermissionDenied`    | When auto mode denies a tool call, including denials without a classifier verdict. Use JSON `hookSpecificOutput.retry: true` to tell the model it may retry the denied tool call. Claude Code ignores `retry` when the classifier produced no verdict |
| `PostToolUse`         | After a tool call succeeds                                                                                                                                                                                                                            |
| `PostToolUseFailure`  | After a tool call fails                                                                                                                                                                                                                               |
| `PostToolBatch`       | After a full batch of parallel tool calls resolves, before the next model call                                                                                                                                                                        |
| `Notification`        | When Claude Code sends a notification                                                                                                                                                                                                                 |
| `MessageDisplay`      | While assistant message text is displayed                                                                                                                                                                                                             |
| `SubagentStart`       | When a subagent is spawned                                                                                                                                                                                                                            |
| `SubagentStop`        | When a subagent finishes                                                                                                                                                                                                                              |
| `TaskCreated`         | When a task is being created via `TaskCreate`                                                                                                                                                                                                         |
| `TaskCompleted`       | When a task is being marked as completed                                                                                                                                                                                                              |
| `Stop`                | When Claude finishes responding                                                                                                                                                                                                                       |
| `StopFailure`         | When the turn ends due to an API error                                                                                                                                                                                                                |
| `TeammateIdle`        | When an [agent team](https://code.claude.com/docs/en/agent-teams) teammate is about to go idle                                                                                                                                                                                    |
| `InstructionsLoaded`  | When a CLAUDE.md or `.claude/rules/*.md` file is loaded into context. Fires at session start and when files are lazily loaded during a session                                                                                                        |
| `ConfigChange`        | When a configuration file changes during a session                                                                                                                                                                                                    |
| `CwdChanged`          | When the working directory changes, for example when Claude executes a `cd` command. Useful for reactive environment management with tools like direnv                                                                                                |
| `DirectoryAdded`      | When a working directory is added mid-session via `/add-dir` or the SDK `register_repo_root` control request                                                                                                                                          |
| `FileChanged`         | When a watched file changes on disk. The `matcher` field specifies which filenames to watch                                                                                                                                                           |
| `WorktreeCreate`      | When a worktree is being created via `--worktree`, `isolation: "worktree"`, or for a background session. Replaces default git behavior                                                                                                                |
| `WorktreeRemove`      | When a worktree is being removed at session exit, when a subagent finishes, or when you delete a background session                                                                                                                                   |
| `PreCompact`          | Before context compaction                                                                                                                                                                                                                             |
| `PostCompact`         | After context compaction completes                                                                                                                                                                                                                    |
| `PreModelSwitch`      | Before Claude Code applies a model switch that you or a client requested. Can block the switch                                                                                                                                                        |
| `PostModelSwitch`     | After the session's model changes, including changes Claude Code makes on its own, such as restoring the model when you resume a session                                                                                                              |
| `Elicitation`         | When an MCP server requests user input during a tool call                                                                                                                                                                                             |
| `ElicitationResult`   | After a user responds to an MCP elicitation, before the response is sent back to the server                                                                                                                                                           |
| `SessionEnd`          | When a session terminates                                                                                                                                                                                                                             |

**Hook types**:

* `command`: execute shell commands or scripts
* `http`: send the event JSON as a POST request to a URL
* `mcp_tool`: call a tool on a configured [MCP server](https://code.claude.com/docs/en/mcp)
* `prompt`: evaluate a prompt with an LLM (uses `$ARGUMENTS` placeholder for context)
* `agent`: run an agentic verifier with tools for complex verification tasks
