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
sourceRel: "en/interactive-mode.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/interactive-mode.md"
sourceSha256: "a43f4a145320ecff8da141c321f3220246884acb226285095ad0ff123ceb2b60"
pageSha256: "4d6048fd3a9a39dc5805f2d0d2be2a37f8e7ddb4470a2b005ae79b1d510629ce"
contentMode: "local-full"
zh: ""
---

## Review changes with /diff

Run `/diff` to look over the changes in your working tree without leaving Claude Code. You see the edits Claude has made so far alongside anything else you haven't committed.

In the changes `/diff` reads from git, a submodule appears as a single entry, and only when the commit it points to changes; edits to files inside the submodule don't appear there.

In [fullscreen rendering](https://code.claude.com/docs/en/fullscreen), `/diff` opens the [diff panel](#diff-panel) beside the conversation, which stays open and updates while you keep working. In the classic renderer, `/diff` opens the [diff viewer](#diff-viewer) in place of the prompt, and you close it when you're done reading.

### Diff panel

The diff panel lists the changed files with their added and removed line counts, and shows each file's diff under the list. Claude Code refreshes it each time Claude edits a file or runs a shell command. To close it, run `/diff` again or click the `✕` in its header.

To use the panel you need:

* [Fullscreen rendering](https://code.claude.com/docs/en/fullscreen)
* A git repository
* A terminal at least 110 columns wide
* Claude Code v2.1.260 or later

When the panel can't open, `/diff` opens the diff viewer instead or tells you why.

The panel also opens on its own once Claude starts editing files, if your terminal is at least 144 columns wide. After you've opened it yourself with `/diff`, later sessions open it as soon as Claude edits a file in any terminal wide enough to fit it. Close the panel and it stays closed, in this session and later ones, until you run `/diff` again.

While the panel is open, you can:

* **Jump to a file**: click its row in the list. Scroll the panel with the mouse wheel. When the file list itself is too long to fit, scroll it with `Alt+Up` and `Alt+Down`, or `Ctrl+Up` and `Ctrl+Down`.
* **Ask Claude about specific lines**: select them in the panel with the mouse. Claude Code attaches the selection to your next prompt and shows a line count next to the input until you send it.
* **Show the files the panel leaves out**: the list skips test files and generated files, and collapses changes from before this session into one line at the bottom. Click either count line to expand it.
* **Change what the panel compares against**: press `Ctrl+X B` to cycle from this session's changes, to your uncommitted changes as one list, to everything since your branch split from the default branch. Claude Code remembers the choice for each project.

To bind keys to these actions, see [Diff panel actions](https://code.claude.com/docs/en/keybindings#diff-panel-actions).

### Diff viewer

The diff viewer takes the place of the prompt until you close it. Its **Current** view shows your uncommitted changes from git, or, when there are none, what your branch adds on top of the default branch. The viewer also has a turn view for each prompt after which Claude edited files, showing just those edits. Claude Code builds the turn views from Claude's file edits rather than from git, so a change Claude makes through a shell command appears only under Current.

Use these keys in the viewer:

* **Left and Right**: move between Current and the turn views.
* **Up and Down**: select a file.
* **Enter**: open the selected file's diff. Scroll it with Up and Down, or PageUp and PageDown.
* **Esc**: return from a file's diff to the list, or close the viewer from the list.

To rebind these keys, see [Diff actions](https://code.claude.com/docs/en/keybindings#diff-actions).
