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
pageSha256: "1d147d11ac38790b1d403c9b49b8ba6680857e1550a13e5c2b8123af715df709"
contentMode: "local-full"
zh: ""
---

## Session saving warnings

Claude Code shows these warnings on a persistent line below the input box when it isn't saving your session transcript. The session keeps working either way; the warnings tell you the session may be missing from [`--resume`](https://code.claude.com/docs/en/sessions) later.

### Transcript writes are failing

Claude Code saves the transcript to disk as you work, and its writes to [the transcript file](https://code.claude.com/docs/en/sessions#where-transcripts-are-stored) are failing. The message names the cause with the underlying error code, for example a full disk:

```text theme={null}
Transcript writes are failing (disk full — ENOSPC) · recent messages may not be saved for resume
```

The warning appears at different points depending on the error:

* On the first failure for conditions that don't clear on their own: a full disk, an exceeded disk quota, a read-only filesystem, a path over the filesystem's length limit, or, on macOS and Linux, a permission error
* After repeated failures spanning at least a minute for everything else, including permission errors on Windows, where an antivirus scan can fail a single write that then succeeds on retry

Before v2.1.217, Claude Code dropped the failing writes without a warning, and a later `--resume` missing recent messages was the first sign.

**What to do:**

* Fix the condition the error code names: free disk space for `ENOSPC`; raise or clear the quota for `EDQUOT`; restore write access to the transcript location for `EACCES`, `EPERM`, or `EROFS`
* The warning clears on its own at the next successful write; no restart is needed
* Messages sent while the warning was showing may still be missing when you resume the session later

<h3 id="transcript-saving-is-off-skip-prompt-history">
  Transcript saving is off because CLAUDE\_CODE\_SKIP\_PROMPT\_HISTORY is set
</h3>

This session started with [`CLAUDE_CODE_SKIP_PROMPT_HISTORY`](https://code.claude.com/docs/en/env-vars) set, so Claude Code writes no transcript or prompt history for it:

```text theme={null}
Transcript saving is off — CLAUDE_CODE_SKIP_PROMPT_HISTORY is set · --resume will not find this session; if unintended, unset it and restart
```

The variable is an intentional opt-out for ephemeral scripted sessions, but it can also reach a session through a shell profile, a wrapper script, or a parent process that exported it.

**What to do:**

* If you set the variable on purpose, no action is needed; the notice confirms the session won't appear in `--resume`, `--continue`, or up-arrow history
* If you didn't, remove the variable from the shell or script that launches `claude`, then start a new session. Messages from the current session aren't saved retroactively.

<h3 id="transcript-saving-is-off-child-session-marker">
  Transcript saving is off because of an inherited CLAUDE\_CODE\_CHILD\_SESSION marker
</h3>

Claude Code sets [`CLAUDE_CODE_CHILD_SESSION`](https://code.claude.com/docs/en/env-vars) in the subprocesses it spawns, and treats an interactive session that inherits it as nested: Claude Code saves no transcript for it, so sessions that Claude itself starts don't fill your `--resume` list. This notice means your current session inherited the marker:

```text theme={null}
Transcript saving is off — inherited CLAUDE_CODE_CHILD_SESSION marker · restart with CLAUDE_CODE_FORCE_SESSION_PERSISTENCE=1 to keep future transcripts
```

The notice is expected when you ran `claude` from inside another Claude Code session; it signals a misclassification when the marker leaked through a long-lived intermediary, for example a terminal, `screen` session, or launcher that a Claude Code session originally started.

Inside tmux, Claude Code detects a marker that arrived through the tmux server's global environment and keeps saving, so this notice doesn't appear for that case.

**What to do:**

* If you started this session from inside another Claude Code session on purpose, no action is needed
* If this is a top-level session, exit and restart with [`CLAUDE_CODE_FORCE_SESSION_PERSISTENCE=1`](https://code.claude.com/docs/en/env-vars) set. Saving applies from the restart, so messages sent before it aren't saved.
* To fix future launches from the same terminal or launcher, remove `CLAUDE_CODE_CHILD_SESSION` from its environment
