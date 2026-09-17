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
sourceRel: "en/desktop.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/desktop.md"
sourceSha256: "3c585962a30144144f6f07cddbab26d1e8ab8f6272e881441abe0a1401514a09"
pageSha256: "76c2ae6fe0681f7c2b345b8569026c10d22abf4a792b01e472ac3c996a5ae028"
contentMode: "local-full"
zh: ""
---

## Manage sessions

Each session is an independent conversation with its own context and changes. You can run multiple sessions in parallel, branch off side chats, let Claude check on and message your other sessions, send work to the cloud, or let Dispatch start sessions for you from your phone.

### Work in parallel with sessions

Click **+ New session** in the sidebar, or press **Cmd+N** on macOS or **Ctrl+N** on Windows, to work on multiple tasks in parallel. Press **Ctrl+Tab** and **Ctrl+Shift+Tab** to cycle through sessions in the sidebar. For Git repositories, each session gets its own isolated copy of your project using [Git worktrees](https://code.claude.com/docs/en/worktrees), so changes in one session don't affect other sessions until you commit them.

To view two sessions at once, hold **Cmd** on macOS or **Ctrl** on Windows and click a session in the sidebar. The session opens in a second pane alongside the one you already have open. While the split is active, clicking another sidebar session replaces whichever pane has focus. Press **Cmd+\\** on macOS or **Ctrl+\\** on Windows to close the focused pane and return to a single session.
