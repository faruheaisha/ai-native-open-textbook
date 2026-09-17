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
pageSha256: "76886f4ec53ed45e5f9d64163859ce54d6f998980fcb81fbe58c26f42bf26c96"
contentMode: "local-full"
zh: ""
---

## Tool errors

These errors come from Claude's built-in tools. Claude corrects most tool errors on its own. When one needs a change from you, that error's **What to do** list says what to change.

### Agent would be spawned with zero tools

Every entry in the subagent's [`tools` list](https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields) failed to match a usable tool, so Claude Code refused to launch the subagent: with no tools, it couldn't act. The message groups your entries by what went wrong:

* **Unrecognized**: the entry matches no tool name, usually a typo such as `Grpe` for `Grep`.
* **Not available to subagents**: the entry names a real tool that [subagents can't use](https://code.claude.com/docs/en/sub-agents#available-tools). Background subagents keep a smaller built-in tool set, so an entry that only a foreground subagent can use lands here when the subagent would run in the background, which is the default. If you list `Agent`, the message reports it under the next group instead.
* **Matched no tools in this session**: the entry is valid but no tool in the current session matches it right now, such as `mcp__github__*` with no GitHub MCP server connected, or `Agent` for a subagent at the [depth limit](https://code.claude.com/docs/en/sub-agents#let-subagents-spawn-their-own-subagents).

Omitting the `tools` field never triggers this refusal. If you leave the `tools` list empty, or `disallowedTools` removes every entry in it, Claude Code also skips the refusal and launches the subagent without tools.

Before v2.1.208, the subagent launched with no tools and could return an empty or confusing result.

```text theme={null}
Agent 'code-reviewer' would be spawned with zero tools — refusing. Its tools list resolved to nothing: unrecognized [Grpe]. Fix the agent's tools frontmatter or pass a different subagent_type.
```

**What to do:**

* Correct each entry the error names against the [tools available to subagents](https://code.claude.com/docs/en/sub-agents#available-tools)
* Remove entries for tools the session doesn't have, such as MCP tools from a server that isn't connected
* For a tool that [background subagents drop](https://code.claude.com/docs/en/sub-agents#available-tools), such as `LSP`, remove the entry. To keep the tool, [turn fork mode off](https://code.claude.com/docs/en/sub-agents#turn-fork-mode-on-or-off) and ask Claude to run the subagent in the foreground
* Delete the `tools` field instead of listing tools to give the subagent every [tool available to subagents](https://code.claude.com/docs/en/sub-agents#available-tools)
* For a `tools` list that contains only `Agent`, raise the [depth limit](https://code.claude.com/docs/en/sub-agents#let-subagents-spawn-their-own-subagents) or give the agent at least one other tool: Claude Code withholds `Agent` at that limit, so a list with nothing else in it resolves to no tools

### File is covered by a Read deny rule

The Edit or Write tool was called on a path matched by a [`Read` deny rule](https://code.claude.com/docs/en/permissions#read-and-edit), including creating a new file at that path. Both tools change content Claude has to be able to read back, so Claude Code refuses the call before any file access. NotebookEdit isn't covered by `Read` deny rules. Before v2.1.228, the rule blocked the Edit tool only, and before v2.1.208, only an `Edit` deny rule blocked edits.

```text theme={null}
File is covered by a Read deny rule in your permission settings and cannot be edited.
```

When Claude Code refuses the Write tool, the message ends `and cannot be written` instead.

**What to do:**

* If Claude should be able to change the file, remove or narrow the `Read` deny rule in `/permissions` or in [settings](https://code.claude.com/docs/en/settings-reference#permission-settings)
* If the file must stay untouched, keep the rule and add an `Edit` deny rule for the same path to block the NotebookEdit tool too

<h3 id="subagent-type-is-required">
  subagent\_type is required
</h3>

```text theme={null}
subagent_type is required: the general-purpose agent is not available in this session. Available agents: ...
```

Claude called the [Agent tool](https://code.claude.com/docs/en/tools-reference#agent-tool-behavior) without a `subagent_type`, and this session has no [general-purpose subagent](https://code.claude.com/docs/en/sub-agents#built-in-subagents) to fall back on. That is the case in two setups:

* [`CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS=1`](https://code.claude.com/docs/en/env-vars) is set in non-interactive mode, which removes every built-in subagent
* The session's main-thread agent has a [`tools: Agent(...)` allowlist](https://code.claude.com/docs/en/sub-agents#restrict-which-subagents-can-be-spawned) that leaves out `general-purpose`

**What to do:**

* Usually nothing: the message lists the subagents the session does have, so Claude can retry with one of them
* If Claude keeps failing, add `general-purpose` to the `tools: Agent(...)` allowlist, or unset `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS`

Before v2.1.235, the same call failed with `Agent type 'general-purpose' not found`.

### Memory index is over its read limit

Claude wrote to the [auto memory](https://code.claude.com/docs/en/memory#auto-memory) index `MEMORY.md` and left it over one of its read limits: 200 lines or 25KB. The write succeeded, but only the first 200 lines or 25KB, whichever comes first, load at the start of a session, so everything past the limit is dropped each time the index is read. Before v2.1.210, an over-limit index was silently truncated on the next load with no write-time signal.

```text theme={null}
Error: this write left the memory index at MEMORY.md at 214 lines, over its 200-line read limit. The write succeeded, but everything past the limit is silently dropped each time the index is loaded — entries at the end are already invisible to readers. Rewrite it to under 140 lines now: keep one line per entry, move detail into topic files, and merge or drop stale entries.
```

Only the content that loads counts toward the limits. YAML frontmatter and block-level HTML comments are stripped before the index is loaded, so they're excluded from the measurement. Before v2.1.211, Claude Code measured the raw file, and frontmatter or comments could trigger this error even when the loaded content fit.

Claude Code delivers the error to Claude after the write rather than printing it as a banner in your terminal, so you may notice it only in the transcript.

When Claude's write brings the file near a limit without crossing it, Claude Code returns a milder reminder to compact the index instead of this error.

**What to do:**

* Let Claude rewrite `MEMORY.md`, or ask it to: keep one line per entry, move detail into topic files, and merge or drop stale entries
* To trim the index yourself, see [Audit and edit your memory](https://code.claude.com/docs/en/memory#audit-and-edit-your-memory)

### pkill pattern matches the Claude Code process

A `pkill` command in a Bash tool call used a pattern, typically with `-f`, that matches the Claude Code process itself, so Claude Code refuses the command instead of letting it end the session. Claude Code tests the pattern with `pgrep` before running `pkill` and refuses when its own process ID is in the result. The check runs on Linux only; on macOS, `pkill` runs unmodified. Before v2.1.214, the command ran, and a matching pattern killed the Claude Code session mid-turn.

```text theme={null}
pkill: refusing to run — this pattern matches the Claude CLI process (PID 12345). Narrow the pattern, or target your own children with `pkill -P $$ ...`.
```

The refusal appears in the Bash tool result rather than as a banner in your terminal, and Claude usually adjusts the command on its own.

**What to do:**

* Narrow the pattern so it matches only the intended process, for example the full path of the target binary rather than a short substring
* To stop processes started by the current shell, use `pkill -P $$` with the pattern, which limits the match to the shell's own child processes

<h3 id="failed-to-write-to-a-teammate-inbox">
  Failed to write to a teammate's inbox
</h3>

Claude Code couldn't write a message to a teammate's mailbox file under `~/.claude/teams/\{team-name\}/inboxes/`, so the recipient received nothing. The write fails when Claude Code can't create or update the file, for example because the disk is full, the directory isn't writable, or another agent holds the inbox lock for too long. Before v2.1.224, Claude Code reported the message as sent even when the write failed.

The error appears in the sending agent's tool result rather than as a banner in your terminal, and its text tells Claude to try again:

```text theme={null}
Failed to write to researcher's inbox — nothing was sent. Try again, or message the lead.
```

Structured [agent team](https://code.claude.com/docs/en/agent-teams) protocol messages fail the same way, and the error names the undelivered message: when Claude Code can't write a plan approval, plan rejection, shutdown request, or shutdown rejection, the error reads `Failed to write the <message> to <name>'s inbox — nothing was sent`. The `plan approval` in that list is the lead's decision approving a teammate's plan; the teammate's plan submission is the separate `plan approval request` message. That message and two other protocol messages carry their own message text and consequence:

* `Failed to write the plan approval request to the lead's inbox — plan not submitted; try again`: the teammate's plan never reached the lead, and the teammate stays in plan mode until a resubmission succeeds
* `The permission request could not be delivered to the team lead (mailbox write failed)`: the teammate's permission request never reached the lead, so nobody approved the tool call
* `The confirmation could not be written to team-lead's inbox.`: the shutdown approval itself took effect and the teammate exits; only the confirmation to the lead is missing

When you message a teammate yourself, typing `@name` followed by the message in the lead session, the same failure appears as a notification, `Couldn't write to @name's inbox — message not sent. Try again.`, and Claude Code keeps your text in the prompt box so you can send it again.

**What to do:**

* Ask the sender to resend the message; contention for the inbox lock is transient and clears on retry
* Check free disk space, and check that `~/.claude/teams` and the files under it are writable by your user

### Message too large for cross-session delivery

Claude's [cross-session message](https://code.claude.com/docs/en/cross-session-messaging) to another of your sessions on this machine was too long to send. Claude Code refused it, and the receiving session got nothing. The refusal appears in the sending session's tool result, not as a banner in your terminal. It names both sizes and how to make the message fit:

```text wrap theme={null}
Failed to send to api-worker: Message too large for cross-session delivery: the serialized message is 1,203,844 characters and the limit is 1,048,576. Shorten the message text — put bulk content in a file the recipient can read rather than in the message — or split it into smaller messages.
```

Resending the same text fails the same way.

**What to do:**

* Ask Claude to summarize the message, or to put the bulk content in a file and send the file's path
* Ask Claude to split the content across several shorter messages

Before v2.1.235, Claude Code reported an oversized message as sent. The receiving session dropped it unread.

### Too many messages to this session just now

Claude sent a rapid burst of [cross-session messages](https://code.claude.com/docs/en/cross-session-messaging) to one of your sessions on this machine, and the burst reached what that session's inbox accepts. Claude Code refused the next send, and the receiving session got nothing from it. The refusal appears in the sending session's tool result, not as a banner in your terminal:

```text wrap theme={null}
Failed to send to api-worker: Too many messages to this session just now: 30 were sent recently and more would be dropped by its rate limit, so this one was not sent. Batch what remains into one message, or wait a little before sending more.
```

**What to do:**

* Usually nothing: Claude batches the remaining content into one message, or waits before sending more
* If you prompted the burst yourself, ask Claude to combine what's left into a single message

Before v2.1.236, Claude Code reported these sends as sent. The receiving session dropped them unread.

### Refusing to send a cross-session message

Before Claude Code writes a [cross-session message](https://code.claude.com/docs/en/cross-session-messaging) to another of your sessions on this machine, it checks that the target session's inbox socket is the endpoint the message was addressed to. When a check fails, Claude Code refuses the send in the sending session, and the target session receives nothing. For a message Claude sends, the refusal appears in the sending session's tool result:

```text theme={null}
Failed to send to api-worker: Refusing to send: reply target is a symlink
```

The text after `Refusing to send:` names the check that failed:

* `reply target is a symlink`: a symbolic link sits at the target session's socket path. Claude Code doesn't deliver through it, because a link there could redirect the message to an endpoint the target session didn't create.
* `cannot vet reply target`: Claude Code couldn't inspect the target path at all, for example because reading it failed with a permission error.
* `connected endpoint is not the expected process`: the process holding the socket isn't the session the message was addressed to, so the address is stale or another process replaced the socket.
* `connected endpoint identity could not be read`: Claude Code connected but couldn't read which process holds the other end, so it couldn't confirm the target. This can be transient.
* `connected endpoint is not owned by this user`: the process holding the socket runs as a different user account, so it isn't one of your sessions.
* `connected endpoint owner could not be read`: Claude Code connected but couldn't read which user account owns the other end, so it couldn't confirm the endpoint is yours.
* `connected endpoint is a different process with the expected pid`: the process id matches the one the message was addressed to, but Claude Code couldn't confirm it's the same process. Usually that session exited and the operating system reused its process id, so the address is stale.

**What to do:**

* Usually nothing: the checks keep a message from reaching an endpoint other than the session it was addressed to, and nothing was sent
* Ask Claude to list your sessions again and resend; a refusal caused by a stale address clears once Claude sends to the current one
* If `reply target is a symlink` repeats for one session, check what created a link at that session's socket path, shown in its `/status` under `Peer address`
* For `connected endpoint identity could not be read`, resend; the condition can be transient
* If `connected endpoint is not owned by this user` appears on a shared machine, the session at that address runs under another user's account, so Claude can't message it from yours

Before v2.1.248, Claude Code didn't check the endpoint's owning user or process start time, so the refusals that name those checks don't appear on earlier versions.

<h3 id="refusing-after-a-symlink-changed">
  Refusing to read, write, or search a path
</h3>

Claude Code checks a file path's [permission rules](https://code.claude.com/docs/en/permissions#read-and-edit), then confirms that resolution again when the tool opens the file or starts the search. When it can't confirm that the path still leads to the location the check approved, Claude Code refuses the operation instead of following it. The refusal appears in the tool result:

```text theme={null}
Refusing to read /path/to/file: its symlink resolution changed after permission was checked. If a link in the working directory is being rewritten concurrently, stop that and retry.
```

The text after the path names the reason:

* `its symlink resolution changed after permission was checked`: a symlink along the path, or at a Grep or Glob search root, was replaced between the permission check and the operation
* `its parent-directory symlink resolution changed after permission was checked`: a directory the write path passes through no longer resolves to the approved location
* `it is a symbolic link. Write to the link's target path instead`: a symbolic link sits at the approved write location itself
* `a path one of its Read deny rules is written through changed while the search was being prepared. Retry.`: a `Read` deny rule for the search names a path that passes through a symlink, and that link changed while Claude Code was preparing the search
* `it could not be opened (EACCES) — it is unreadable, or is being replaced concurrently.`: the search root exists but couldn't be opened; the parenthesized code is the operating system error
* `its permission check expired before it ran (too many concurrent file operations). Retry.`: Claude Code evicted the approval record under many simultaneous file operations before the tool used it; retrying runs a fresh permission check
* `ripgrep was found only by name on PATH, and a search outside the working directory cannot apply your Read deny rules in that configuration`: Claude Code couldn't resolve the `rg` binary to an absolute path, so it refuses searches outside the working directory rather than run one your deny rules don't cover

**What to do:**

* Usually nothing: the refusal reaches Claude as the tool result, and the refused operation doesn't run
* If a symlink refusal repeats on one path, find what keeps rewriting a link there, such as a build tool or file watcher, or ask Claude to use the file's resolved path instead of the linked one
* If this refusal appears for every file while Claude Code runs on Windows inside an AppContainer or restricted-token sandbox, upgrade to v2.1.265 or later
* For the ripgrep refusal, install ripgrep with your package manager so `rg` resolves to an absolute path on `PATH`, or keep searches under the working directory

Before v2.1.251, Claude Code re-checked a path's resolution only for file writes, so a link replaced after the permission check could redirect a read or search to a different location without a message. Of these refusals, only the parent-directory write refusal appears on earlier versions.

<h3 id="task-output-swap-refused">
  Task output swap refused
</h3>

Claude Code saves each Bash command's output to a file under its temp directory. Every time it opens one of these files, it checks that the path still leads to the file it created, with no symbolic link, extra hard link, or moved directory redirecting it. This message means that check failed, so Claude Code refused the operation rather than write or read output through that path. The message appears in the Bash tool result:

```text wrap theme={null}
task output swap refused (tasks dir moved or linked): /private/tmp/claude-501/-Users-you-my-project/1f0e62dc-4b0a-4f5e-9c2d-8a7b6c5d4e3f/tasks/b7k2f9m3q.output. To recover: restart Claude Code with CLAUDE_CODE_TMPDIR set to a fresh directory; or, if /private/tmp/claude-501/-Users-you-my-project is a stray directory or a symbolic link that should not be there, remove that entry itself (not what it points to) and restart.
```

The parenthesized text names the check that failed. Reasons such as `output symlink was re-pointed`, `output file identity changed`, and `not a regular file` all report the same condition: something at or along the output path is no longer the file Claude Code created. Only some reasons carry a `To recover:` sentence.

If the check fails while a command is still running, Claude Code stops the command, and its result reports:

```text theme={null}
Command killed: its output file was replaced or could no longer be verified
```

**What to do:**

* Upgrade to v2.1.260 or later. Earlier versions sometimes showed this message when no link or moved directory was present
* Restart Claude Code with [`CLAUDE_CODE_TMPDIR`](https://code.claude.com/docs/en/env-vars) set to a fresh directory
* Or check your project's directory under the Claude Code temp directory, `/private/tmp/claude-501/-Users-you-my-project` in the example message. If that path is a symbolic link, or a directory that shouldn't be there, remove the link or directory itself rather than the link's target, and restart Claude Code
* If the refusal repeats, a process is replacing, linking, or removing entries under Claude Code's temp directory while the session runs. Set [`CLAUDE_CODE_TMPDIR`](https://code.claude.com/docs/en/env-vars) to a directory nothing else manages and restart

<h3 id="the-source-file-is-not-valid-utf-8-text">
  The source file is not valid UTF-8 text
</h3>

Claude tried to publish an [artifact](https://code.claude.com/docs/en/artifacts) from a file whose bytes don't decode as text, or whose text already contains the replacement character `U+FFFD`, so Claude Code refused the publish before uploading anything. The message appears in the Artifact tool result and names the first position to fix:

```text wrap theme={null}
file_path: the source file is not valid UTF-8 text (first invalid byte at line 12, column 40). It may be saved in another encoding or contain binary data. Rewrite it as UTF-8, then publish again. Nothing was published.

file_path: the source file has the replacement character U+FFFD at line 12, column 40, usually left where an earlier edit or paste lost a character. Replace it with the intended text (in HTML, write an intended U+FFFD as &#xFFFD;), then publish again. Nothing was published.
```

Claude Code decodes the file as UTF-8, or as UTF-16 when it starts with a little-endian UTF-16 byte-order mark. When such a UTF-16 file doesn't decode, the first message names `UTF-16` and still tells you to rewrite the file as UTF-8. When more positions follow the named one, the message adds a count such as `(+2 more)` after the position.

**What to do:**

* Usually nothing: Claude rewrites the file and publishes again
* If the file is one you wrote or exported, save it again as UTF-8, and replace each `U+FFFD` with the character an earlier edit, paste, or conversion lost
* To show an intentional `U+FFFD` on the page, write it as `&#xFFFD;` in the HTML instead of the literal character

Before v2.1.267, Claude Code uploaded such a file without checking it, and the server refused the publish instead.
