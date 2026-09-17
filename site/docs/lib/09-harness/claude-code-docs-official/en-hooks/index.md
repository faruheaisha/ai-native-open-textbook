---
title: "Hooks reference"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "e9841e3e739408a563c97925acf35feea479943b3be4d511260a93520837171a"
contentMode: "local-full"
zh: ""
---

# Hooks reference

> Reference for Claude Code hook events, configuration schema, JSON input/output formats, exit codes, async hooks, HTTP hooks, prompt hooks, and MCP tool hooks.

  For a quickstart guide with examples, see [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide).

Hooks are user-defined shell commands, HTTP endpoints, MCP tool calls, LLM prompts, or subagents that execute automatically at specific points in Claude Code's lifecycle. Claude Code fires the same hook events wherever it runs: sessions in the terminal, IDE extensions, the [Desktop app](https://code.claude.com/docs/en/desktop-quickstart), and [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web). Use this reference to look up event schemas, configuration options, JSON input/output formats, and advanced features like async hooks, HTTP hooks, and MCP tool hooks.

## Hook lifecycle

Claude Code runs hooks at specific points during a session. When an event fires and a matcher matches, Claude Code passes JSON context about the event to your hook handler. For command hooks, input arrives on stdin. For HTTP hooks, it arrives as the POST request body. Your handler can then inspect the input, take action, and optionally return a decision.

Events fall into three cadences:

* per session: `SessionStart` and `SessionEnd`
* per turn: `UserPromptSubmit`, `Stop`, and `StopFailure`
* on every tool call inside the agentic loop: `PreToolUse` and `PostToolUse`, except [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior) calls, which skip both

&lt;div style=&#123;&#123;maxWidth: "500px", margin: "0 auto"&#125;&#125;>
    <img src="https://mintcdn.com/claude-code/x7pO8l4XcvAXCoVc/images/hooks-lifecycle.svg?fit=max&auto=format&n=x7pO8l4XcvAXCoVc&q=85&s=81b9256c1bbe8832553485f5d9e9c746" className="dark:hidden" alt="Hook lifecycle diagram showing optional Setup feeding into SessionStart, then a per-turn loop containing UserPromptSubmit, UserPromptExpansion for slash commands, the nested agentic loop (PreToolUse, PermissionRequest, PostToolUse, PostToolUseFailure, PostToolBatch, SubagentStart/Stop, TaskCreated, TaskCompleted), and Stop or StopFailure, followed by TeammateIdle, PreCompact, PostCompact, and SessionEnd, with Elicitation and ElicitationResult nested inside MCP tool execution, PermissionDenied as a side branch from PermissionRequest for auto-mode denials, WorktreeCreate, WorktreeRemove, Notification, ConfigChange, InstructionsLoaded, CwdChanged, FileChanged, and DirectoryAdded as standalone async events, PreModelSwitch as a standalone sequential event that runs before a requested model switch, PostModelSwitch as a standalone async event that runs after the session's model changes, and MessageDisplay as a display-only event that runs while assistant message text streams" width="520" height="1336" data-path="images/hooks-lifecycle.svg" />

    <img src="https://mintcdn.com/claude-code/x7pO8l4XcvAXCoVc/images/hooks-lifecycle-dark.svg?fit=max&auto=format&n=x7pO8l4XcvAXCoVc&q=85&s=c9b3d88487335f58cce0b52e2f9e7531" className="hidden dark:block" alt="Hook lifecycle diagram showing optional Setup feeding into SessionStart, then a per-turn loop containing UserPromptSubmit, UserPromptExpansion for slash commands, the nested agentic loop (PreToolUse, PermissionRequest, PostToolUse, PostToolUseFailure, PostToolBatch, SubagentStart/Stop, TaskCreated, TaskCompleted), and Stop or StopFailure, followed by TeammateIdle, PreCompact, PostCompact, and SessionEnd, with Elicitation and ElicitationResult nested inside MCP tool execution, PermissionDenied as a side branch from PermissionRequest for auto-mode denials, WorktreeCreate, WorktreeRemove, Notification, ConfigChange, InstructionsLoaded, CwdChanged, FileChanged, and DirectoryAdded as standalone async events, PreModelSwitch as a standalone sequential event that runs before a requested model switch, PostModelSwitch as a standalone async event that runs after the session's model changes, and MessageDisplay as a display-only event that runs while assistant message text streams" width="520" height="1336" data-path="images/hooks-lifecycle-dark.svg" />


