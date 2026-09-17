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
pageSha256: "3043723068ce0662717abc0e616a64644f42ffa6e9885484aca4a36802c4151e"
contentMode: "local-full"
zh: ""
---

## Monitor sessions with agent view

Run `claude agents` to open agent view. It takes over the full terminal and lists every session grouped by state, with pinned sessions and the ones that need you at the top. Each row shows the session's name, current activity, and its age, counted from when the session was created; a finished session's age freezes at how long the run took.

The name is tinted with the color set by [`/color`](https://code.claude.com/docs/en/commands) in that session, including when you [background a session](#from-inside-a-session) with `←` or `/background`.

By default the list shows every background session you've started, across all your projects. A session working in one repository and another in a different worktree both appear here, regardless of which directory you opened agent view from. To narrow the list to one project, pass `--cwd`:

```bash theme={null}
claude agents --cwd ~/projects/my-app
```

This shows only sessions started under that directory. It still lists a session that has [moved into a worktree](#how-file-edits-are-isolated) under `~/projects/my-app/.claude/worktrees/`.

Interactive sessions you have open in other terminals don't appear until you [background them](#from-inside-a-session). [Subagents](https://code.claude.com/docs/en/sub-agents) and [teammates](https://code.claude.com/docs/en/agent-teams) a session spawns aren't listed as separate rows.

```text theme={null}
Pinned
  ✽ clawd walk cycle          Drawing the walk-cycle sprite frames          3m

Ready for review
  ∙ jump physics              Opened PR with collision fix                 #2048  2h

Needs input
  ✻ power-up design           double jump or wall climb?                    1m

Working
  ✽ collision detection       Adding swept-AABB checks to CollisionSystem   2m
  ✢ playtest level 3          run 12 · all checkpoints cleared           in 4m

Completed
  ✻ title screen              result: menu, options, and credits done       9m
  ∙ sound effects             result: 14 SFX exported to assets/audio       4h
  … 6 more
```

### Read session state

Each row starts with an icon whose color and animation show the session's state:

| State       | Icon shows as | What it means                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Working     | Animated      | Claude is actively running tools or generating a response                                                                                                                                                                                                                                                                                                                                                                                                              |
| Needs input | Yellow        | Claude is waiting on something only you can provide: an answer to a question, a permission decision, or another prompt only you can answer, such as a [sandbox](https://code.claude.com/docs/en/sandboxing) prompt to allow a network host or an MCP server's [request for input](https://code.claude.com/docs/en/mcp#respond-to-mcp-elicitation-requests). A command that needs an attached terminal, such as `/install-github-app` or the `/mcp` settings list, [holds an unattended session here too](#attach-to-a-session) |
| Idle        | Dimmed        | The session has nothing to do and is ready for your next prompt                                                                                                                                                                                                                                                                                                                                                                                                        |
| Completed   | Green         | The task finished successfully                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Failed      | Red           | The task ended with an error                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Stopped     | Grey          | You stopped the session with `Ctrl+X` or `claude stop`, [its process was ended from outside Claude Code](#the-supervisor-process), or [it ended while the background service was off](#sessions-show-as-failed-after-shutdown)                                                                                                                                                                                                                                         |

Separately, the icon's shape shows whether the underlying process is running:

| Shape               | What it means                                                                                                               |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `✻` or animated `✽` | The session process is alive and replies immediately                                                                        |
| `∙`                 | The process has exited. You can still peek at the row, and when you reply or attach, Claude restarts from where it left off |
| `✢`                 | A [`/loop`](https://code.claude.com/docs/en/scheduled-tasks) session sleeping between iterations. The row shows its run count and a countdown           |

The `#N` or `!N` label that can appear at the right edge of a row is a link to the session's [pull request or merge request](#pull-request-status), not part of the state icon.

The terminal tab title shows the awaiting-input count while agent view is open: `2 awaiting input · claude agents` when sessions need input, or `claude agents` when none do.

To read session state from a script or another program, use [`claude agents --json`](#read-session-state-from-a-script) rather than the files under `~/.claude/jobs/`.

While agent view is open, Claude Code also sends a notification through your configured [terminal notification channel](https://code.claude.com/docs/en/terminal-config#get-a-terminal-bell-or-notification) when a local background session starts needing your input, finishes, or fails. Sessions that run on a schedule, such as [`/loop`](https://code.claude.com/docs/en/scheduled-tasks) sessions, notify only when they need your input. Notifications use the same [`preferredNotifChannel` setting](https://code.claude.com/docs/en/settings-reference#preferrednotifchannel) as the rest of Claude Code and fire the [`Notification` hook](https://code.claude.com/docs/en/hooks#notification) with the `agent_needs_input` or `agent_completed` type.

Background sessions don't need any terminal open to keep working. A separate [supervisor process](#the-supervisor-process) runs them, so you can close agent view, close your shell, or start a new interactive session and your dispatched work keeps going.

Session state persists on disk through auto-updates and supervisor restarts. Sessions are also preserved when your machine sleeps. Their processes resume on wake and the supervisor reconnects to them instead of treating the time gap as idle. Shutting down still stops running sessions; see [Sessions show as failed or stopped after shutdown](#sessions-show-as-failed-after-shutdown) for how to recover them.

A session that was mid-response when the machine slept can come back unresponsive. When you open a session that has stopped responding, the supervisor restarts its process and the session continues the interrupted response from where it left off.

### Row summaries

The one-line summary in each row is generated by a [Haiku-class model](https://code.claude.com/docs/en/model-config) so the row can tell you what the session is doing, what it needs, or what it produced without opening the transcript. While a session is actively working, the row text updates at most once every 15 seconds from the session's own recent output without sending a model request, and the model writes a fresh summary when each turn ends.

A working row shows what the session says it's doing, and a blocked row shows the question it's asking. During a long turn, the model also rewrites the summary every few minutes so a busy row doesn't keep showing an outdated one. The summary text fills the row's remaining width; open the [peek panel](#peek-and-reply) to read a sentence the terminal edge clips.

When the list is [grouped by directory](#organize-the-list), the summary opens with the session's state as a colored word, such as `Needs input · double jump or wall climb?`. In the default state grouping, the group header already names the state, so the row shows only the summary.

The end-of-turn summary and each mid-turn rewrite are one short Haiku-class request through your normal provider, billed and handled under the same [data usage terms](https://code.claude.com/docs/en/data-usage) as the session itself. The 15-second updates between model rewrites reuse the session's own output and don't send a request. On a third-party provider or gateway with no Haiku-class model configured, the request uses the session's main model instead; set [`ANTHROPIC_DEFAULT_HAIKU_MODEL`](https://code.claude.com/docs/en/model-config#environment-variables) to choose one.

### Pull request status

When a session [opens a pull request](#how-file-edits-are-isolated), Claude Code adds a label at the right edge of the row, linked to the pull request:

* Claude Code writes the label as `#1234` for a pull request and as `!1234` for a GitLab merge request.
* Claude Code emits the link even when it can't detect hyperlink support, for example over SSH or tmux. Set [`FORCE_HYPERLINK=0`](https://code.claude.com/docs/en/env-vars) to render the label as plain text.
* After you send a follow-up to the session, Claude Code keeps the label while the row returns to live progress.

A session that works on an existing pull request is linked to it the same way. Claude Code finds the pull request differently depending on the command Claude runs:

* When Claude edits, comments on, closes, or marks a pull request ready with `gh`, Claude Code links the pull request that the command's own output names. A `gh` command whose captured output names no pull request doesn't create a link; `gh pr merge` is the common case, because it prints its result only to an interactive terminal.
* When Claude checks a pull request out with `gh pr checkout` or pushes to a branch, Claude Code looks the branch up with `gh pr view` and links its open pull request.
* The pull request doesn't need to exist yet when Claude pushes: Claude Code retries the branch lookup after up to five later `git`, `gh`, `glab`, or `curl` commands run in the same directory, so a pull request created after the push, including one Claude creates through the GitHub REST API, links when a retry finds it.

When a session is linked to more than one pull request, the label shows a count instead, such as `3 PRs`, colored by the open pull request that most needs attention. Open the [peek panel](#peek-and-reply) to see them all.

The pull request number is colored by its status:

| Color  | Pull request status                           |
| :----- | :-------------------------------------------- |
| Yellow | Waiting on checks or review, or checks failed |
| Green  | Checks passed and no review is blocking       |
| Purple | Merged                                        |
| Grey   | Draft or closed                               |

For a task that ends in a pull request, check this label for the result: review and merge the pull request when its number turns green.

### Peek and reply

Press `Space` on a selected row to open the peek panel. It opens with the sentence the row truncates at the terminal edge, and which sentence that is depends on the session's state:

* A session that's waiting on you: the exact question it's asking, above the reply input
* A finished session: its result
* A working session: its full status sentence

Any pull requests linked to the session are listed next. For a session that's waiting on you, a line such as `waiting 3m` below them shows how long it has been waiting, and it's the only time shown in the panel. The age at the right edge of the row is a different number: it counts from when the session started.

Most of the time the peek panel is enough and you don't need to open the full transcript.

Type a reply in the peek panel and press `Enter` to send it to that session. When the session asks a question with predefined choices, the peek panel shows them as a numbered list and you can press a number key to pick one. A permission prompt shows as text describing what the session wants to run, without numbered options. Type a reply to answer it, or attach to answer with the standard prompt. For other blocked sessions, press `Tab` to fill the input with a suggested reply you can edit before sending. Prefix a reply with `!` to send a Bash command instead.

When a [`PermissionRequest`](https://code.claude.com/docs/en/hooks#permissionrequest) or [`PreToolUse`](https://code.claude.com/docs/en/hooks#pretooluse) hook returns output Claude Code can't validate for the call the session is asking about, the row shows the hook event and `hook output invalid:` with the validation error before the pending request's text. For a hook that fails another way, the row says the hook failed. The session still waits on the same request.

A reply that can't be delivered, because the background service is unreachable or the send fails, is saved and sent to the session as its next prompt when its process starts again, and the error message says the reply was saved. A reply prefixed with `!` isn't saved, because the saved text would reach the session as a plain prompt rather than run as a Bash command.

With [voice dictation](https://code.claude.com/docs/en/voice-dictation) enabled, hold or tap your push-to-talk key while the reply input is focused to dictate a reply instead of typing it. The same works in the dispatch input at the bottom of agent view.

Use `↑` and `↓` to peek at adjacent sessions without closing the panel, or `→` to attach.

### Attach to a session

Press `Enter` or `→` on a selected row to attach. Agent view is replaced by the full interactive session. When you attach, Claude posts a short recap of what happened while you were away.

While attached, the session behaves like any other Claude Code session: [commands](https://code.claude.com/docs/en/commands), keyboard shortcuts, and features all work, with the exceptions below.

While you're attached, `/install-github-app` and the [`/mcp`](https://code.claude.com/docs/en/mcp) settings list work normally, since a human at the terminal can complete their dialogs. When nobody is attached, these commands can't open their dialogs, so the session appears under `Needs input` in agent view with a row such as `open this session to manage MCP servers`, and the transcript reply says the same. Attach and run the command again to continue; the needs-input row clears when you attach. `/mcp reconnect <server>`, `/mcp enable`, and `/mcp disable` work without attaching either way.

Attached sessions always render in [fullscreen mode](https://code.claude.com/docs/en/fullscreen), regardless of your `tui` setting, because a background session has no terminal scrollback to append to. Scroll with `PgUp`, `PgDn`, or the mouse wheel, and press `Ctrl+O` for transcript mode. Your terminal's native scroll and tmux copy mode show only the current viewport, the same as when you run any fullscreen application.

Press `←` on an empty prompt, or run `/exit`, to detach and return to agent view, whether you opened the session from agent view or with `claude attach <id>` from your shell.

`←` also detaches while the [`/btw` overlay](https://code.claude.com/docs/en/interactive-mode#side-questions-with-/btw) is open. Requires Claude Code v2.1.257 or later. A side question that's still answering keeps running while you're away. The next time you attach, the overlay reopens with it, or with its answer.

On Windows, if you press `←` within about half a second of attaching, Claude Code shows `Ambiguous ←, press again to detach`, because in that window the terminal can redeliver a press from before you attached. Press `←` again to detach.

`Ctrl+Z` also detaches but goes back to where you started instead: agent view if you attached from there, or your shell if you ran `claude attach`. Use `Ctrl+Z` when a dialog has focus and isn't responding to `←`.

`Ctrl+C` keeps its standard interrupt behavior while attached: it cancels a running response or `!` shell command rather than detaching. Pressing `Ctrl+C` twice on an empty prompt detaches, the same as in any session.

Detaching never stops a background session: `←`, `Ctrl+Z`, `/exit`, and double `Ctrl+C` or double `Ctrl+D` all leave it running. To end a session from inside it, run `/stop`.

#### Switch sessions without leaving the terminal

In a session running in the foreground, one you started in the terminal rather than attached to from agent view, pressing `←` on an empty prompt backgrounds it and opens agent view with that row selected, so you can switch sessions without leaving the terminal. The same single press detaches an attached session.

If you press `←` right after you delete the last of the prompt's text or move through prompt history, Claude Code asks you to confirm: the first press shows `Press ← again to open agents`, or `Press ← again to go back to agents` in an attached session, and the second press switches.

When `←` backgrounds a foreground session, agent view shows `Your conversation moved to the background` above the list, with that session's row already selected. From there:

* Press `Enter` to reopen the conversation.
* Press `Esc` to undo the switch and return to the conversation. If `Esc` shows `Still starting — try again in a moment`, the background session isn't ready yet, so press `Esc` again in a moment.
* Press `Ctrl+C` twice to exit to your shell.

When Claude Code can't reopen the conversation, it exits and prints a `claude --resume` command that resumes it.

[Claude's task list](https://code.claude.com/docs/en/interactive-mode#task-list) moves to the background session with the conversation, so the checklist is intact when you return to that row.

The row you pressed `←` from also keeps a bold, undimmed name after you move the selection with the arrow keys or the mouse, so you can tell which session you came from.

If a tool is running when you press `←`, Claude Code waits up to about ten seconds for it to finish before backgrounding, and Claude continues the response in the background session. Press `←` again to background immediately instead of waiting. When in-flight work can't carry over to the background session, Claude Code shows the `Background this session?` dialog first, the same as with [`/background`](#from-inside-a-session).

The ten-second limit doesn't apply while the [foreground subagents](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background) Claude started in the conversation are still running. Claude Code keeps waiting so their work carries over, and shows a `Still backgrounding after the current tool` notice while it waits. Press `←` again to background without waiting, which restarts those subagents from the beginning. Claude Code doesn't wait for the subagents a [dynamic workflow](https://code.claude.com/docs/en/workflows) is running. When a workflow has subagents running, Claude Code shows the `Background this session?` dialog instead.

Claude Code doesn't background the session while you have unsent text in the prompt input, because the text stays in your terminal's input box and wouldn't move to the background session. If you type into the input while Claude Code waits to background the session, it cancels the switch with `Backgrounding cancelled — you have unsent text in the input. Send it or clear it, then press ← again.`

Pressing `←` creates the session's row even when the conversation has no messages yet, so `→` still returns to it.

You can turn this shortcut off with the `leftArrowOpensAgents` setting in `/config`.

### Organize the list

Agent view groups sessions so the ones that need input are at the top, with `Ready for review` and `Needs input` above `Working` and `Completed`. These group names don't map one-to-one to the [states](#read-session-state) above: a session moves to `Ready for review` when it has an open pull request, and `Completed` collects finished, failed, and stopped sessions together.

Press `Ctrl+S` to group by directory instead. Your choice persists across runs.

Within a group:

* Press `Ctrl+T` to pin a session to the top and [keep its process running](#the-supervisor-process) while idle
* Press `Shift+↑` or `Shift+↓` to reorder sessions
* Press `Ctrl+R` to rename a session
* Press `Enter` on a group header to collapse it

To remove a session from the list, press `Ctrl+X` to stop it and `Ctrl+X` again within two seconds to delete it. Pressing `Ctrl+X` on a group header deletes every session in that group after confirmation.

The second press deletes the session even when the stop attempt fails, for example because the [background service isn't responding](#agent-view-says-the-background-service-did-not-respond): the confirmation stays active for another two seconds, and the delete ends the session's process itself. Press `Esc` to dismiss the confirmation without deleting.

Except in the kept cases covered in [What deleting a session removes](#what-deleting-a-session-removes), deleting removes the session from the list, and a worktree Claude created for it is removed, kept, or left in place depending on how you delete and what the worktree holds. The conversation transcript always stays on your local machine, available through `claude --resume`.

To bring a session back on Claude Code v2.1.212 or later, type `/resume` in the dispatch input. A picker opens with past sessions of the repository you opened agent view from, newest first, including sessions you deleted from the list; sessions that already have a row aren't listed. `↑`/`↓` move the selection, `Enter` resumes the selected session as a background session so it rejoins the list as a row, and `Esc` closes the picker.

The picker opens only for a bare `/resume`. A targeted, scoped, or restricted resume can't be served by the picker, so agent view shows the `attach to a session to run it` hint instead when:

* `/resume` names an id or a search term
* the view is scoped with `--cwd`
* the view was started with [`--safe-mode`](https://code.claude.com/docs/en/cli-reference#cli-flags)
* the view was opened with a flag such as `--permission-mode` or `--settings`

Completed sessions that don't fit on screen fold into a `… N more` row. Failures and sessions with an open pull request always stay visible. The `Completed` group fills the vertical space left after the live groups, and on a short terminal the header compacts to a single summary line so sessions that are working or need input stay visible.

### Filter sessions

Type in the dispatch input to filter instead of dispatching:

| Filter                                     | Shows                                                                                                    |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `a:<name>`                                 | Sessions running the named agent                                                                         |
| `s:<state>`                                | Sessions in the given state, such as `s:working`. Also accepts `s:blocked` for everything waiting on you |
| `#<number>` or a pull or merge request URL | The session working on that pull request or merge request                                                |
| Any other URL                              | The session whose first prompt contained that URL                                                        |

### Keyboard shortcuts

Press `?` in agent view to see every shortcut in context. The table below summarizes them.

| Shortcut              | Action                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `↑` / `↓`             | Move between rows                                                                                                                                                                                                                                                                                                                                               |
| `Enter`               | Attach to the selected session, or dispatch if there's text in the input                                                                                                                                                                                                                                                                                        |
| `Space`               | Open or close the peek panel for the selected session                                                                                                                                                                                                                                                                                                           |
| `Shift+Enter`         | Insert a newline in the dispatch input, [as in the main prompt](https://code.claude.com/docs/en/terminal-config#enter-multiline-prompts)                                                                                                                                                                                                                                                    |
| `Ctrl+Enter`          | Dispatch and attach immediately, in terminals where the `?` overlay lists `ctrl+enter to start and open`                                                                                                                                                                                                                                                        |
| `→`                   | Attach to the selected session                                                                                                                                                                                                                                                                                                                                  |
| `Alt+1`..`Alt+9`      | Attach to session 1–9 in the focused session's directory                                                                                                                                                                                                                                                                                                        |
| `Tab`                 | On an empty input, browse all subagents. Otherwise apply the highlighted suggestion                                                                                                                                                                                                                                                                             |
| `Ctrl+S`              | Switch grouping between state and directory                                                                                                                                                                                                                                                                                                                     |
| `Ctrl+T`              | Pin or unpin the selected session                                                                                                                                                                                                                                                                                                                               |
| `Ctrl+R`              | Rename the selected session                                                                                                                                                                                                                                                                                                                                     |
| `Ctrl+G`              | Open the dispatch prompt in your `$VISUAL` or `$EDITOR`                                                                                                                                                                                                                                                                                                         |
| `Ctrl+J`              | Insert a newline in the dispatch input                                                                                                                                                                                                                                                                                                                          |
| `Ctrl+X`              | Stop the session; press again within two seconds to delete it                                                                                                                                                                                                                                                                                                   |
| `Shift+↑` / `Shift+↓` | Reorder the selected session                                                                                                                                                                                                                                                                                                                                    |
| `Esc`                 | Close the peek panel, clear the input, or exit. When you opened agent view by backgrounding your session with `←`, the final `Esc` returns to that conversation instead of exiting. With [vim editor mode](https://code.claude.com/docs/en/interactive-mode#vim-editor-mode) on, pressing `Esc` in the input switches from INSERT to NORMAL mode and keeps your text, as in the main prompt |
| `Ctrl+C`              | Clear the input; press twice to exit                                                                                                                                                                                                                                                                                                                            |
| `?`                   | Show all shortcuts                                                                                                                                                                                                                                                                                                                                              |

`Ctrl+S`, `Ctrl+T`, and `Ctrl+G` follow your [`keybindings.json`](https://code.claude.com/docs/en/keybindings). Rebind or unbind `Ctrl+S` and `Ctrl+T` with the `agents:switchView` and `agents:togglePin` actions in the [`Agents` context](https://code.claude.com/docs/en/keybindings#agents-actions), and `Ctrl+G` through the `Chat` context's `chat:externalEditor` binding. The other shortcuts in the table can't be rebound.
