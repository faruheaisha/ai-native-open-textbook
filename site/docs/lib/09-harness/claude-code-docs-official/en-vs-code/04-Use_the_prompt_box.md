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
pageSha256: "3f5d765ddd1196dce1b400a87ddd37be7eaedd6c502b4be617a919bd08d14301"
contentMode: "local-full"
zh: ""
---

## Use the prompt box

The prompt box supports several features:

* **Permission modes**: click the mode indicator at the bottom of the prompt box to switch permission modes. On Pro, Max, and Team plans, Auto is the built-in starting permission mode. See [how the extension chooses the starting permission mode](https://code.claude.com/docs/en/permission-modes#switch-permission-modes) for what changes that, and every permission mode the indicator offers.
  * **Auto**: a classifier reviews most actions instead of asking you. See [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) for what it reviews and blocks.
  * **Manual**: Claude asks permission before file edits and most shell commands.
  * **Plan**: Claude describes what it will do and waits for approval before making changes. VS Code automatically opens the plan as a full Markdown document where you can add inline comments to give feedback before Claude begins.
  * **Edit automatically**: Claude makes edits without asking.
* **Model**: select **Switch model…** from the command menu to change the model mid-session. You can also click the model name at the bottom of the prompt box to open the same picker. When the current model supports [effort levels](https://code.claude.com/docs/en/model-config#adjust-effort-level), the picker also shows an **Effort** row and the model name button shows the selected level. The model name button and the **Effort** row require Claude Code v2.1.257 or later.
* **Command menu**: click `/` or type `/` to open the command menu. Options include attaching files, switching models, and toggling extended thinking. The Customize section provides access to MCP servers, slash commands, output styles, hooks, memory, permissions, and plugins. Items with a terminal icon open in the integrated terminal.
  * To browse commands such as `/usage` or [`/remote-control`](https://code.claude.com/docs/en/remote-control), select **Slash commands** in the Customize section. A dialog lists them with a filter box. Pick one to run it. Typing `/` in the prompt box still suggests commands inline. Requires Claude Code v2.1.257 or later.
  * Select **Output styles** in the Customize section to pick an [output style](https://code.claude.com/docs/en/output-styles), including your custom styles. Requires Claude Code v2.1.257 or later.

    To create a custom style instead, select **Build a custom style** from the **Output styles** menu. Claude Code writes the [style file](https://code.claude.com/docs/en/output-styles#create-a-custom-output-style) for you at the project or user level. Requires Claude Code v2.1.261 or later.
  * The Settings section includes **Enable Remote Control for all sessions**, which sets [`remoteControlAtStartup`](https://code.claude.com/docs/en/settings-reference#remotecontrolatstartup) to control whether [new interactive sessions connect to Remote Control automatically](https://code.claude.com/docs/en/remote-control#enable-remote-control-for-all-sessions). Requires Claude Code v2.1.203 or later.

    When you turn the toggle on or off in a VS Code window, the change applies to the sessions already open in that VS Code window, not only to sessions you start afterwards. If you turn it off, the open sessions disconnect. With Claude Code v2.1.261 or later, the change also reaches sessions open in your other VS Code windows.
  * The Settings section also includes **Focus view**, which hides tool calls, tool results, and thinking behind expandable rows, leaving your prompts and Claude's responses. Claude's latest to-do list stays visible, and so does the text a pending question from Claude is asking about; this requires Claude Code v2.1.225 or later. Toggle it there, with `Ctrl+Option+F` (Mac) / `Ctrl+Alt+F` (Windows/Linux), or from the Command Palette with **Claude Code: Toggle Focus view**. The change applies to every open session and persists across sessions. Requires Claude Code v2.1.221 or later.
  * To report a bug, click **Report a problem** at the bottom of the menu, or type `/bug` or `/feedback` with an optional description that prefills the report. When you submit the report and you're signed in to Anthropic on a first-party connection, Claude Code sends it to Anthropic. On a third-party provider, or without Anthropic credentials, the dialog still opens, but submitting shows an error and sends nothing: unlike the CLI's `/bug`, the extension doesn't write a local archive. Requires Claude Code v2.1.229 or later.
* **Side questions**: type `/btw` followed by a question to ask about your session [without adding to the conversation](https://code.claude.com/docs/en/interactive-mode#side-questions-with-/btw). The answer opens in a panel beside the chat, where you can ask follow-up questions. The thread survives window reloads. Claude Code keeps the newest 20 exchanges and expires stored threads on the [`cleanupPeriodDays`](https://code.claude.com/docs/en/settings-reference#cleanupperioddays) schedule, as long as Claude Code can [safely determine the retention period](https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically). To clear a thread, click the trash icon in the panel. Requires Claude Code v2.1.227 or later.
* **Context indicator**: the prompt box shows how much of Claude's context window you're using. Claude automatically compacts when needed, or you can run `/compact` manually.
* **Extended thinking**: lets Claude spend more time reasoning through complex problems. Toggle it on via the command menu (`/`). Claude's reasoning appears in the conversation as collapsed blocks: click a block to read it, or press `Ctrl+O` to expand or collapse every thinking block in the session. See [Extended thinking](https://code.claude.com/docs/en/model-config#extended-thinking) for details.
* **Multi-line input**: press `Shift+Enter` to add a new line without sending. This also works in the "Other" free-text input of question dialogs.

### Reference files and folders

Use @-mentions to give Claude context about specific files or folders. When you type `@` followed by a file or folder name, Claude reads that content and can answer questions about it or make changes to it. Claude Code supports fuzzy matching, so you can type partial names to find what you need:

```text wrap theme={null}
Explain the logic in @auth (fuzzy matches auth.js, AuthService.ts, etc.)
What's in @src/components/ (include a trailing slash for folders)
```

For large PDFs, you can ask Claude to read specific pages instead of the whole file: a single page, a range like pages 1-10, or an open-ended range like page 3 onward.

When you select text in the editor, Claude can see your highlighted code automatically. The prompt box footer shows how many lines are selected. Press `Option+K` (Mac) / `Alt+K` (Windows/Linux) to insert an @-mention with the file path and line numbers (e.g., `@app.ts#5-10`). Click the selection indicator to toggle whether Claude can see your highlighted text - the eye-slash icon means the selection is hidden from Claude.

To attach an image, paste it from your clipboard into the prompt box. You can also hold `Shift` while dragging files into the prompt box to add them as attachments. Click the X on any attachment to remove it from context.

### Resume past conversations

Click the **Session history** button at the top of the Claude Code panel to access your conversation history. You can search by keyword or browse by time.

Click any conversation to resume it with the full message history. If the conversation is already open in another tab of the current window, clicking it switches to that tab. For more on resuming sessions, see [Manage sessions](https://code.claude.com/docs/en/sessions).

* **Session titles**: new sessions receive AI-generated titles based on your first message.
* **Rename and archive**: hover over a session to reveal these actions. Rename to give it a descriptive title, or archive to move it to the **Archived sessions** group at the bottom of the list.

By default, a session with no activity for 14 days moves to **Archived sessions** automatically, unless it is open, unread, or in a [group](#organize-sessions-into-groups). Automatic archiving requires Claude Code v2.1.265 or later. To change the period or turn it off, open the [Archive Inactive Sessions setting](https://code.claude.com/docs) and select a number of days or **Never**.

To restore an archived session, expand **Archived sessions** and click **Unarchive session**. Before v2.1.257, the action was **Delete session**, which hid a session with no way to restore it. Sessions you deleted then appear under **Archived sessions** after you upgrade.

When the conversation you resume ended in plan mode, Claude Code restores plan mode. Requires Claude Code v2.1.246 or later. Claude Code doesn't restore it in two cases:

* The extension [chooses the starting permission mode](https://code.claude.com/docs/en/permission-modes#switch-permission-modes) from `claudeCode.initialPermissionMode` or a pick that carries over from an earlier conversation
* You have `claudeCode.claudeProcessWrapper` configured

### Resume cloud sessions from Claude.ai

If you use [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), you can resume those cloud sessions directly in VS Code. This requires signing in with **Claude.ai Subscription**, not Anthropic Console.

    Click the **Session history** button at the top of the Claude Code panel.

    The dialog shows two tabs: Local and Web. Click **Web** to see sessions from claude.ai.

    Browse or search your cloud sessions. Click any session to download it and continue the conversation locally.

  Only web sessions started with a GitHub repository appear in the Web tab. Resuming loads the conversation history locally; changes are not synced back to claude.ai.

### Check account and usage

Run `/usage` to open the Account & usage dialog. The dialog requires a claude.ai sign-in, so it isn't offered on a [third-party provider](#use-third-party-providers). It shows your signed-in account, your plan, and usage bars for your plan's limits, such as the current session and the week. Each bar shows how long until its limit resets.

The dialog also breaks down what is contributing to your plan limits. It flags behaviors that account for 10% or more of recent usage, such as cache misses, long context, and subagent-heavy or highly parallel sessions, each with a tip to reduce it. Attribution tables show how much usage came from each skill, subagent, plugin, and MCP server. Requires Claude Code v2.1.174 or later.

Use the Day and Week toggle to switch between the last 24 hours and the last 7 days. The figures are approximate and computed from local sessions on this machine, so usage from other devices or claude.ai is not included. For more on tracking and reducing usage, see [Track your costs](https://code.claude.com/docs/en/costs#track-your-costs).
