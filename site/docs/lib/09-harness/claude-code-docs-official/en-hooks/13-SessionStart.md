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
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "25972d5093803549724f5c87efcaaf182c2da604103e7bc9b6d7f1e124746f9d"
contentMode: "local-full"
zh: ""
---

### SessionStart

Runs when Claude Code starts a new session or resumes an existing session. Useful for loading development context like existing issues or recent changes to your codebase, or setting up environment variables. For static context that doesn't require a script, use [CLAUDE.md](https://code.claude.com/docs/en/memory) instead.

SessionStart runs on every session, so keep these hooks fast. Only `type: "command"` and `type: "mcp_tool"` hooks are supported. See [MCP tool hook fields](#mcp-tool-hook-fields) for when `mcp_tool` hooks run.

The matcher value corresponds to how the session was initiated:

| Matcher   | When it fires                                                                                                                          |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `startup` | New session                                                                                                                            |
| `resume`  | `--resume`, `--continue`, or `/resume`                                                                                                 |
| `clear`   | `/clear`                                                                                                                               |
| `compact` | Auto or manual compaction                                                                                                              |
| `fork`    | A new session forked from an existing one: `--fork-session` with `--resume` or `--continue`, the `/fork` background copy, or `/branch` |

Before v2.1.214, forked sessions reported source `"resume"`.

When you run `/clear` in an interactive session, the matching SessionStart hooks run in the background and the prompt accepts input again right away. Claude's first response still waits for the hooks to finish, so their context reaches Claude. If you run `/clear` again or switch to another conversation with a command such as `/resume` while those hooks are still running, Claude Code cancels them and discards their output.

#### SessionStart input

In addition to the [common input fields](#common-input-fields), SessionStart hooks receive `source` and optionally `model`, `agent_type`, and `session_title`:

| Field           | Description                                                                                                                                                                                                   |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `source`        | How the session started: `"startup"` for new sessions, `"resume"` for resumed sessions, `"clear"` after `/clear`, `"compact"` after compaction, or `"fork"` for a new session forked from an existing one     |
| `model`         | The active model identifier. It can be omitted, for example after `/clear` or when a session is restored through conversation recovery, so check for the field before reading it                              |
| `agent_type`    | The agent name, present when you start Claude Code with `claude --agent <name>`                                                                                                                               |
| `session_title` | The current session title if one is already set, for example via `--name` or `/rename`. A hook that emits `sessionTitle` can check `session_title` first to avoid overwriting a title the user set explicitly |

When `source` is `"resume"` or `"fork"` and the transcript contains at least one response from Claude, SessionStart hooks also receive the four fields below. Your hook can use them to report what resuming a stale conversation costs before the first request, for example in a [`systemMessage`](#json-output). These fields require Claude Code v2.1.251 or later.

| Field                         | Description                                                                                                                                                                 |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `seconds_since_last_response` | Wall-clock seconds since the last response in the resumed transcript                                                                                                        |
| `context_tokens`              | Tokens the first request of the resumed session re-sends as its prompt                                                                                                      |
| `prompt_cache_likely_expired` | `true` when the last response is older than the session's [prompt cache lifetime](https://code.claude.com/docs/en/prompt-caching#cache-lifetime) or a later compaction replaced the cached conversation |
| `estimated_cache_write_usd`   | Estimated cost in US dollars of writing `context_tokens` to the prompt cache on the session's model, excluding the response                                                 |

This example shows the input for a session resumed 90 minutes after its last response:

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "SessionStart",
  "source": "resume",
  "model": "claude-opus-5",
  "seconds_since_last_response": 5400,
  "context_tokens": 182340,
  "prompt_cache_likely_expired": true,
  "estimated_cache_write_usd": 1.1396
}
```

#### SessionStart decision control

Claude Code adds stdout it [treats as plain text](#exit-code-0) to Claude's context. In addition to the [JSON output fields](#json-output) available to all hooks, you can return these event-specific fields:

| Field                | Description                                                                                                                                                                                                                                                                                                                          |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `additionalContext`  | String added to Claude's context at the start of the conversation, before the first prompt. See [Add context for Claude](#add-context-for-claude) for how the text is delivered and what to put in it                                                                                                                                |
| `initialUserMessage` | String used as the first user message of the session. Applies in [non-interactive mode](https://code.claude.com/docs/en/headless) with the `-p` flag, where it becomes the first turn even if no prompt is provided. If a prompt is provided, it follows as the next turn. Unlike `additionalContext`, which attaches to an existing turn, this creates the turn |
| `sessionTitle`       | Sets the session title, with the same effect as `/rename`. Use to name sessions automatically from the launch folder, git branch, or worktree name. Applies when `source` is `"startup"`, `"resume"`, or `"fork"`; ignored on `"clear"` and `"compact"`                                                                              |
| `watchPaths`         | Array of absolute paths to watch for [FileChanged](#filechanged) events during this session                                                                                                                                                                                                                                          |
| `reloadSkills`       | Boolean. When `true`, Claude Code re-scans the [skill](https://code.claude.com/docs/en/skills) and command directories after the SessionStart hooks complete, so skills the hook installed are available in the same session, starting with the first prompt                                                                                                     |

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Current branch: feat/auth-refactor\nUncommitted changes: src/auth.ts, src/login.tsx\nActive issue: #4211 Migrate to OAuth2",
    "sessionTitle": "auth-refactor"
  }
}
```

Since plain stdout already reaches Claude for this event, a hook that only loads context can print to stdout directly without building JSON. Use the JSON form when you need to combine context with other fields such as `sessionTitle`.

Use `reloadSkills` when a SessionStart hook installs or updates skills. Skill discovery normally runs before SessionStart hooks finish, so files the hook writes into `~/.claude/skills/` or `.claude/skills/` would otherwise only appear in the next session. This example syncs a shared skills repository and requests the re-scan:

```bash theme={null}
#!/bin/bash

git -C ~/.claude/skills/team-skills pull --quiet 2>/dev/null || \
  git clone --quiet https://git.example.com/your-org/team-skills.git ~/.claude/skills/team-skills

echo '{"hookSpecificOutput": {"hookEventName": "SessionStart", "reloadSkills": true}}'
```

The repository URL is a placeholder; replace it with your own skills repository. With the placeholder, the clone fails and prints a `fatal:` message to stderr. Stderr from a SessionStart hook that exits 0 is informational only, so the `reloadSkills` request still applies.

#### Persist environment variables

SessionStart hooks have access to the `CLAUDE_ENV_FILE` environment variable, which provides a file path where you can persist environment variables for subsequent Bash commands.

To set individual environment variables, write `export` statements to `CLAUDE_ENV_FILE`. Use append (`>>`) to preserve variables set by other hooks:

```bash theme={null}
#!/bin/bash

if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=production' >> "$CLAUDE_ENV_FILE"
  echo 'export DEBUG_LOG=true' >> "$CLAUDE_ENV_FILE"
  echo 'export PATH="$PATH:./node_modules/.bin"' >> "$CLAUDE_ENV_FILE"
fi

exit 0
```

To capture all environment changes from setup commands, compare the exported variables before and after:

```bash theme={null}
#!/bin/bash

ENV_BEFORE=$(export -p | sort)

# Run your setup commands that modify the environment
source ~/.nvm/nvm.sh
nvm use 20

if [ -n "$CLAUDE_ENV_FILE" ]; then
  ENV_AFTER=$(export -p | sort)
  comm -13 <(echo "$ENV_BEFORE") <(echo "$ENV_AFTER") >> "$CLAUDE_ENV_FILE"
fi

exit 0
```

  `CLAUDE_ENV_FILE` is available for SessionStart, [Setup](#setup), [CwdChanged](#cwdchanged), and [FileChanged](#filechanged) hooks. Other hook types don't have access to this variable.
