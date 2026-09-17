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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "573bbbb51d0cf18961e7c9a9fc7459c2d095843aea070883ad29c073b07f8666"
contentMode: "local-full"
zh: ""
---

## Background session errors

[Background sessions](https://code.claude.com/docs/en/agent-view) run without an interactive terminal of their own, so commands that need one behave differently there. These messages appear in the transcript of a background session, in the terminal that attaches to one, in the session or shell you dispatch from, or, for the [worktree-guard entries](#write-or-command-blocked-because-the-path-cannot-be-safely-resolved) below, in any session isolated in a worktree or running a worktree-isolated subagent; where a message is specific to one surface, its entry says so.

### Commands refused in a background session

Commands that open an interactive dialog can't do so while no terminal is attached to a background session. `/install-github-app`, the `/mcp` settings list, and the authentication actions in the MCP server menu respond with a message, and the session appears under **Needs input** in [agent view](https://code.claude.com/docs/en/agent-view) so you can find it, attach, and run the command again. While a terminal is attached, these commands work normally.

Before v2.1.216, the session didn't appear under **Needs input** after one of these refusals. In v2.1.213 through v2.1.215, the commands still worked while a terminal was attached, and the refusal message told you to attach and run the command again. From v2.1.208 through v2.1.212, Claude Code refused them even while a terminal was attached, with a message such as `Can't open MCP settings in a background session`; on those versions, run the command from a regular `claude` session instead, or upgrade. Before v2.1.208, they opened their dialog inside the background session. In v2.1.208 only, Claude Code also refused the `/model` picker in a background session, and `/upgrade` printed the upgrade URL instead of opening a browser.

The wording names the command. The `/mcp` settings list reports:

```text theme={null}
Can't open MCP settings while no terminal is attached to this background session. This session now shows "needs input" in agent view — open it and run /mcp to manage servers, or use `/mcp enable|disable|reconnect <server>` to steer without the panel.
```

**What to do:**

* Attach to the session from agent view, where it's listed under **Needs input**, and run the command again
* Or use the form the message names, such as `/mcp reconnect <server>`, `/mcp enable`, or `/mcp disable`, which work without attaching

### Write or command blocked because the path cannot be safely resolved

Claude addressed a file or working directory through a spelling that the [worktree-isolation guard](https://code.claude.com/docs/en/agent-view#how-file-edits-are-isolated) can't resolve to one verifiable location. The guard checks writes and command working directories in [any session isolated in a worktree](https://code.claude.com/docs/en/worktrees#how-claude-code-enforces-isolation), interactive or background, and in [worktree-isolated subagents](https://code.claude.com/docs/en/worktrees#isolate-subagents-with-worktrees). It resolves symlinks before checking that the operation doesn't reach the shared checkout, and when resolution fails, it blocks the operation rather than letting it land there. The message names the path forms it refuses and how to retry:

```text theme={null}
This write was blocked because the path is spelled in a form that cannot be safely resolved (for example through a symlink storing a raw dot segment, a network-share or device-namespace shape, or an unreadable ancestor directory). If the file is inside the worktree /path/to/worktree, address it by its direct symlink-free path instead.
```

A blocked command reports the same cause for its working directory and ends with `re-run the command from its direct symlink-free path`. Before v2.1.217, the guard compared path spellings without resolving symlinks, so these spellings weren't blocked and a write routed through a symlink could land in the shared checkout.

**What to do:**

* Usually nothing: the full message goes to Claude as a tool error, and Claude retries with the direct path it names. For a blocked file edit, the conversation view shows only a short `Error editing file` line; the full message appears in the transcript view, which you open with `Ctrl+O`. A blocked command prints it in its command output.
* If the block repeats on the same file, the path likely runs through a committed symlink whose target contains `..`, such as `docs/current -> ../README.md`; ask Claude to edit the target file by its real path instead of through the link

### Write or command blocked because the path names a network location

Claude addressed a file or working directory through a path that names a drive that isn't on your machine, a UNC share such as `\\server\share\file` or a `/net` automount path, while the session's checkout is on a local disk. The same [worktree-isolation guard](#write-or-command-blocked-because-the-path-cannot-be-safely-resolved) can't verify that such a path stays out of the shared checkout, so it blocks the operation. Isolating the session in a worktree doesn't lift the block. The message names the form of path to use instead:

```text theme={null}
This write was blocked because the path is network-shaped (a UNC share or /net automount spelling) while this session's checkout is local. Isolating cannot unblock it. If the file is genuinely inside the worktree /path/to/worktree, address it by its local, plainly-spelled path instead.
```

A blocked command reports the same cause for its working directory and ends with `re-run the command from its local, plainly-spelled path`. Before v2.1.217, the guard compared path text only, so addressing a file inside the checkout through a UNC or `/net` path wasn't blocked.

**What to do:**

* Usually nothing: Claude retries with the local spelling the message asks for
* If the file is on a network share rather than a local file spelled with a network path, it's outside the session's local workspace; edit it from a regular interactive session instead

### This session has no saved transcript

You attached to a stopped [background session](https://code.claude.com/docs/en/agent-view) that was backgrounded from another conversation with `←` or `/background` and stopped before its first response finished. Until that first response finishes, the conversation still lives only in the session it was backgrounded from, so `claude attach` refuses to start the stopped session rather than begin a blank conversation under the same session ID. The message ends with the `claude respawn` command for this session:

```text theme={null}
This session has no saved transcript — it was stopped before its first response finished. If it was backgrounded from another conversation, that one is still intact; `claude respawn <id>` starts this one fresh.
```

Opening the same session's row in [agent view](https://code.claude.com/docs/en/agent-view) shows `Press enter again to restart this session fresh` below the list instead, and a second `Enter` on the row restarts the session with an empty conversation. Before v2.1.212, opening the row showed the refusal message with no way to restart from agent view. Before v2.1.211, opening the stopped session silently started that blank conversation and could re-run the session's original prompt.

**What to do:**

* The conversation you backgrounded from is intact: resume it with [`claude --resume`](https://code.claude.com/docs/en/sessions) or keep working in it
* To start the stopped session fresh anyway, run `claude respawn <id>` with the ID from the message, or press `Enter` twice on its row in agent view
* If the session did finish a response and you still see this refusal on a version before v2.1.214, an unreadable folder in `~/.claude/projects` could make the transcript scan miss the saved conversation; update to v2.1.214 or later, which tolerates unreadable folders during the scan

<h3 id="this-session-is-running-in-another-terminal">
  This session is running in another terminal
</h3>

You opened a stopped session's row in [agent view](https://code.claude.com/docs/en/agent-view), and its saved conversation is already open in another live Claude Code process on this machine, so Claude Code refuses to start a second process that would write to the same transcript. Which message you see depends on [what holds the conversation](https://code.claude.com/docs/en/agent-view#opening-a-session-says-the-conversation-is-already-open):

```text theme={null}
Can't open — this session is running in another terminal
This conversation is already open in another running Claude session — use that one, or close it and try again
```

* **`running in another terminal`**: a terminal holds the conversation, for example one where you resumed it with `claude --resume` or `/resume`. The row also shows `Open in a terminal`.
* **`already open in another running Claude session`**: another non-interactive Claude Code process holds it, for example a [background session](https://code.claude.com/docs/en/agent-view#the-supervisor-process) process for the same conversation that hasn't exited yet.

Claude Code saves a reply you typed when opening the row and sends it as the session's next prompt when the session next starts.

**What to do:**

* Continue the conversation in the process that has it open, or exit that process and open the row again

Before v2.1.248, only the `already open in another running Claude session` refusal existed: a conversation resumed in a terminal didn't count as open, and opening the row started a second Claude Code process writing to the same conversation.

<h3 id="this-sessions-saved-conversation-is-no-longer-on-disk">
  This session's saved conversation is no longer on disk
</h3>

You opened a [background session](https://code.claude.com/docs/en/agent-view) that ended while the background service was off, and [transcript cleanup](https://code.claude.com/docs/en/settings-reference#cleanupperioddays) has since removed its saved conversation, for example after the machine was off for weeks. Opening such a row normally [resumes its saved conversation](https://code.claude.com/docs/en/agent-view#sessions-show-as-failed-after-shutdown). With nothing left to resume, Claude Code refuses rather than re-run the session's original prompt without asking:

```text theme={null}
This session's saved conversation is no longer on disk (it ended while the background service was off, and old transcripts are cleaned up), so there is nothing to resume. `claude rm 7c5dcf5d` deletes the row; `claude respawn 7c5dcf5d` runs its original prompt again instead.
```

`claude attach <id>` prints this text. In agent view, the footer is shorter and ends with `ctrl+x deletes the row`.

**What to do:**

* Run `claude rm <id>` to delete the row. When one of the [kept cases](https://code.claude.com/docs/en/agent-view#what-deleting-a-session-removes) applies, `claude rm` keeps the row and the worktree instead and names the reason
* To run the session's original prompt again as a fresh conversation, run `claude respawn <id>`

Before v2.1.248, opening such a row re-ran the session's original prompt instead of refusing, pulling a weeks-old task back into the foreground.

<h3 id="worktree-has-commits-that-are-not-pushed-anywhere">
  Worktree has commits that are not pushed anywhere
</h3>

You tried to delete a [background session](https://code.claude.com/docs/en/agent-view#what-deleting-a-session-removes) whose worktree holds commits Claude Code can't confirm are saved elsewhere. Claude Code keeps the worktree and the session row rather than destroy the commits unseen. `claude rm` names the branch and the unpushed commits, and says how to proceed:

```text theme={null}
kept 7c5dcf5d — 2 unpushed commits on claude/fix-login (a1b2c3d Fix login flow, … and 1 more)
  worktree: /home/you/project/.claude/worktrees/fix-login
  push them, or discard the worktree and its commits: claude rm 7c5dcf5d --discard-unpushed a1b2c3d000000000000000000000000000000000@0123456789abcdef0123456789abcdef
```

When Claude Code can't summarize the commits, the message reads `worktree has commits that are not pushed anywhere` instead. In [agent view](https://code.claude.com/docs/en/agent-view), the session's row shows `not deleted` with the same reason.

Commits on a remote don't block the delete. Neither do commits on the local copy of your `origin` remote's default branch, as long as that branch is checked out in your main checkout, the repository directory itself rather than a worktree.

**What to do:**

* To keep the commits, push the worktree's branch, or merge it into the default branch checked out in your main checkout, then delete the session again
* To discard the commits, run the `claude rm <id> --discard-unpushed` command the message printed, or press `Ctrl+X` twice on the session's row in agent view again. This removes the session and the worktree along with its branch, the unpushed commits, and any uncommitted changes. If the worktree has gained a commit since the refusal, Claude Code keeps it again and shows the updated state
* When the message says the worktree is also recorded by another finished session, deleting again doesn't discard it: push the commits, then delete the session again

Before v2.1.260, the message didn't name the branch or the commits, and deleting again was refused the same way: deleting the session without pushing meant removing the worktree yourself with `git worktree remove --force <path>`, then running `claude rm <id>` again.

Before v2.1.248, the default branch checked out in your main checkout didn't count: a branch you had already merged there still triggered this refusal until its commits reached a remote.

### Terminal host process died

Each [background session's](https://code.claude.com/docs/en/agent-view) terminal runs in a host process under the background service, and that process died while the service still held its connection, so the session couldn't be reached.

On Linux and WSL, the background service checks each host process every few seconds, marks the session failed when the process has exited but its connection to the service never closed, and shows the reason on its row in [agent view](https://code.claude.com/docs/en/agent-view#read-session-state):

```text theme={null}
terminal host process died — press Enter to restart
```

If you open the row before the check runs, the footer shows `This session's terminal host process died (the conversation is saved) — press Enter to restart it` and the row turns failed.

From the shell, `claude attach <id>` restarts a session already marked failed for a dead host, and otherwise prints the cause and exits:

```text theme={null}
Couldn't attach to <id> — This session's terminal host process died (the conversation is saved) — run `claude attach <id>` again to restart it on a fresh host.
```

The conversation is saved either way.

A row running a [shell command](https://code.claude.com/docs/en/agent-view#run-a-shell-command) instead shows `terminal host process died — its output is gone; the command was not run again`, and `claude attach` prints `This command's terminal host process died — its output is gone and the command was not run again`. Claude Code never reruns the command for you.

**What to do:**

* In agent view, press `Enter` on the failed row; the session restarts on a fresh host process and the conversation resumes
* From the shell, run `claude attach <id>` again. Claude Code prints `Session <id>'s terminal host died — restarting it on a fresh one…` and reopens the session
* You can't restart a shell-command row this way; dispatch the command again to rerun it

Before v2.1.247, a dead host process could pass every liveness check the background service ran, so opening the session showed `opening… · esc to cancel` indefinitely and `claude attach <id>` waited without reporting an error.

<h3 id="session-isnt-responding">
  Session isn't responding
</h3>

You opened a [background session](https://code.claude.com/docs/en/agent-view) and the background service accepted the open, but no output arrived for about ten seconds, so Claude Code concludes that the process relaying the session's terminal can't deliver output, and ends the attempt instead of waiting.

In agent view, Claude Code offers a restart in the footer:

```text theme={null}
Press enter again to restart this session — it isn't responding (its conversation is saved and resumes).
```

From the shell, `claude attach <id>` prints the cause and exits:

```text theme={null}
Couldn't attach to <id> — Session isn't responding — `claude stop <id>`, then `claude attach <id>` restarts it (the conversation is saved).
```

Claude Code never restarts a row running a [shell command](https://code.claude.com/docs/en/agent-view#run-a-shell-command) for you, because a restart would run the command again.

**What to do:**

* In agent view, press `Enter` on the same row again. Claude Code stops the unresponsive process and restarts the session, and the conversation resumes. Nothing is stopped without that second press
* From the shell, run `claude stop <id>`, then `claude attach <id>`
* For a shell-command row, press `Ctrl+X` in agent view or run `claude stop <id>` to stop it; dispatch the command again to rerun it

### Session was stopped while the respawn was in flight

You opened a [background session](https://code.claude.com/docs/en/agent-view) whose process wasn't running, and while Claude Code was restarting it, another Claude Code process stopped it, for example `claude stop` in another terminal. Claude Code keeps the session stopped:

```text theme={null}
Session <id> was stopped while the respawn was in flight
```

Opening a session you just dispatched, while its process is still starting, waits for the process instead. Before v2.1.246, opening it at that moment could stop it and show this message.

**What to do:**

* If you didn't stop the session, open its row again in agent view or run `claude respawn <id>` to restart it
* If you stopped it yourself, nothing remains to do: the session stays stopped

<h3 id="session-agent-no-longer-available">
  Session agent no longer available
</h3>

You resumed a session that was running a [custom agent](https://code.claude.com/docs/en/sub-agents#invoke-subagents-explicitly), started with `--agent` or the `agent` setting, and Claude Code didn't find an agent by that name. It searches the session's original directory first, when you have [trusted that workspace](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust), then the directory you resume from. The session still resumes, but with the default tools, so the agent's tool restrictions no longer apply:

```text theme={null}
This session was running agent 'code-reviewer', which is no longer available (no agent by that name in /home/you/project). Continuing with the default tools and system prompt — the agent's tool restrictions no longer apply. To restore it, re-create the agent, or resume with an explicit --agent <name>.
```

The warning names only the directories Claude Code searched, and it appears in the resumed conversation whether you wake a [background session](https://code.claude.com/docs/en/agent-view), run `/resume` or `claude --resume`, or resume in [non-interactive mode](https://code.claude.com/docs/en/headless), where it also goes to stderr. Sessions using `--input-format stream-json` don't show it, because the Agent SDK supplies agents after startup.

Claude Code doesn't save the fallback to the session, so the warning repeats on each resume until you act. The built-in `claude` agent doesn't trigger the warning, since falling back to the default toolset changes nothing for it. Before v2.1.216, Claude Code silently continued as the default agent, and the lookup covered only the directory you resumed from, so a project-scoped agent was lost on any resume from another directory.

**What to do:**

* Re-create the agent file at `.claude/agents/<name>.md` in the session's project, or at `~/.claude/agents/<name>.md` for a personal agent, then resume again
* Or resume with `--agent <name>` naming an agent that does exist, to run the session as that agent instead
* If the agent is project-scoped and you haven't trusted the session's original directory, run Claude Code there once, accept the trust dialog, then resume again

### CLAUDE\_CODE\_PROCESS\_WRAPPER launcher errors

[`CLAUDE_CODE_PROCESS_WRAPPER`](https://code.claude.com/docs/en/corporate-launcher) is set, and its value can't be used, so Claude Code refuses to start the affected process rather than run it without the launcher. Configuration problems are reported with a message that starts with the variable name and states the reason, for example:

```text theme={null}
CLAUDE_CODE_PROCESS_WRAPPER: launcher `/opt/corp/launcher` is not an executable regular file
```

A launcher that starts but exits without replacing itself with Claude Code fails the session it was starting, and the session's row in agent view reports that the launcher `must exec, not daemonize`, followed by anything the launcher printed. A session that can't start or reach the background service because of the launcher reports the launcher problem as the reason inside `Couldn't reach the background service (...)`.

**What to do:**

* Set the variable to the absolute path of an executable that ends by calling `exec "$@"`. See [the launcher contract](https://code.claude.com/docs/en/corporate-launcher#the-launcher-contract) for the full contract
* Check `/status`, which shows the resolved launch command in its Self-exec entry and warns when the running background service doesn't match it, or run `claude daemon status` from a shell
* After fixing the value in the `env` block of [settings](https://code.claude.com/docs/en/corporate-launcher#set-up-the-launcher), restart the background service with `claude daemon stop --any` so the next dispatch starts a wrapped one

### EUNKNOWN when starting a background session

Windows refused to start a program with an error code that has no standard name, so the failure surfaces as `EUNKNOWN`. The usual trigger is a software restriction policy, such as Group Policy or AppLocker, blocking the program being started. The error appears when you start a [background session](https://code.claude.com/docs/en/agent-view) with `/background` or `claude --bg`:

```text theme={null}
Couldn't reach the background service (spawn background service: EUNKNOWN: unknown error, uv_spawn) — run 'claude daemon status'
```

On some accounts the message says `daemon` in place of `background service`.

On an npm installation, an `EUNKNOWN` that appears while `npm install -g @anthropic-ai/claude-code` is replacing the binary has the same cause as [`EACCES` during a reinstall](#eacces-when-starting-a-background-session) and clears when you retry after the install finishes.

Claude Code starts the background service through PowerShell so the service survives closing the terminal, using PowerShell 7 when it's installed and Windows PowerShell 5.1 otherwise. When neither PowerShell can run, Claude Code starts the service directly instead, so a policy that blocks only PowerShell doesn't cause this error. If you see it while no npm install is running, the policy is blocking the Claude Code executable itself.

Before v2.1.212, Claude Code used only Windows PowerShell 5.1 to start the service, so any machine where Group Policy blocked PowerShell 5.1 failed with `Couldn't start the session — EUNKNOWN: unknown error, uv_spawn`, even with PowerShell 7 installed.

**What to do:**

* If the message reads `Couldn't start the session`, upgrade to v2.1.212 or later. On earlier versions you can also run `claude daemon run` in a separate terminal first, then start the background session again. That command runs the background service in the terminal's foreground, so the service lasts only as long as that terminal stays open.
* If an npm install was replacing the binary, wait for it to finish, then start the background session again
* If the error appears on v2.1.212 or later while no npm install is running, ask your Windows administrator to allow the Claude Code executable in the restriction policy
* If the background service stops when you close the terminal, Claude Code started it without PowerShell. Install PowerShell 7, or ask your administrator to unblock PowerShell, so the service can outlive the terminal.

### EACCES when starting a background session

Claude Code couldn't run its own binary to start the [background service](https://code.claude.com/docs/en/agent-view#the-supervisor-process) that hosts background sessions. On an npm installation, this usually means `npm install -g @anthropic-ai/claude-code` was replacing the binary at that moment, whether you ran it or the [auto-updater](https://code.claude.com/docs/en/setup#auto-updates) did. The error appears when you open a session from [agent view](https://code.claude.com/docs/en/agent-view):

```text theme={null}
Couldn't start the background service — spawn background service: EACCES: permission denied, posix_spawn '/usr/local/lib/node_modules/@anthropic-ai/claude-code/bin/claude'
```

When you start a session with `/background` or `claude --bg`, the same reason appears inside `Couldn't reach the background service (...)`. During the same reinstall window the error can name another code instead, such as `ENOENT` or `ENOEXEC`, or `EUNKNOWN` or `EPERM` on Windows; an `EUNKNOWN` that persists across retries has a [different cause](#eunknown-when-starting-a-background-session).

On an npm installation, Claude Code waits for the reinstall to finish and retries on its own: up to ten seconds, and up to two minutes while an npm install of Claude Code is visibly still running on the machine, which covers another Claude Code process downloading an update. When the install outlasts that wait, the failure names the update instead of the bare error code:

```text theme={null}
Claude Code is being updated by npm on this machine (still not runnable after 2 min, EACCES) — try again when the update finishes
```

Before v2.1.257, the wait stopped at ten seconds in every case, so this error appeared while another Claude Code process was still downloading an update. Before v2.1.246, Claude Code failed at once, without waiting.

**What to do:**

* Wait a few seconds, then open the session or dispatch again. When the message says Claude Code is being updated, retry after the update finishes.
* If the error persists while no npm install is running, your user can't run the installed binary. Check its permissions and its directory's, or reinstall Claude Code.

### Background service exited before it became reachable

The process Claude Code started as the [background service](https://code.claude.com/docs/en/agent-view#the-supervisor-process) exited before it accepted connections, so Claude Code couldn't open your session. When the service printed an error before exiting, the reason in parentheses gives the exit code or signal and the first line the service printed, which names what stopped it:

```text theme={null}
Couldn't reach the background service (background service exited before it became reachable (exit code N): <the service's first error line>) — run 'claude daemon status'
```

When you open a session from [agent view](https://code.claude.com/docs/en/agent-view), the same reason follows `Couldn't start the background service —`. When the service printed nothing before exiting, the message says `nothing on stderr` instead.

Claude Code reports the failure with the service's error line. Before v2.1.246, the failure surfaced only after a 45-second wait, as `background service did not become reachable within 45s`, without the service's error line.

Two quoted reasons have known causes:

* `Error: claude native binary not installed.`: an npm install was replacing the Claude Code binary at that moment, so the service ran npm's placeholder instead. Retry after the install finishes; if the line persists with no install running, [complete the npm install](https://code.claude.com/docs/en/troubleshoot-install#native-binary-not-found-after-npm-install). Before v2.1.257, a macOS npm self-update produced this failure on every start during the install window.
* `nothing on stderr` with exit code 1, on every start, on Windows: `daemon.lock` names a process that Claude Code can neither signal nor prove is gone, so each new service concludes another one holds the lock and exits. A lock whose writer Claude Code can prove is gone is replaced on its own and doesn't produce this failure. When the failure repeats on every start, delete `~/.claude/daemon.lock`, then open the session or dispatch again. Before v2.1.257, such a lock blocked every start until you deleted the file.

**What to do:**

* If the message quotes a line, fix what it names, then open the session or dispatch again. The next attempt starts the service again
* Run `claude daemon status` to check whether a service is running now

### Working directory no longer exists when starting a background session

You tried to start a [background session](https://code.claude.com/docs/en/agent-view) in a directory that doesn't exist anymore. This happens when you dispatch from agent view or run `/background` after the directory you're working in was deleted or moved. It also happens when you attach to or restart a session whose process has exited and whose directory is gone, because the new process would start in that same directory. Claude Code doesn't start the session, and the message names the missing directory:

```text theme={null}
Couldn't start a background session (working directory no longer exists or is not accessible: /tmp/demo)
```

Before v2.1.257, the session appeared to start and then showed in agent view as a failed row with the same reason.

**What to do:**

* Recreate the directory the message names, or dispatch from a directory that exists, then try again
