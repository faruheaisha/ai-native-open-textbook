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
pageSha256: "aabfa69c85173fd5f483d69f7729c1d0697cefc6c68b7bb1e0dc14cf70ddcac5"
contentMode: "local-full"
zh: ""
---

## Scheduled Tasks

Scheduled Tasks let you run prompts automatically on a recurring schedule or as one-time reminders. Tasks are session-scoped — they run while Claude Code is active and are cleared when the session ends. Available since v2.1.72+.

> **Marketed as "Routines" on claude.com (2026-05-14)**: Anthropic's product blog introduces this surface as **Routines**. The CLI command stays `/schedule`; this guide uses the original "Scheduled Tasks" naming for continuity. If you see "Routines" in claude.com docs or the desktop app, it refers to the same feature.

### The `/loop` command

```bash
# Explicit interval
/loop 5m check if the deployment finished

# Natural language
/loop check build status every 30 minutes
```

Standard 5-field cron expressions are also supported for precise scheduling.

### One-time reminders

Set reminders that fire once at a specific time:

```
remind me at 3pm to push the release branch
in 45 minutes, run the integration tests
```

### Managing scheduled tasks

| Tool | Description |
|------|-------------|
| `CronCreate` | Create a new scheduled task |
| `CronList` | List all active scheduled tasks. Since v2.1.136, output also includes the qualifier(s) and the scheduled prompt body, so you can audit what each cron will run without opening it. |
| `CronDelete` | Remove a scheduled task |

**Limits and behavior**:
- Up to **50 scheduled tasks** per session
- Session-scoped — cleared when the session ends
- Recurring tasks auto-expire after **3 days**
- Tasks only fire while Claude Code is running — no catch-up for missed fires

### Behavior details

| Aspect | Detail |
|--------|--------|
| **Recurring jitter** | Up to 10% of the interval (max 15 minutes) |
| **One-shot jitter** | Up to 90 seconds on :00/:30 boundaries |
| **Missed fires** | No catch-up — skipped if Claude Code was not running |
| **Persistence** | Not persisted across restarts |

### Cloud Scheduled Tasks

Use `/schedule` to create Cloud scheduled tasks that run on Anthropic infrastructure:

```
/schedule daily at 9am run the test suite and report failures
```

Cloud scheduled tasks persist across restarts and do not require Claude Code to be running locally.

### Disabling scheduled tasks

```bash
export CLAUDE_CODE_DISABLE_CRON=1
```

> **`/schedule` auto-disabled by API-key tiers (v2.1.139)**: Cloud `/schedule` is silently unavailable when any of `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper` is set — even if you are also logged in with claude.ai. The same condition disables [Remote Control](#disabling-remote-control-disableremotecontrol-v21128), claude.ai MCP connectors, and notification preferences. Unset the API key (or run on a Pro/Max OAuth tier) to use `/schedule`. Local `CronCreate` is unaffected.

### Example: monitoring a deployment

```
/loop 5m check the deployment status of the staging environment.
        If the deploy succeeded, notify me and stop looping.
        If it failed, show the error logs.
```

> **Tip**: Scheduled tasks are session-scoped. For persistent automation that survives restarts, use CI/CD pipelines, GitHub Actions, or Desktop App scheduled tasks instead.
