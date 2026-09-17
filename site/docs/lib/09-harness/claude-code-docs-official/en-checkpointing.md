---
title: "Checkpointing"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/checkpointing.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/checkpointing.md"
sourceSha256: "800b186125a039986b885b8d3bdde95a0185a6eb1451723fcc2ff8657c463ef6"
pageSha256: "800b186125a039986b885b8d3bdde95a0185a6eb1451723fcc2ff8657c463ef6"
contentMode: "local-full"
zh: ""
---

# Checkpointing

> Track, rewind, and summarize Claude's edits and conversation to manage session state.

Claude Code automatically tracks Claude's file edits as you work, allowing you to quickly undo changes and rewind to previous states if anything gets off track.

## How checkpoints work

As you work with Claude, checkpointing automatically captures the state of your code before each user prompt.

### Automatic tracking

Claude Code tracks all changes made by its file editing tools:

* Every user prompt creates a new checkpoint
* Claude Code keeps file snapshots for the 100 most recent checkpoints in a session. Discarding an older checkpoint deletes the snapshot files that no remaining checkpoint references, except each file's first snapshot, which the VS Code extension uses as the baseline for its session diffs.
* Claude Code saves checkpoints with the conversation, so you can still run `/rewind` after you resume a session
* Claude Code deletes a session's file snapshots in the [retention sweep](https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically), by default about 30 days after the session last saved one. Rewinding to a checkpoint whose snapshots are gone can fail with [`No files were restored`](https://code.claude.com/docs/en/errors#no-files-were-restored). To keep snapshots longer, set [`cleanupPeriodDays`](https://code.claude.com/docs/en/settings-reference#cleanupperioddays).

### Rewind and summarize

Run `/rewind`, or press `Esc` twice when the prompt input is empty, to open the rewind menu.

  If the prompt input contains text, double `Esc` clears it instead of opening the menu. The cleared text is saved to your input history, so press `Up` to recall it after you finish in the rewind menu.

The rewind menu lists each prompt you sent during the session. Select the point you want to act on, then choose an action:

* **Restore code and conversation**: revert both code and conversation to that point
* **Restore conversation**: rewind to that message while keeping current code
* **Restore code**: revert file changes while keeping the conversation
* **Summarize from here**: compress the conversation from this point forward into a summary, freeing context window space
* **Summarize up to here**: compress the conversation before this point into a summary, keeping later messages intact
* **Never mind**: return to the message list without making changes

The two code restore options appear only when the selected checkpoint has tracked file changes to revert. If no file edits were captured after that point, the menu offers only **Restore conversation**, the summarize options, and **Never mind**.

After restoring the conversation or choosing Summarize from here, the original prompt from the selected message is restored into the input field so you can re-send or edit it.

Choosing Summarize up to here leaves you at the end of the conversation with the input empty. With either summarize option, a **Summarized conversation** marker appears in the conversation where the compressed messages were.

#### Rewind past a cleared conversation
