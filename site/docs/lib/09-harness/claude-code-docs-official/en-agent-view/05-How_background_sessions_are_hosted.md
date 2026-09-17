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
sourceRel: "en/agent-view.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-view.md"
sourceSha256: "b77a9b549bf450a86bfbd7947ccc8bdd95b574bc0e043fa6fd281fc792690b1f"
pageSha256: "fc40a611a9fa3f0f043dcc88ff506346454891bb932018189644283ad27263cd"
contentMode: "local-full"
zh: ""
---

## How background sessions are hosted

Claude Code treats every session listed in agent view as a background session, whether or not you're currently attached to it. By contrast, a session started by running `claude` directly is tied to that terminal and ends when it closes, unless you [send it to the background](#from-inside-a-session).

To check which kind of session you're in, run [`/status`](https://code.claude.com/docs/en/commands). The `Session kind` row reads `background job · attached` or `background job · unattended` in a background session, depending on whether a terminal is attached, and `interactive` in any other session.

### The supervisor process

The supervisor is a background service that runs your background sessions so they keep working after you close agent view or your terminal. Claude Code starts it the first time you background a session or open agent view, and you don't need to manage it yourself.

Each session is its own Claude Code process under the supervisor, and what happens to that process depends on the session's state:

* **Working, paused on a permission prompt or other dialog, or attached**: the process keeps running. A running subagent, workflow, or monitor counts as working.
* **Finished or waiting for your next message, and unattached for about an hour**: the supervisor stops the process to free resources. A session that ended its turn by asking you a question counts as waiting for your next message. The conversation stays on disk, and the next time you attach or reply, the session resumes where it left off. Pin a session with `Ctrl+T` to keep its process running.
* **Exited unexpectedly while the supervisor is running**: the supervisor restarts the process. Ending a session you backgrounded yourself with `←` or `/background`, for example with `kill`, marks it stopped instead of restarting it. For sessions that ended with a shutdown, see [Sessions show as failed or stopped after shutdown](#sessions-show-as-failed-after-shutdown).
* **After an auto-update**: the supervisor restarts itself onto the new version and moves idle sessions over in the background. Sessions that are working, waiting on you, or attached aren't interrupted.

When a session's process stops or restarts, the background shell commands, dynamic workflows, and background subagents Claude started in it carry over to its next process; running monitors and shell commands a subagent started stop with the process. Deleting the session stops everything it carried over. To stop all of it with the process instead, set [`CLAUDE_CODE_DISABLE_BG_EXIT_HANDOFF`](https://code.claude.com/docs/en/env-vars#variables) to `1`.

The supervisor and its sessions authenticate with the same stored credentials as your interactive sessions. For which settings and shell variables reach a session, including `PATH`, see [Settings and provider](#settings-and-provider). For gateway endpoints, see [LLM gateway](#llm-gateway).

### Where state is stored

Session state is stored under your Claude Code config directory. If you set [`CLAUDE_CONFIG_DIR`](https://code.claude.com/docs/en/env-vars), the supervisor uses that directory instead of `~/.claude` and runs as a separate instance with its own sessions.

| Path                             | Contents                                                                                                                                       |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `~/.claude/daemon.log`           | Supervisor log                                                                                                                                 |
| `~/.claude/daemon/roster.json`   | List of running background sessions, used to reconnect after a restart                                                                         |
| `~/.claude/jobs/<id>/state.json` | Per-session state shown in agent view. Read it through [`claude agents --json`](#read-session-state-from-a-script) instead of parsing the file |
| `~/.claude/jobs/<id>/tmp/`       | Per-session scratch directory. Claude's `Write` and `Edit` calls here don't prompt for permission. Removed when the session is deleted         |

Each background session has the `CLAUDE_JOB_DIR` environment variable set to its `~/.claude/jobs/<id>` directory, so shell commands the session runs can write temporary files to `$CLAUDE_JOB_DIR/tmp` without colliding with parallel sessions.

To inspect this state without reading the files directly, run `claude daemon status`. It reports whether the supervisor is reachable, its process ID and version, the socket directory, and how many background sessions are live.

The command also warns when the running supervisor is on a different version than the `claude` you invoked, which happens after an update the supervisor hasn't restarted into yet. The warning shows both versions and tells you to run `claude daemon stop --any` to pick up the new version. When Claude Code is installed as an OS service, the suggested command is `claude daemon stop` without the flag.

Sessions survive that version mismatch intact: an older Claude Code version that updates a session's `state.json` preserves fields it doesn't recognize and keeps the session listed. The session list in `roster.json` follows the same rule, so sessions started by the newer version stay reachable and keep accepting input after the supervisor restarts.

### Turn off agent view

To turn off background agents and agent view entirely, set the `disableAgentView` [setting](https://code.claude.com/docs/en/settings) to `true` or set the `CLAUDE_CODE_DISABLE_AGENT_VIEW` environment variable. Administrators can enforce this through [managed settings](https://code.claude.com/docs/en/managed-settings).
