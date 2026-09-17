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
pageSha256: "847781ac8add5e0e5ef248450f3519c105c9273c9d3102cf9bfb02d759707c80"
contentMode: "local-full"
zh: ""
---

## Customize your workflow

You can reposition the Claude panel, run multiple conversations, organize the sessions list into groups, or switch to terminal mode.

### Choose where Claude lives

You can drag the Claude panel to reposition it anywhere in VS Code. Grab the panel's tab or title bar and drag it to:

* **Secondary sidebar**: the right side of the window. Keeps Claude visible while you code.
* **Primary sidebar**: the left sidebar with icons for Explorer, Search, etc.
* **Editor area**: opens Claude as a tab alongside your files. Useful for side tasks.

  Use the sidebar for your main Claude session and open additional tabs for side tasks. Claude remembers your preferred location. The Activity Bar sessions list icon is separate from the Claude panel: the sessions list is always visible in the Activity Bar, while the Claude panel icon only appears there when the panel is docked to the left sidebar.

After you run **Developer: Reload Window** or restart VS Code, whether a chat comes back with its conversation depends on where it was open:

* **Editor tab**: the conversation comes back with its tab.
* **Sidebar**: the conversation comes back if you sent a message or Claude responded in it within the last 10 minutes. If it doesn't come back, resume the conversation from [Session history](#resume-past-conversations).

### Run multiple conversations

Use **Open in New Tab** or **Open in New Window** from the Command Palette to start additional conversations. Each conversation maintains its own history and context, allowing you to work on different tasks in parallel.

When using tabs, a small colored dot on the spark icon indicates status: blue means a permission request is pending, orange means Claude finished while the tab was hidden.

### Organize sessions into groups

In the sessions list in the Activity Bar, you can collect related sessions into named, collapsible groups. Requires Claude Code v2.1.229 or later.

* **Group or ungroup a session**: right-click a session to create a group from it, move it into an existing group, or remove it from its group. Each session belongs to one group at a time, so moving it into another group removes it from the first.
* **Move several sessions at once**: `Cmd`-click (Mac) / `Ctrl`-click (Windows/Linux) each session, or `Shift`-click to select a range, then right-click the selection.
* **Group a session from its tab**: run **Claude Code: Add Session Tab to Group** from the Command Palette, or right-click the session's editor tab, then pick or create a group. Requires Claude Code v2.1.257 or later.
* **Rename or delete a group**: right-click a group header. Deleting a group removes only the group, and its sessions return to the ungrouped list.

The extension saves groups per workspace folder, so they survive window reloads and appear in every window where you open the same folder. When you search the list, the extension shows matches in one flat list across all groups.

### Switch to terminal mode

By default, the extension opens a graphical chat panel. If you prefer the CLI-style interface, open the [Use Terminal setting](https://code.claude.com/docs) and check the box.

You can also open VS Code settings (`Cmd+,` on Mac or `Ctrl+,` on Windows/Linux), go to Extensions → Claude Code, and check **Use Terminal**.
