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
sourceRel: "en/statusline.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/statusline.md"
sourceSha256: "25714ae87efd73e8e4306f76fde76471ba55cb1a50ce48d4126baa0731d1cbd1"
pageSha256: "eddf8e2bc75ca0bcab6c29829d4fa8357402a0363d76f2cda0b46f6066c93d54"
contentMode: "local-full"
zh: ""
---

## Set up a status line

Use the [`/statusline` command](#use-the-%2Fstatusline-command) to have Claude Code generate a script for you, or [manually create a script](#manually-configure-a-status-line) and add it to your settings.

### Use the /statusline command

The `/statusline` command accepts natural language instructions describing what you want displayed. Claude Code generates a script file in `~/.claude/` and updates your settings automatically:

```text theme={null}
/statusline show model name and context percentage with a progress bar
```

Approve the file edit prompts if Claude Code asks for permission during setup.

### Manually configure a status line

Add a `statusLine` field to your user settings (`~/.claude/settings.json`, where `~` is your home directory) or [project settings](https://code.claude.com/docs/en/settings#where-settings-live). Set `type` to `"command"` and point `command` to a script path or an inline shell command. For a full walkthrough of creating a script, see [Build a status line step by step](#build-a-status-line-step-by-step).

```json theme={null}
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 2
  }
}
```

The `command` field runs in a shell, so you can also use inline commands instead of a script file. This example uses `jq` to parse the JSON input and display the model name and context percentage:

```json theme={null}
{
  "statusLine": {
    "type": "command",
    "command": "jq -r '\"[\\(.model.display_name)] \\(.context_window.used_percentage // 0)% context\"'"
  }
}
```

The optional `padding` field adds extra horizontal spacing (in characters) to the status line content. Defaults to `0`. This padding is in addition to the interface's built-in spacing, so it controls relative indentation rather than absolute distance from the terminal edge.

The optional `refreshInterval` field re-runs your command every N seconds in addition to the [event-driven updates](#how-status-lines-work). The minimum is `1`. Set this when your status line shows time-based data such as a clock, or when background subagents change git state while the main session is idle. Leave it unset to run only on events.

The optional `hideVimModeIndicator` field suppresses the built-in `-- INSERT --` text below the prompt. Set this to `true` when your script renders [`vim.mode`](#available-data) itself, so the mode is not shown twice.

### Disable the status line

Run `/statusline` and ask it to remove or clear your status line (e.g., `/statusline delete`, `/statusline clear`, `/statusline remove it`). You can also manually delete the `statusLine` field from your settings.json.
