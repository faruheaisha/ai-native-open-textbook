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
pageSha256: "0dc2b6763d37f63930ffaca714ead95fdb3f614a557231ff7f7dd5a54d5d1c0d"
contentMode: "local-full"
zh: ""
---

## Arrange your workspace

The Code tab is built around panes you can arrange in any layout: chat, diff, browser, terminal, file, plan, tasks, and subagent, along with the [iOS Simulator](https://code.claude.com/docs/en/desktop-ios-simulator) on macOS. Drag a pane by its header to reposition it, or drag a pane edge to resize it. Press **Cmd+\\** on macOS or **Ctrl+\\** on Windows to close the focused pane. Open additional panes from the **Views** menu in the session toolbar.

  The pane layout, terminal, file editor, and view modes in this section require Claude Desktop v1.2581.0 or later. Open **Claude → Check for Updates** on macOS or **Help → Check for Updates** on Windows to update.

### Run commands in the terminal

The integrated terminal lets you run commands alongside your session without switching to another app. Open it from the **Views** menu or press **Ctrl+\`** on macOS or Windows. The terminal opens in your session's working directory and shares the same environment as Claude, so commands like `npm test` or `git status` see the same files Claude is editing. To open a second terminal tab, click **+** in the terminal pane header or right-click a folder in the chat to choose **Open in terminal**. The terminal is available in local sessions only.

### Open and edit files

Click a file path in the chat or diff viewer to open it in the file pane. HTML, PDF, image, and video paths open in the [Browser pane](#preview-your-app) instead. Make spot edits and click **Save** to write them back. If the file changed on disk since you opened it, the pane warns you and lets you override or discard. Click **Discard** to revert your edits, or click the path in the pane header to copy the absolute path.

The file pane is available in local and SSH sessions. For cloud sessions, ask Claude to make the change.

### Open files in other apps

Right-click any file path in the chat, diff viewer, or file pane to open a context menu:

* **Attach as context**: add the file to your next prompt
* **Open in**: open the file in an installed editor such as VS Code, Cursor, or Zed
* **Show in Finder** on macOS, **Show in Explorer** on Windows: open the containing folder
* **Copy path**: copy the absolute path to your clipboard

### Switch view modes

View modes control how much detail appears in the chat transcript. Switch modes from the **Transcript view** dropdown next to the send button, or press **Ctrl+O** on macOS or Windows to cycle through them.

| Mode        | What it shows                                                  |
| ----------- | -------------------------------------------------------------- |
| **Normal**  | Tool calls collapsed into summaries, with full text responses  |
| **Verbose** | Every tool call, file read, and intermediate step Claude takes |
| **Summary** | Only Claude's final responses and the changes it made          |

Use Verbose when debugging why Claude took a particular action. Use Summary when you're running multiple sessions and want to scan results quickly.

### Keyboard shortcuts

Press **Cmd+/** on macOS or **Ctrl+/** on Windows to see all shortcuts available in the Code tab. On Windows, use **Ctrl** in place of **Cmd** for the shortcuts below. Session cycling, the terminal toggle, and the view-mode toggle use **Ctrl** on every platform.

| Shortcut                              | Action                           |
| ------------------------------------- | -------------------------------- |
| `Cmd` `/`                             | Show keyboard shortcuts          |
| `Cmd` `N`                             | New session                      |
| `Cmd` `W`                             | Close session                    |
| `Ctrl` `Tab` / `Ctrl` `Shift` `Tab`   | Next or previous session         |
| `Cmd` `Shift` `]` / `Cmd` `Shift` `[` | Next or previous session         |
| `Esc`                                 | Stop Claude's response           |
| `Cmd` `Shift` `D`                     | Toggle diff pane                 |
| `Cmd` `Shift` `B`                     | Toggle Browser pane              |
| `Cmd` `Shift` `S`                     | Select an element in the Browser |
| `Ctrl` `` ` ``                        | Toggle terminal pane             |
| `Cmd` `\`                             | Close focused pane               |
| `Cmd` `;`                             | Open side chat                   |
| `Ctrl` `O`                            | Cycle view modes                 |
| `Cmd` `Shift` `M`                     | Open permission mode menu        |
| `Cmd` `Shift` `I`                     | Open model menu                  |
| `Cmd` `Shift` `E`                     | Open effort menu                 |
| `1`–`9`                               | Select item in an open menu      |

These shortcuts apply only to the Code tab. The terminal-based [interactive mode shortcuts](https://code.claude.com/docs/en/interactive-mode#keyboard-shortcuts), such as `Shift+Tab` to cycle permission modes, do not apply in Desktop.

### Check usage

Click the usage ring next to the model picker to see your current context window usage and your plan usage for the period. Context usage is per session; plan usage is shared across all your Claude Code surfaces.
