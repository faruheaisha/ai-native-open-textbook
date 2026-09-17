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
pageSha256: "c8a5e79a37c7e58338f2133574feb44be60e2a131f30a0ea259b132fd5a3ac3f"
contentMode: "local-full"
zh: ""
---

## Troubleshooting

### `claude agents` lists subagents instead of opening agent view

If `claude agents` prints a count followed by your configured subagents and then exits, agent view is unavailable in your environment. Run `claude update` to install the latest version.

If agent view still doesn't open after updating, check whether it has been [turned off](#turn-off-agent-view) by a setting or environment variable.

### Agent view opens with no sessions

Before you dispatch your first session, agent view shows the empty section headers with a description under each, plus a one-line explanation above the input, in place of the session list. Type a prompt in the input at the bottom and press `Enter` to dispatch your first session.

### Backgrounding shows a `Background this session?` dialog

If you press `←` to background the current session and Claude Code shows a `Background this session?` dialog, the session has in-flight work that backgrounding would stop, restart, or leave running unattended, and Claude Code asks before it does any of those:

* **Work that can't move**: the session has work that can't move to the background session, such as a running [monitor](https://code.claude.com/docs/en/tools-reference#monitor-tool). The dialog names the work Claude Code would stop and, separately, counts the tasks that carry over.
* **A workflow with running subagents**: a [dynamic workflow](https://code.claude.com/docs/en/workflows) still has subagents running. The workflow itself carries over, but its running subagents restart from the beginning, and the dialog says how many.
* **Automatic artifact replies**: Claude is [replying to comments on an artifact on its own](https://code.claude.com/docs/en/artifacts#let-claude-reply-to-comments-on-its-own). Those replies continue in the background session, and the dialog says so.

Run `/tasks` to see everything that's running, then confirm to background anyway or choose `Stay` to let the work finish first. See [What carries over when you background](#what-carries-over-when-you-background) for which kinds of work carry over and which Claude Code stops.

### Prompt rejected as too short

The dispatch input expects a task description, not a conversational opener. A prompt shorter than four characters is rejected with a `Too short` hint so a stray keystroke doesn't start a session. Describe what you want the session to do, such as `investigate the flaky checkout test`.

<h3 id="sessions-show-as-failed-after-shutdown">
  Sessions show as failed or stopped after shutdown
</h3>

Shutting down or restarting your machine stops running background sessions. A session that was waiting on your input stays under `Needs input` when you come back. For any other running session, what agent view shows depends on how long ago it last made progress:

* Within 48 hours, the session shows as failed. Attach or reply to it and it restarts from where it left off.
* Past 48 hours, such as after the machine was off for days, the session shows as stopped with `ended while the background service was off`. Press `Enter` on the row and the footer shows `Press enter again to resume this session (it ended while the background service was off), or ctrl+x to delete it.` Press `Enter` on the same row again to resume its saved conversation. A reply, or `claude attach <id>`, resumes it without that footer prompt.

When [transcript cleanup](https://code.claude.com/docs/en/settings-reference#cleanupperioddays) has removed a stopped session's saved conversation, Claude Code refuses to open the row: the message says there is nothing to resume. `claude rm <id>` deletes the row, except in the [kept cases](#what-deleting-a-session-removes) described above, and `claude respawn <id>` runs its original prompt again. See [This session's saved conversation is no longer on disk](https://code.claude.com/docs/en/errors#this-sessions-saved-conversation-is-no-longer-on-disk).

Sleep alone doesn't stop sessions. Sessions are preserved across sleep and the supervisor reconnects to them on wake.

### Opening a session says the conversation is already open

Two processes can't write to the same transcript. When a stopped session's saved conversation is already open in another live Claude Code process, Claude Code refuses to start the session's own process. What you see depends on what holds the conversation:

* A terminal where you resumed the conversation, for example with `claude --resume` or `/resume`: the row shows `Open in a terminal` with a hint to continue it there, and opening the row shows `Can't open — this session is running in another terminal`. Continue in that terminal, or exit it and open the row again.
* Another non-interactive Claude Code process, for example a background session process for the same conversation that hasn't exited yet: opening the row shows `This conversation is already open in another running Claude session`. Use that process, or wait for it to exit and open the row again.

Claude Code saves a reply you typed with the refused attempt and sends it the next time the session starts.

### Opening a session says it has no saved transcript

A stopped session that was [backgrounded from another conversation](#from-inside-a-session) and stopped before its first response finished has nothing to resume: until that first response finishes, the conversation still lives only in the session it was backgrounded from. `claude attach` refuses to open it with `This session has no saved transcript`.

In agent view, opening that row shows `Press enter again to restart this session fresh` below the list. Press `Enter` on the same row again to restart the session with an empty conversation, or run `claude respawn <id>` from the shell.

The original conversation is intact; resume it with `claude --resume` or keep working in it. See the [error reference](https://code.claude.com/docs/en/errors#this-session-has-no-saved-transcript) for details.

### The terminal host died or the session stopped responding

The [supervisor](#the-supervisor-process) runs each background session's terminal in its own host process. When that process dies or stops responding, Claude Code shows the reason and offers a restart; in both cases the conversation is saved and the restart resumes it. The [error reference](https://code.claude.com/docs/en/errors#terminal-host-process-died) quotes the full messages.

Claude Code never restarts a row running a [shell command](#run-a-shell-command), from `Enter` or from `claude attach`, because that would run the command again; the row's message and `claude attach` both say the command isn't run again.

#### Terminal host died

On Linux and WSL, the supervisor checks each host process every few seconds, whether or not you open the session, and marks the session failed when the process has exited but its connection to the supervisor never closed.

* In agent view, the row shows `terminal host process died — press Enter to restart`. Press `Enter` on it and Claude Code restarts the session on a fresh host process.
* From the shell, `claude attach <id>` restarts a session already marked failed. Otherwise it reports the cause and exits, telling you to run `claude attach <id>` again.

#### Session isn't responding

When the supervisor accepts an open but no output arrives for about ten seconds, Claude Code ends the attempt and offers a restart. A session that merely stalled, for example across machine sleep, doesn't reach this offer: the supervisor [restarts it on open](#read-session-state) itself.

* In agent view, the footer shows `Press enter again to restart this session — it isn't responding (its conversation is saved and resumes).` Press `Enter` on the same row again and Claude Code stops the unresponsive process and restarts the session; it stops nothing without that second press.
* From the shell, `claude attach <id>` reports the cause and exits, telling you to run `claude stop <id>`, then `claude attach <id>`.

### A session fails before starting with a `possibly low memory` note

When a background session's process exits before it finishes starting and the host is low on memory, the row's status names the exit and adds `possibly low memory — free some up and retry`.

The note is a hypothesis, not a confirmed cause. Claude Code adds it only when the process exited silently, without writing an error and without being stopped by a signal, and the host reported low memory at that moment. When the process did write an error before exiting, the row shows that error instead.

Free up memory on the machine, then attach or reply to the row and the supervisor starts a fresh process for the session. When memory stays low, the supervisor also [stops idle sessions](#the-supervisor-process) to free resources on its own, and stops idle pinned sessions too if stopping the others freed nothing.

### Agent view says the background service did not respond

If attaching, peeking, or `claude logs` reports that the background service did not respond, the supervisor process has likely stalled. Stop it and let the next `claude agents` start a fresh one. To keep your background sessions running through the restart, pass `--keep-workers`:

```bash theme={null}
claude daemon stop --any --keep-workers
```

The new supervisor reconnects to the running sessions. Without `--keep-workers`, the command ends the background sessions too. The `--any` flag confirms you want to stop a supervisor that started on demand rather than as an installed service, which is the default.

A supervisor that starts but can't accept connections exits and releases its lock on its own, so the next `claude agents` starts a fresh one without this manual stop. The steps above apply when a running supervisor stalls.

If the command instead exits saying the recorded process couldn't be verified as the supervisor, check the reported process ID: if it's a supervisor you own, stop it yourself, then delete `~/.claude/daemon.lock` so the next `claude agents` starts fresh.

On Windows, if the supervisor doesn't respond to the stop request, the command prints its process ID. End that process with `taskkill /PID <pid>` to finish the recovery. Background sessions are still preserved when you passed `--keep-workers`.

### Dispatch fails with `Could not resolve authentication method`

If a background dispatch fails with `Could not resolve authentication method` while interactive sessions authenticate normally, the worker that received the dispatch didn't pick up credentials. Background sessions get their credentials from the [supervisor](#the-supervisor-process), so this error means no stored credential was available to the supervisor process itself. Confirm you have run `/login` or configured an API key, then stop the supervisor:

```bash theme={null}
claude daemon stop --any --keep-workers
```

The next `claude agents` or `claude --bg` starts a fresh supervisor that reads your stored credentials. If you authenticate with an environment variable such as `ANTHROPIC_API_KEY` rather than `/login`, run that next command from a shell where the variable is set.

See the [error reference](https://code.claude.com/docs/en/errors#could-not-resolve-authentication-method) for the full list of causes and fixes.

### Background sessions can't read Desktop, Documents, or Downloads on macOS

On macOS, the background session host runs as its own process and requests access to protected folders separately from your terminal. If a background session reports `Operation not permitted` when reading `~/Desktop`, `~/Documents`, `~/Downloads`, or another protected location, grant access in System Settings under Privacy & Security > Files and Folders, or enable Full Disk Access for the entry.

With the native installer, the entry appears as Claude Code and the grant persists across updates. With other install methods such as Homebrew or npm, the entry shows the binary path and may need to be granted again after updating.

### Background sessions can't reach local-network hosts on macOS

On macOS 15 and later, the system blocks a process from reaching devices on your local network until you grant Local Network permission, so a command targeting a LAN address can fail with `connect: no route to host` in a background session even though it works in a foreground terminal. The first command in a background session that connects to a local-network address triggers the macOS Local Network permission prompt for Claude Code. Grant it once and those commands reach LAN hosts the same way they do in a foreground terminal.

### A session is slow to respond after attaching

When a session that has finished or is waiting for your next message stays unattached for about an hour, the supervisor stops its process to free resources. Attaching starts a fresh process from where it left off and switches to the session immediately while the process restarts. Sessions that are working, paused on a permission prompt or other dialog, or [pinned](#organize-the-list) aren't stopped this way, so pin a session with `Ctrl+T` to keep it responsive.

While the process starts, Claude Code shows the tail of the session's transcript formatted the way the live session renders it, with markdown, highlighted code blocks, and tool calls as dimmed rows, above a dimmed prompt area with a `Session is starting` note. The live session replaces it as soon as it's ready.

### `.claude/worktrees/` is filling up

Deleting a session in agent view removes the worktree Claude created for it, but [some deletes keep the worktree or leave its directory on disk](#what-deleting-a-session-removes), so leftover directories can accumulate. Directories git no longer recognizes don't appear in `git worktree list`, so remove those by hand.

List leftover entries with `git worktree list` in the project directory and remove each with `git worktree remove <path>`. See [Clean up worktrees](https://code.claude.com/docs/en/worktrees#clean-up-worktrees).
