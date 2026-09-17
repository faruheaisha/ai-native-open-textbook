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
pageSha256: "b2f6117da1e234c4e68fe8a6ad76874c6068baaabd15a945dc468f7220791965"
contentMode: "local-full"
zh: ""
---

## Fix common issues

### Extension won't install

* Ensure you have a compatible version of VS Code (1.94.0 or later)
* Check that VS Code has permission to install extensions
* Try installing directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)

### Spark icon not visible

The Spark icon appears in the **Editor Toolbar** (top-right of editor) when you have a file open. If you don't see it:

1. **Open a file**: The icon requires a file to be open. Having just a folder open isn't enough.
2. **Check VS Code version**: Requires 1.94.0 or higher (Help → About)
3. **Restart VS Code**: Run "Developer: Reload Window" from the Command Palette
4. **Disable conflicting extensions**: Temporarily disable other AI extensions (Cline, Continue, etc.)
5. **Check workspace trust**: The extension doesn't work in Restricted Mode

Alternatively, if you've set [`preferredLocation`](#extension-settings) to `sidebar`, or opened Claude with **Claude Code: Open in Side Bar**, click "✱ Claude Code" in the **Status Bar** (bottom-right corner). This works even without a file open. You can also use the **Command Palette** (`Cmd+Shift+P` / `Ctrl+Shift+P`) and type "Claude Code".

### Cmd+Esc does nothing on macOS

On macOS Tahoe and later, the system Game Overlay shortcut is bound to `Cmd+Esc` by default and intercepts the keypress before it reaches VS Code. To free the shortcut:

1. Open System Settings
2. Go to Keyboard, then Keyboard Shortcuts, then Game Controllers
3. Clear the Game Overlay checkbox

Alternatively, rebind the extension to a different key: open the VS Code [Keyboard Shortcuts editor](https://code.visualstudio.com/docs/configure/keybindings) (`Cmd+K Cmd+S`), search for `Claude Code: Focus input`, and assign a new binding.

### Claude Code never responds

If Claude Code isn't responding to your prompts:

1. **Check your internet connection**: Ensure you have a stable internet connection
2. **Start a new conversation**: Try starting a fresh conversation to see if the issue persists
3. **Try the CLI**: Run `claude` from the terminal to see if you get more detailed error messages

If problems persist, [file an issue on GitHub](https://github.com/anthropics/claude-code/issues) with details about the error.
