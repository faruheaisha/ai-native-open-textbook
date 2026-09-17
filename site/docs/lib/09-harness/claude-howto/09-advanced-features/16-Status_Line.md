---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "8696f142c3ba74e406ae313260b92b8aa010bf88303f32fab4f0590bf6e21ec0"
contentMode: "local-full"
zh: ""
---

## Status Line

The status line is a custom command whose output renders at the bottom of the session. Configure it with `/statusline`, or set it directly:

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }
}
```

`padding` defaults to `0`. Claude Code pipes a JSON object to the command on stdin, so the script decides what to display.

### Available input fields

| Group | Fields |
|-------|--------|
| Session | `session_id`, `session_name`, `prompt_id`, `transcript_path`, `cwd`, `version` |
| Model | `model.id`, `output_style.name`, `effort.level`, `fast_mode`, `thinking.enabled` |
| Agent | `agent.name`, `vim.mode` |
| Cost | `cost.total_cost_usd`, `cost.total_duration_ms`, `cost.total_api_duration_ms`, `cost.total_lines_added` |
| Context | `context_window.context_window_size`, `.current_usage`, `.remaining_percentage`, `.total_input_tokens`, `.used_percentage` |
| Limits | `rate_limits.five_hour.used_percentage`, `.resets_at` |
| Repo | `pr.number`, `pr.review_state`, `workspace.project_dir`, `workspace.added_dirs`, `workspace.git_worktree`, `workspace.repo.host` |
| Worktree | `worktree.name`, `.branch`, `.path`, `.original_branch`, `.original_cwd` |

### Example

```bash
#!/bin/bash
# ~/.claude/statusline.sh — model, context usage, and cost
input=$(cat)
model=$(echo "$input" | jq -r '.model.id')
used=$(echo "$input" | jq -r '.context_window.used_percentage')
cost=$(echo "$input" | jq -r '.cost.total_cost_usd')
printf '%s | ctx %.0f%% | $%.2f' "$model" "$used" "$cost"
```

> **Note**: `statusLine` requires workspace trust. Status-line scripts also receive `COLUMNS` and `LINES` in their environment (v2.1.153+) so they can size output to the terminal.
