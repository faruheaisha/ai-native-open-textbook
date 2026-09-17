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
sourceRel: "en/vs-code.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/vs-code.md"
sourceSha256: "6c14f8a02079b0d1ee1142ff770bcda731b181565c57a600c9377c899fbc9801"
pageSha256: "c05e33512787576c83bdfef0186dcdfb922d3ac28379368090384120ec2f5237"
contentMode: "local-full"
zh: ""
---

## VS Code commands and shortcuts

Open the Command Palette (`Cmd+Shift+P` on Mac or `Ctrl+Shift+P` on Windows/Linux) and type "Claude Code" to see all available VS Code commands for the Claude Code extension.

Some shortcuts depend on which panel is "focused" (receiving keyboard input). When your cursor is in a code file, the editor is focused. When your cursor is in Claude's prompt box, Claude is focused. Use `Cmd+Esc` / `Ctrl+Esc` to toggle between them.

  These are VS Code commands for controlling the extension. Not all built-in Claude Code commands are available in the extension. See [VS Code extension vs. Claude Code CLI](#vs-code-extension-vs-claude-code-cli) for details.

| Command                    | Shortcut                                                 | Description                                                                                                                                                                                                      |
| -------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Focus Input                | `Cmd+Esc` (Mac) / `Ctrl+Esc` (Windows/Linux)             | Toggle focus between editor and Claude                                                                                                                                                                           |
| Open in Side Bar           | -                                                        | Open Claude in the sidebar                                                                                                                                                                                       |
| Open in Terminal           | -                                                        | Open Claude in terminal mode                                                                                                                                                                                     |
| Open in New Tab            | `Cmd+Shift+Esc` (Mac) / `Ctrl+Shift+Esc` (Windows/Linux) | Open a new conversation as an editor tab                                                                                                                                                                         |
| Open in New Window         | -                                                        | Open a new conversation in a separate window                                                                                                                                                                     |
| New Conversation           | `Cmd+N` (Mac) / `Ctrl+N` (Windows/Linux)                 | Start a new conversation. Requires Claude to be focused and `enableNewConversationShortcut` set to `true`                                                                                                        |
| Reopen Closed Session      | `Cmd+Shift+T` (Mac) / `Ctrl+Shift+T` (Windows/Linux)     | Reopen the most recently closed Claude session tab. Falls through to VS Code's normal reopen-closed-editor when the last closed tab wasn't a Claude session. Disable with `enableReopenClosedSessionShortcut`    |
| Insert @-Mention Reference | `Option+K` (Mac) / `Alt+K` (Windows/Linux)               | Insert a reference to the current file and selection (requires editor to be focused)                                                                                                                             |
| Toggle Focus view          | `Ctrl+Option+F` (Mac) / `Ctrl+Alt+F` (Windows/Linux)     | Hide or show tool activity in the conversation. Works while a Claude panel or sidebar is visible. Requires Claude Code v2.1.221 or later                                                                         |
| Rename Session Tab         | -                                                        | Rename the session in the active Claude tab. The command also appears in the tab's right-click menu. Requires Claude Code v2.1.257 or later                                                                      |
| Add Session Tab to Group   | -                                                        | Add the session in the active Claude tab to a [session group](#organize-sessions-into-groups) you pick or create. The command also appears in the tab's right-click menu. Requires Claude Code v2.1.257 or later |
| Mark Session as Unread     | -                                                        | Mark the session in the active Claude tab as unread in the sessions list. The command also appears in the tab's right-click menu. Requires Claude Code v2.1.257 or later                                         |
| Show Logs                  | -                                                        | View extension debug logs                                                                                                                                                                                        |
| Logout                     | -                                                        | Sign out of your Anthropic account                                                                                                                                                                               |

### Launch a VS Code tab from other tools

The extension registers a URI handler at `vscode://anthropic.claude-code/open`. Use it to open a new Claude Code tab from your own tooling: a shell alias, a browser bookmarklet, or any script that can open a URL. If VS Code isn't already running, opening the URL launches it first. If VS Code is already running, the URL opens in whichever window is currently focused.

Invoke the handler with your operating system's URL opener.

    ```bash theme=\{null\}
    open "vscode://anthropic.claude-code/open"
    ```

    ```bash theme=\{null\}
    xdg-open "vscode://anthropic.claude-code/open"
    ```

    The `xdg-open` command comes from the `xdg-utils` package. If the shell reports it isn't found, see [xdg-open is not found on Linux](https://code.claude.com/docs/en/deep-links#xdg-open-is-not-found-on-linux).

    In PowerShell:

    ```powershell theme=\{null\}
    Start-Process "vscode://anthropic.claude-code/open"
    ```

    In `cmd.exe`, `start` treats its first quoted argument as a window title, so pass an empty title before the URL:

    ```cmd theme=\{null\}
    start "" "vscode://anthropic.claude-code/open"
    ```

The handler accepts two optional query parameters:

| Parameter | Description                                                                                                                                                                                                                                                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `prompt`  | Text to pre-fill in the prompt box. Must be URL-encoded. The prompt is pre-filled but not submitted automatically.                                                                                                                                                                                                                                                             |
| `session` | A session ID to resume instead of starting a new conversation. The session must belong to the workspace currently open in VS Code. If the session isn't found, a fresh conversation starts instead. If the session is already open in a tab, that tab is focused. To capture a session ID programmatically, see [Continue conversations](https://code.claude.com/docs/en/headless#continue-conversations). |

For example, to open a tab pre-filled with "review my changes":

```text theme={null}
vscode://anthropic.claude-code/open?prompt=review%20my%20changes
```

To launch a terminal session instead of a VS Code tab, use the CLI's `claude-cli://` handler. See [Launch sessions from links](https://code.claude.com/docs/en/deep-links).
