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
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/10-cli/README.md"
sourceRel: "10-cli/README.md"
rawUrl: "/raw/09-harness/claude-howto/10-cli/README.md"
sourceSha256: "d828c0d6684b52e2c08a4547b5e6e526f7b27045e72b6e3e8b73824e05e7f8e5"
pageSha256: "5cfd6464f05006a2bfb6acb3c6d25ea535f578cfb93f18f9577a2396d321efa4"
contentMode: "local-full"
zh: ""
---

## Key Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key for authentication |
| `ANTHROPIC_MODEL` | Override default model |
| `ANTHROPIC_DEFAULT_MODEL` | (v2.1.236) Sets the model new sessions start on. Unlike `ANTHROPIC_MODEL`, which pins the model, a `/model` pick still overrides this value **and persists across restarts** — that contrast is the point of the variable. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | Custom model option for API |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Override default Opus model ID |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Override default Sonnet model ID |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Override default Haiku model ID |
| `MAX_THINKING_TOKENS` | Set extended thinking token budget |
| `CLAUDE_CODE_EFFORT_LEVEL` | Set effort level (`low`/`medium`/`high`/`xhigh`/`max`) — default is `high` on Opus 5, Sonnet 5, and Opus 4.8 (`xhigh` on Opus 4.7); `xhigh` needs Opus 5, Sonnet 5, or Opus 4.8/4.7; `max` works on Opus 5, Sonnet 5, Opus 4.8/4.7/4.6 and Sonnet 4.6 |
| `CLAUDE_CODE_SIMPLE` | Minimal mode, set by `--bare` flag |
| `CLAUDE_CODE_SAFE_MODE` | Set to `1` to start with all customizations disabled (CLAUDE.md, plugins, skills, hooks, MCP) — env-var form of `--safe-mode`, for isolating config problems (v2.1.169) |
| `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` | Set to `1` to hide the bundled skills, workflows, and commands from the model (v2.1.169) |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Disable automatic CLAUDE.md updates |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Disable background task execution |
| `CLAUDE_CODE_DISABLE_CRON` | Disable scheduled/cron tasks |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | Disable git-related instructions |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | Disable terminal title updates |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | Disable 1M token context window |
| `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` | Disable mouse click/drag/hover in fullscreen mode; wheel scroll still works (v2.1.195+) |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | Disable non-streaming fallback |
| `CLAUDE_CODE_ENABLE_TASKS` | Enable task list feature |
| `CLAUDE_CODE_TASK_LIST_ID` | Named task directory shared across sessions |
| `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` | Toggle prompt suggestions (`true`/`false`) |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | Enable experimental agent teams |
| `CLAUDE_CODE_NEW_INIT` | Use new initialization flow |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Model for subagent execution |
| `CLAUDE_CODE_PLUGIN_SEED_DIR` | Directory for plugin seed files |
| `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` | Env vars to scrub from subprocesses |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | Override auto-compaction percentage |
| `CLAUDE_STREAM_IDLE_TIMEOUT_MS` | Stream idle timeout in milliseconds |
| `SLASH_COMMAND_TOOL_CHAR_BUDGET` | Character budget for slash command tools |
| `ENABLE_TOOL_SEARCH` | Enable tool search capability |
| `MAX_MCP_OUTPUT_TOKENS` | Maximum tokens for MCP tool output |
| `CLAUDE_CODE_PERFORCE_MODE` | Set to `1` to enable Perforce mode — treats files as read-only by default (for Perforce/P4 version control workflows) (added v2.1.98) |
| `DISABLE_UPDATES` | Blocks all update paths including manual `claude update`. Stricter than `DISABLE_AUTOUPDATER`, which only blocks the background autoupdater (v2.1.118+) |
| `CLAUDE_CODE_HIDE_CWD` | When set to `1`, hides the current working directory in the startup logo (privacy / screen-share use) (v2.1.119+) |
| `CLAUDE_CODE_FORK_SUBAGENT` | Set to `1` to turn fork mode on where it is off by default: non-interactive mode (`claude -p`), the Agent SDK, or Claude Code older than v2.1.232. Since v2.1.232 fork mode is on by default in interactive sessions on every build, first-party or not (GA v2.1.117) |
| `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN` | Set to `1` to opt out of the fullscreen alternate-screen renderer; the session stays in normal terminal scrollback. Useful when piping transcripts to logs or pairing with `script(1)` (v2.1.132+). |
| `CLAUDE_CODE_SESSION_ID` | Set in every Bash tool subprocess launched by Claude Code; equals the `session_id` in hook input JSON. Use to correlate bash logs with hook telemetry (v2.1.132+). |
| `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` | Set to `1` to re-enable Anthropic's session-quality survey for organizations capturing OpenTelemetry data. Off by default in OTEL deployments (v2.1.136+). |
| `OTEL_LOG_TOOL_DETAILS` | Set to `1` to unredact custom and MCP command names in OpenTelemetry events (v2.1.117+). Redaction remains the default. |
| `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` | Configures the truncation limit (default 60 KB) applied to OpenTelemetry content attributes (v2.1.214) |
| `FORCE_HYPERLINK` | Set to `0` to opt out of clickable PR-badge hyperlinks in the footer, which now render even when terminal support can't be auto-detected (v2.1.217) |
| `ANTHROPIC_BEDROCK_SERVICE_TIER` | Selects the Bedrock service tier: `default`, `flex`, or `priority` (v2.1.122+) |
| `AI_AGENT` | Set automatically on subprocesses so external CLIs (e.g., `gh`) can attribute traffic to Claude Code (v2.1.120+) |
| `CLAUDE_CODE_FORCE_SYNC_OUTPUT` | Set to `1` to force synchronous output for terminals where auto-detection misses (e.g., Emacs `eat`) (v2.1.129+) |
| `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` | Set to `1` to enable background upgrades for Homebrew/WinGet installs (which normally do not auto-update) (v2.1.129+) |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | Set to `1` to opt in to gateway `/v1/models` discovery when `ANTHROPIC_BASE_URL` is set. Without it, `/model` shows the built-in static list (v2.1.129+) |
| `CLAUDE_CODE_ENABLE_AUTO_MODE` | Legacy opt-in for auto mode on Bedrock, Vertex, and Foundry (v2.1.158–v2.1.206). As of v2.1.207, auto mode is available by default on those providers for Sonnet 5, Opus 4.7/4.8, and Fable 5 (Opus 5 added in v2.1.219) — this variable is accepted for compatibility but has no effect |
| `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` | Cap on WebSearch tool calls per session, to stop runaway search loops. Default 200 (v2.1.212) |
| `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` | Cap on subagents running concurrently. Default 20 (v2.1.217) |
| `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` | Controls how deep nested subagent spawns can go. Since v2.1.219 the default is **3 layers** (was 1); set to `1` to disable nesting entirely |
| `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` | Threshold, in milliseconds, before a long-running MCP tool call auto-backgrounds. Default 120000 (2 minutes) (v2.1.212) |
| `CLAUDE_AX_SCREEN_READER` | Set to `1` to enable plain-text screen reader rendering mode. Same effect as `--ax-screen-reader` or `"axScreenReader": true` in settings (v2.1.208) |
| `CLAUDE_CLIENT_PRESENCE_FILE` | Point at a marker file to suppress mobile push notifications while you're at the machine (v2.1.181+). Note: the name is `CLAUDE_CLIENT_PRESENCE_FILE`, not `CLAUDE_CODE_CLIENT_PRESENCE_FILE`. |
| `CLAUDE_CODE_MAX_RETRIES` | Maximum number of API retry attempts. Capped at 15 as of v2.1.186. |
| `CLAUDE_CODE_RETRY_WATCHDOG` | Retry control recommended for unattended sessions, as an alternative to raising `CLAUDE_CODE_MAX_RETRIES` (v2.1.186+). |
| `CLAUDE_ENABLE_STREAM_WATCHDOG` | Streaming idle watchdog (aborts/retries after 5 min with no stream events) is on by default for all providers; set to `0` to disable (v2.1.196). |
| `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` | Override the 5-minute idle abort for remote MCP tool calls that hang with no response (v2.1.187+). |
| `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` | **Removed (no-op as of v2.1.160).** Previously pinned Fast Mode (`/fast`) to Opus 4.6. As of v2.1.219, `/fast` applies to **Opus 5 and Opus 4.8** only — Opus 4.6 and Opus 4.7 are no longer fast-mode targets. |
| `CLAUDE_CODE_ENABLE_TODO_TOOLS` | Set to `1` to restore the todo/task-tracking tools (`TaskCreate`/`Get`/`Update`/`List`, `TodoWrite`), which are unavailable on Opus 4.8, Sonnet 5, Fable 5, Mythos 5, and newer models (v2.1.233) |
| `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` | How long WebFetch caches a fetched URL. Default 15 minutes (v2.1.233) |
| `CLAUDE_CODE_TOOL_MEMORY_LIMIT` | Linux only: opt in to a memory cgroup applied to Bash commands (v2.1.233) |
| `ANTHROPIC_BEDROCK_REGION_PREFIX` | Prefer a specific Bedrock cross-region inference profile (v2.1.224) |
| `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT` | Set to `1` to restore pre-v2.1.223 auto-compact behavior on unrecognized model IDs (v2.1.223) |
| `CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS` | Set to `0` to disable prefix staggering on dynamic-workflow fan-out (v2.1.229) |
| `CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS` | Overrides the `dialogExpiry` setting (v2.1.224) |
| `CLAUDE_CODE_PROJECT_DIR_NAME` | Overrides the per-project transcript directory name Claude Code derives from the project path (v2.1.234) |

> **These eight rows are changelog-sourced.** The CLI reference page has no dedicated
> environment-variable section, so they are documented from the v2.1.221–v2.1.234
> changelog entries rather than a reference page.

> **`CLAUDE_CODE_DISABLE_1M_CONTEXT` widened in v2.1.223**: it now holds **every** Claude model with a native 1M-token window to 200K via auto-compaction, not just a fixed list of model IDs.

> **`ENABLE_TOOL_SEARCH` on Vertex AI (v2.1.119+)**: Tool search is **disabled by default on Google Cloud Vertex AI** deployments. Users who want the tool-search capability on Vertex must explicitly opt in with `export ENABLE_TOOL_SEARCH=true`. On direct Anthropic API it remains enabled by default.
