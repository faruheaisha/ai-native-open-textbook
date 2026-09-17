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
pageSha256: "fbfd4752d8549a6455e8d8c9fe3640ac79e645314464b8e217defa7afb98e79f"
contentMode: "local-full"
zh: ""
---

## Session Management

Manage multiple Claude Code sessions effectively.

### Session Management Commands

| Command | Description |
|---------|-------------|
| `/resume` | Resume a conversation by ID or name |
| `/rename` | Name the current session |
| `/fork [prompt]` | Copy the conversation into a new independent background session and keep working here (v2.1.212+) |
| `/subtask <task>` | Spawn a forked subagent that inherits the full conversation and reports its result back here (v2.1.212+) |
| `/branch [name]` | Switch into a copy of the conversation at this point, preserving the original |
| `claude -c` | Continue most recent conversation |
| `claude -r "session"` | Resume session by name or ID |

### Resuming Sessions

**Continue last conversation**:
```bash
claude -c
```

**Resume a named session**:
```bash
claude -r "auth-refactor" "finish this PR"
```

**Rename the current session** (inside the REPL):
```
/rename auth-refactor
```

> **v2.1.212 update**: Typing `/resume` (with no arguments) in the agent view now opens a picker of past sessions — including sessions removed from the visible list — and resumes the chosen one as a background session.

### Forking and Branching Sessions

Three commands make copies of a conversation, and they differ in *where the copy runs*:

`/subtask <task>` spawns a forked subagent that inherits the full conversation and works on the task while you keep working — its own row in `claude agents`, with the result returned to your conversation when it finishes:

```
/subtask Investigate why the auth tests are flaky
```

`/fork [prompt]` copies the conversation into a new **background session** instead. The copy starts with everything up to now and runs independently — nothing comes back to this conversation:

```
/fork Try the OAuth approach end to end
```

To switch into a copy yourself rather than delegating at all, use `/branch [name]`, which preserves the original and lets you return to it with `/resume`:

```
/branch try-oauth-instead
```

> **Note**: `/fork` and `/subtask` swapped roles in **v2.1.212**. Before v2.1.161 `/fork` was an alias for `/branch`; from v2.1.161 to v2.1.211 it started a forked subagent — the behavior now carried by `/subtask`. When agent view is turned off, `/subtask` is unavailable and `/fork` retains the forked-subagent behavior.

Or fork from the CLI:
```bash
claude --resume auth-refactor --fork-session "try OAuth instead"
```

### Session Persistence

Sessions are automatically saved and can be resumed:

```bash
# Continue last conversation
claude -c

# Resume specific session by name or ID
claude -r "auth-refactor"

# Resume and fork for experimentation
claude --resume auth-refactor --fork-session "alternative approach"
```

### Usage-Limit Auto-Continue (v2.1.234)

As of **v2.1.234**, a session blocked on a claude.ai usage limit auto-continues once that limit resets — no manual re-prompt needed. Toggle this from `/config` under "Continue automatically at usage limit."

### Session Recap (v2.1.108)

When you return to a session after being away, Claude can show a brief recap of what was accomplished. This is enabled by default for users with telemetry disabled (Bedrock, Vertex, Foundry users).

> **OTEL telemetry — re-enable feedback survey (v2.1.136+)**: Organizations capturing OpenTelemetry data can re-enable Anthropic's session-quality survey by setting `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL=1`. The survey is off by default in OTEL deployments because it was previously redirected away from telemetry pipelines.

> **OTEL telemetry — `assistant_response` log event (v2.1.193+)**: Claude Code emits a `claude_code.assistant_response` OpenTelemetry log event carrying the model's response text, letting OTEL pipelines capture what Claude said alongside the existing tool/event telemetry.

**Control recap behavior:**

```bash
/recap                                 # manually trigger a recap
/config                                # toggle auto-recap on/off
```

Or via environment variable:
```bash
CLAUDE_CODE_ENABLE_AWAY_SUMMARY=0 claude   # disable recap
CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1 claude   # force enable recap
```