The table below summarizes when each event fires. The [Hook events](#hook-events) section documents the full input schema and decision control options for each one.

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

## 本篇目录

- [How a hook resolves](https://code.claude.com/docs)
- [Hook locations](https://code.claude.com/docs)
- [Matcher patterns](https://code.claude.com/docs)
- [Hook handler fields](https://code.claude.com/docs)
- [Reference scripts by path](https://code.claude.com/docs)
- [Hooks in skills and agents](https://code.claude.com/docs)
- [The /hooks menu](https://code.claude.com/docs)
- [Disable or remove hooks](https://code.claude.com/docs)
- [Common input fields](https://code.claude.com/docs)
- [Exit code output](https://code.claude.com/docs)
- [HTTP response handling](https://code.claude.com/docs)
- [JSON output](https://code.claude.com/docs)
- [SessionStart](https://code.claude.com/docs)
- [Setup](https://code.claude.com/docs)
- [InstructionsLoaded](https://code.claude.com/docs)
- [UserPromptSubmit](https://code.claude.com/docs)
- [UserPromptExpansion](https://code.claude.com/docs)
- [MessageDisplay](https://code.claude.com/docs)
- [PreToolUse](https://code.claude.com/docs)
- [PermissionRequest](https://code.claude.com/docs)
- [PostToolUse](https://code.claude.com/docs)
- [PostToolUseFailure](https://code.claude.com/docs)
- [PostToolBatch](https://code.claude.com/docs)
- [PermissionDenied](https://code.claude.com/docs)
- [Notification](https://code.claude.com/docs)
- [SubagentStart](https://code.claude.com/docs)
- [SubagentStop](https://code.claude.com/docs)
- [TaskCreated](https://code.claude.com/docs)
- [TaskCompleted](https://code.claude.com/docs)
- [Stop](https://code.claude.com/docs)
- [StopFailure](https://code.claude.com/docs)
- [TeammateIdle](https://code.claude.com/docs)
- [ConfigChange](https://code.claude.com/docs)
- [CwdChanged](https://code.claude.com/docs)
- [DirectoryAdded](https://code.claude.com/docs)
- [FileChanged](https://code.claude.com/docs)
- [WorktreeCreate](https://code.claude.com/docs)
- [WorktreeRemove](https://code.claude.com/docs)
- [PreCompact](https://code.claude.com/docs)
- [PostCompact](https://code.claude.com/docs)
- [PreModelSwitch](https://code.claude.com/docs)
- [PostModelSwitch](https://code.claude.com/docs)
- [SessionEnd](https://code.claude.com/docs)
- [Elicitation](https://code.claude.com/docs)
- [ElicitationResult](https://code.claude.com/docs)
- [How prompt-based hooks work](https://code.claude.com/docs)
- [Prompt hook configuration](https://code.claude.com/docs)
- [Response schema](https://code.claude.com/docs)
- [Check multiple conditions before stopping](https://code.claude.com/docs)
- [How agent hooks work](https://code.claude.com/docs)
- [Agent hook configuration](https://code.claude.com/docs)
- [Configure an async hook](https://code.claude.com/docs)
- [How async hooks execute](https://code.claude.com/docs)
- [Run tests after file changes](https://code.claude.com/docs)
- [Limitations](https://code.claude.com/docs)
- [Disclaimer](https://code.claude.com/docs)
- [Workspace trust](https://code.claude.com/docs)
- [Security best practices](https://code.claude.com/docs)
