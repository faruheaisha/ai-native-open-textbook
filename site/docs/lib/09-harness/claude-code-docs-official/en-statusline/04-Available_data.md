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
pageSha256: "b5717a3fe1185eb7c80d983b4cf8627cd5dae3cc167e0ac03c7f4e721ee91b8d"
contentMode: "local-full"
zh: ""
---

## Available data

Claude Code sends the following JSON fields to your script via stdin:

| Field                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model.id`, `model.display_name`                                                 | Current model identifier and display name                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `cwd`, `workspace.current_dir`                                                   | Current working directory. Both fields contain the same value; `workspace.current_dir` is preferred for consistency with `workspace.project_dir`.                                                                                                                                                                                                                                                                                                                      |
| `workspace.project_dir`                                                          | Directory where Claude Code was launched, which may differ from `cwd` if the working directory changes during a session                                                                                                                                                                                                                                                                                                                                                |
| `workspace.added_dirs`                                                           | Additional directories added via `/add-dir` or `--add-dir`. Empty array if none have been added                                                                                                                                                                                                                                                                                                                                                                        |
| `workspace.git_worktree`                                                         | Git worktree name when the current directory is inside a linked worktree created with `git worktree add`. Absent in the main working tree. Populated for any git worktree, unlike `worktree.*`, which is present only while the session is in a [worktree session](https://code.claude.com/docs/en/worktrees)                                                                                                                                                                                      |
| `workspace.repo.host`, `workspace.repo.owner`, `workspace.repo.name`             | Repository identity parsed from the `origin` remote, for example, `"github.com"`, `"anthropics"`, `"claude-code"`. Absent outside a git repository or when no `origin` remote is configured. For a gitlab.com project nested in subgroups, `owner` is the full namespace path with slashes, such as `"group/subgroup"`. Before v2.1.260, `workspace.repo` was absent for these projects                                                                                |
| `cost.total_cost_usd`                                                            | Estimated session cost in USD, computed client-side at list price unless a [`modelPricing`](https://code.claude.com/docs/en/settings-reference#modelpricing) table is in effect. May differ from your actual bill. Resets to \$0 when `/clear` starts a new session. Before v2.1.211, the total carried over after `/clear`                                                                                                                                                                        |
| `cost.total_duration_ms`                                                         | Total wall-clock time since the session started, in milliseconds                                                                                                                                                                                                                                                                                                                                                                                                       |
| `cost.total_api_duration_ms`                                                     | Total time spent waiting for API responses in milliseconds                                                                                                                                                                                                                                                                                                                                                                                                             |
| `cost.total_lines_added`, `cost.total_lines_removed`                             | Lines of code changed                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `context_window.total_input_tokens`, `context_window.total_output_tokens`        | Token counts currently in the context window, from the most recent API response. Input includes cache reads and writes                                                                                                                                                                                                                                                                                                                                                 |
| `context_window.context_window_size`                                             | Maximum context window size in tokens. 200000 by default, or 1000000 for models with extended context.                                                                                                                                                                                                                                                                                                                                                                 |
| `context_window.used_percentage`                                                 | Pre-calculated percentage of context window used                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `context_window.remaining_percentage`                                            | Pre-calculated percentage of context window remaining                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `context_window.current_usage`                                                   | Token counts from the last API call, described in [context window fields](#context-window-fields)                                                                                                                                                                                                                                                                                                                                                                      |
| `exceeds_200k_tokens`                                                            | Whether the total token count (input, cache, and output tokens combined) from the most recent API response exceeds 200k. This is a fixed threshold regardless of actual context window size.                                                                                                                                                                                                                                                                           |
| `fast_mode`                                                                      | Whether [fast mode](https://code.claude.com/docs/en/fast-mode) is enabled for the session                                                                                                                                                                                                                                                                                                                                                                                                          |
| `effort.level`                                                                   | Current reasoning effort (`low`, `medium`, `high`, `xhigh`, or `max`). Reflects the live session value, including mid-session `/effort` changes. Ultracode is not a distinct level and reports as `xhigh`. Absent when the current model does not support the effort parameter                                                                                                                                                                                         |
| `thinking.enabled`                                                               | Whether extended thinking is enabled for the session                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `rate_limits.five_hour.used_percentage`, `rate_limits.seven_day.used_percentage` | Percentage of the 5-hour or 7-day rate limit consumed, from 0 to 100                                                                                                                                                                                                                                                                                                                                                                                                   |
| `rate_limits.five_hour.resets_at`, `rate_limits.seven_day.resets_at`             | Unix epoch seconds when the 5-hour or 7-day rate limit window resets                                                                                                                                                                                                                                                                                                                                                                                                   |
| `rate_limits.spend_limit.used_percentage`, `rate_limits.spend_limit.resets_at`   | Behind a [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits#usage-warnings-in-claude-code), the percentage used of the spend limit that applies to you, and the Unix epoch seconds when its period resets. The percentage runs from 0 to 100, or above 100 once you exceed the limit. Requires Claude Code v2.1.251 or later                                                                                                                                   |
| `prompt_cache`                                                                   | The session's [prompt cache](https://code.claude.com/docs/en/prompt-caching) statistics for the main conversation: hit ratio, misses, and whether the cache is warm. See [prompt cache fields](#prompt-cache-fields) for every field. Absent until the main conversation's first API response. Requires Claude Code v2.1.251 or later                                                                                                                                                              |
| `session_id`                                                                     | Unique session identifier                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `session_name`                                                                   | Session name. Uses the custom name set with the `--name` flag or `/rename` when one exists, otherwise the AI-generated session title. The [default display name](https://code.claude.com/docs/en/sessions#name-your-sessions), such as `my-app-3f`, doesn't populate this field. Absent when the session has neither a custom name nor an AI-generated title                                                                                                                                       |
| `prompt_id`                                                                      | UUID identifying the user prompt currently being processed. Matches the [`prompt.id` attribute on OpenTelemetry events](https://code.claude.com/docs/en/monitoring-usage#event-correlation-attributes). Absent until the first user input. Requires Claude Code v2.1.196 or later                                                                                                                                                                                                                  |
| `transcript_path`                                                                | Path to conversation transcript file                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `version`                                                                        | Claude Code version                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `output_style.name`                                                              | Name of the current output style                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `vim.mode`                                                                       | Current vim mode (`NORMAL`, `INSERT`, `VISUAL`, or `VISUAL LINE`) when [vim mode](https://code.claude.com/docs/en/interactive-mode#vim-editor-mode) is enabled                                                                                                                                                                                                                                                                                                                                     |
| `agent.name`                                                                     | Agent name when running with the `--agent` flag or agent settings configured                                                                                                                                                                                                                                                                                                                                                                                           |
| `pr.number`, `pr.url`                                                            | Open pull request for the current branch. Mirrors the PR badge in the footer. In a repository with a GitLab remote, Claude Code fills these fields from the branch's open [merge request](https://code.claude.com/docs/en/interactive-mode#gitlab-merge-requests) instead, so `pr.number` is the merge request number. Merge request data requires Claude Code v2.1.234 or later. Absent when not in a git repository, until a pull request or merge request is found, or once it merges or closes |
| `pr.review_state`                                                                | Review status of the open PR: `approved`, `pending`, `changes_requested`, or `draft`. May be independently absent even when `pr` is present                                                                                                                                                                                                                                                                                                                            |
| `pr.kind`                                                                        | `mr` when `pr` describes a [GitLab merge request](https://code.claude.com/docs/en/interactive-mode#gitlab-merge-requests). Absent for GitHub pull requests, so scripts written before this field keep working. For a merge request, Claude Code sets `review_state` to `approved` when GitLab reports it mergeable, `pending` for any other open state, and `draft` for a draft. Requires Claude Code v2.1.234 or later                                                                            |
| `worktree.name`                                                                  | Name of the active worktree. Present only while the session is in a [worktree session](https://code.claude.com/docs/en/worktrees)                                                                                                                                                                                                                                                                                                                                                                  |
| `worktree.path`                                                                  | Absolute path to the worktree directory                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `worktree.branch`                                                                | Git branch name for the worktree (for example, `"worktree-my-feature"`). Absent for hook-based worktrees                                                                                                                                                                                                                                                                                                                                                               |
| `worktree.original_cwd`                                                          | The directory Claude was in before entering the worktree                                                                                                                                                                                                                                                                                                                                                                                                               |
| `worktree.original_branch`                                                       | Git branch checked out before entering the worktree. Absent for hook-based worktrees                                                                                                                                                                                                                                                                                                                                                                                   |

  Your status line command receives this JSON structure via stdin:

  ```json theme={null}
  {
    "cwd": "/current/working/directory",
    "session_id": "abc123...",
    "session_name": "my-session",
    "prompt_id": "550e8400-e29b-41d4-a716-446655440000",
    "transcript_path": "/path/to/transcript.jsonl",
    "model": {
      "id": "claude-opus-5",
      "display_name": "Opus"
    },
    "workspace": {
      "current_dir": "/current/working/directory",
      "project_dir": "/original/project/directory",
      "added_dirs": [],
      "git_worktree": "feature-xyz",
      "repo": {
        "host": "github.com",
        "owner": "anthropics",
        "name": "claude-code"
      }
    },
    "version": "2.1.90",
    "output_style": {
      "name": "default"
    },
    "cost": {
      "total_cost_usd": 0.01234,
      "total_duration_ms": 45000,
      "total_api_duration_ms": 2300,
      "total_lines_added": 156,
      "total_lines_removed": 23
    },
    "context_window": {
      "total_input_tokens": 15500,
      "total_output_tokens": 1200,
      "context_window_size": 200000,
      "used_percentage": 8,
      "remaining_percentage": 92,
      "current_usage": {
        "input_tokens": 8500,
        "output_tokens": 1200,
        "cache_creation_input_tokens": 5000,
        "cache_read_input_tokens": 2000
      }
    },
    "exceeds_200k_tokens": false,
    "prompt_cache": {
      "warm": true,
      "caching_observed": true,
      "ttl": "1h",
      "expires_at": 1738429200,
      "requests": 14,
      "misses": 2,
      "expected_rebuilds": 1,
      "hit_ratio": 0.91,
      "cache_write_tokens": 352000,
      "miss_recache_tokens": 310200,
      "last_miss_at": 1738425230,
      "last_miss_cause": {
        "causes": ["tools_changed"],
        "tools_added": 2,
        "tools_removed": 0
      },
      "miss_causes": {
        "tools_changed": 2
      },
      "recache_tokens_if_cold": 45000
    },
    "fast_mode": false,
    "effort": {
      "level": "high"
    },
    "thinking": {
      "enabled": true
    },
    "rate_limits": {
      "five_hour": {
        "used_percentage": 23.5,
        "resets_at": 1738425600
      },
      "seven_day": {
        "used_percentage": 41.2,
        "resets_at": 1738857600
      },
      "spend_limit": {
        "used_percentage": 62.8,
        "resets_at": 1740787200
      }
    },
    "vim": {
      "mode": "NORMAL"
    },
    "agent": {
      "name": "security-reviewer"
    },
    "pr": {
      "number": 1234,
      "url": "https://github.com/anthropics/claude-code/pull/1234",
      "review_state": "pending"
    },
    "worktree": {
      "name": "my-feature",
      "path": "/path/to/.claude/worktrees/my-feature",
      "branch": "worktree-my-feature",
      "original_cwd": "/path/to/project",
      "original_branch": "main"
    }
  }
  ```

  **Fields that may be absent** (not present in JSON):

  * `session_name`: appears when a custom name has been set with `--name` or `/rename`, or once an AI-generated session title exists. The default display name, such as `my-app-3f`, doesn't populate it
  * `prompt_id`: appears only after the first user input
  * `workspace.git_worktree`: appears only when the current directory is inside a linked git worktree
  * `workspace.repo`: appears only inside a git repository with an `origin` remote configured
  * `effort`: appears only when the current model supports the reasoning effort parameter
  * `vim`: appears only when vim mode is enabled
  * `agent`: appears only when running with the `--agent` flag or agent settings configured
  * `pr`: appears only while an open PR or GitLab merge request is found for the current branch, and is removed once it merges or closes. `pr.review_state` and `pr.kind` may be independently absent
  * `worktree`: appears only while the session is in a [worktree session](https://code.claude.com/docs/en/worktrees). When present, `branch` and `original_branch` may also be absent for hook-based worktrees
  * `rate_limits`: appears only for Claude.ai Pro and Max subscribers, or behind a Claude apps gateway that sets a spend limit for you, and only after the first API response in the session. Each window (`five_hour`, `seven_day`, `spend_limit`) may be independently absent, and Claude Code drops a window once its `resets_at` time passes. Use `jq -r '.rate_limits.five_hour.used_percentage // empty'` to handle absence gracefully.
  * `prompt_cache`: appears after the main conversation's first API response. See [prompt cache fields](#prompt-cache-fields)

  **Fields that may be `null`**:

  * `context_window.current_usage`: `null` before the first API call in a session, and again after `/compact` until the next API call repopulates it
  * `context_window.used_percentage`, `context_window.remaining_percentage`: may be `null` early in the session

  Handle missing fields with conditional access and null values with fallback defaults in your scripts.

### Context window fields

The `context_window` object describes the live context window from the most recent API response.

* **Combined totals** (`total_input_tokens`, `total_output_tokens`): tokens currently in the context window. `total_input_tokens` is the sum of `input_tokens`, `cache_creation_input_tokens`, and `cache_read_input_tokens`; `total_output_tokens` is the output tokens from the most recent response. Both are `0` before the first API response.
* **Per-component usage** (`current_usage`): the same token counts broken out by category. Use this when you need cache hits separate from fresh input.

The `current_usage` object contains:

* `input_tokens`: input tokens in current context
* `output_tokens`: output tokens generated
* `cache_creation_input_tokens`: tokens written to cache
* `cache_read_input_tokens`: tokens read from cache

For what the cache fields mean and how they're billed, see [check cache performance](https://code.claude.com/docs/en/prompt-caching#check-cache-performance).

The `used_percentage` field is calculated from input tokens only: `input_tokens + cache_creation_input_tokens + cache_read_input_tokens`. It does not include `output_tokens`.

If you calculate context percentage manually from `current_usage`, use the same input-only formula to match `used_percentage`.

The `current_usage` object is `null` before the first API call in a session, and again immediately after `/compact` until the next API call repopulates it.

### Prompt cache fields

The `prompt_cache` object summarizes how the session's main conversation is using the [prompt cache](https://code.claude.com/docs/en/prompt-caching). Claude Code computes it from the cache token counts in the API's responses, so it works on every provider.

The object appears after the main conversation's first API response. Claude Code doesn't count subagent requests in these statistics. Requires Claude Code v2.1.251 or later.

The table lists each field with its meaning. Timestamps are Unix epoch seconds, the same unit as `rate_limits.*.resets_at`. A short status line usually shows one or two of these; `warm` and `hit_ratio` summarize the cache state most directly.

| Field                    | Description                                                                                                                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `warm`                   | Whether the cached prefix is still within its TTL. `false` when the last response reported no cache tokens, even while `caching_observed` is `true`                                                                                  |
| `caching_observed`       | Whether any response this session reported cache tokens. `false` means prompt caching is off, or your provider or gateway doesn't report it                                                                                          |
| `ttl`                    | [Cache lifetime](https://code.claude.com/docs/en/prompt-caching#cache-lifetime) of the current cached prefix: `"5m"` or `"1h"`                                                                                                                                   |
| `expires_at`             | When the cached prefix leaves its TTL and goes cold, in epoch seconds. `null` when the last response reported no cache tokens                                                                                                        |
| `requests`               | API requests recorded for the main conversation this session                                                                                                                                                                         |
| `misses`                 | Requests that re-processed content the cache already held: more than 5% and at least 2,000 tokens of what the request could have read from cache, with no compaction or tool-result clearing to explain the shortfall in cache reads |
| `expected_rebuilds`      | Cache rebuilds that followed a compaction or a clearing of old tool results                                                                                                                                                          |
| `hit_ratio`              | Cache read tokens as a fraction of all input tokens this session, from 0 to 1. The denominator counts cache reads, cache writes, and uncached input. `null` while those counts are all zero                                          |
| `cache_write_tokens`     | All tokens written to the cache this session, the first request's initial write included                                                                                                                                             |
| `miss_recache_tokens`    | Tokens written to the cache by the requests counted as misses                                                                                                                                                                        |
| `last_miss_at`           | When the last miss happened, in epoch seconds. `null` while the session has no misses                                                                                                                                                |
| `last_miss_cause`        | What Claude Code identified as the likely cause of the last miss, described under [Last miss cause](#last-miss-cause). Requires Claude Code v2.1.260 or later                                                                        |
| `miss_causes`            | How many of this session's diagnosed misses had each cause, keyed by the same cause names as `last_miss_cause`. Requires Claude Code v2.1.260 or later                                                                               |
| `recache_tokens_if_cold` | Tokens the next request re-caches if the cache has gone cold by then. `null` right after a compaction or a clearing of old tool results, until the next request records the rewritten conversation's size                            |

Claude Code shows the same statistics in the terminal, on the [`/usage` command's `Prompt cache (main)` line](https://code.claude.com/docs/en/costs#prompt-cache-statistics).

<h4 id="last-miss-cause">
  Last miss cause
</h4>

The `last_miss_cause` object reports what Claude Code identified as the likely cause of the most recent miss. Its `causes` array holds one or more cause names, such as `tools_changed`, `system_prompt_changed`, `ttl_expired_5m`, or `likely_server_side`. The object is `null` until the session's first miss, and again whenever Claude Code couldn't identify a cause for the most recent miss. Requires Claude Code v2.1.260 or later.

Two causes add counts to the object:

* `tools_added` and `tools_removed`: with `tools_changed`, how many tools were added to or removed from the request
* `system_char_delta`: with `system_prompt_changed`, the change in the system prompt's length, in characters
