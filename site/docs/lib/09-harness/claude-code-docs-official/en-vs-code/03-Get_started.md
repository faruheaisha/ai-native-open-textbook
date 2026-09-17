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
pageSha256: "28c81f96d988c04e5c4010a45b9e82c5e62847c545557171b755ef94dbe5f6c5"
contentMode: "local-full"
zh: ""
---

## Get started

Once installed, you can start using Claude Code through the VS Code interface:

    Throughout VS Code, the Spark icon indicates Claude Code: &lt;img src="https://mintcdn.com/claude-code/c5r9_6tjPMzFdDDT/images/vs-code-spark-icon.svg?fit=max&auto=format&n=c5r9_6tjPMzFdDDT&q=85&s=3ca45e00deadec8c8f4b4f807da94505" alt="Spark icon" style=&#123;&#123;display: "inline", height: "0.85em", verticalAlign: "middle"&#125;&#125; width="16" height="16" data-path="images/vs-code-spark-icon.svg" />

    The quickest way to open Claude is to click the Spark icon in the **Editor Toolbar** (top-right corner of the editor). The icon only appears when you have a file open.

    <img src="https://mintcdn.com/claude-code/mfM-EyoZGnQv8JTc/images/vs-code-editor-icon.png?fit=max&auto=format&n=mfM-EyoZGnQv8JTc&q=85&s=eb4540325d94664c51776dbbfec4cf02" alt="VS Code editor showing the Spark icon in the Editor Toolbar" width="2796" height="734" data-path="images/vs-code-editor-icon.png" />

    Other ways to open Claude Code:

    * **Activity Bar**: click the Spark icon in the left sidebar to open the sessions list. Click any session to open it in your [preferred location](#extension-settings), or start a new one. This icon is always visible in the Activity Bar.
    * **Command Palette**: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux), type "Claude Code", and select an option like "Open in New Tab"
    * **Status Bar**: if you've set [`preferredLocation`](#extension-settings) to `sidebar`, or opened Claude with **Claude Code: Open in Side Bar**, click **✱ Claude Code** in the bottom-right corner of the window. This works even when no file is open.

    You can drag the Claude panel to reposition it anywhere in VS Code. See [Customize your workflow](#customize-your-workflow) for details.

    The first time you open the panel, a sign-in screen appears. Click **Sign in** and complete authorization in your browser.

    If you see **Not logged in · Please run /login** later, the extension reopens the sign-in screen automatically. If it doesn't appear, reload the window from the Command Palette with **Developer: Reload Window**.

    If you have `ANTHROPIC_API_KEY` set in your shell but still see the sign-in prompt, VS Code may not have inherited your shell environment. Launch VS Code from a terminal with `code .` so it inherits your environment variables, or sign in with your Claude account instead.

    After you sign in, a **Learn Claude Code** checklist appears. Work through each item by clicking **Show me**, or dismiss it with the X. To reopen it later, uncheck **Hide Onboarding** in VS Code settings under Extensions → Claude Code.

    Ask Claude to help with your code or files, whether that's explaining how something works, debugging an issue, or making changes.

    &lt;Tip>Claude automatically sees your selected text. Press `Option+K` (Mac) / `Alt+K` (Windows/Linux) to also insert an @-mention reference (like `@file.ts#5-10`) into your prompt.&lt;/Tip>

    Here's an example of asking about a particular line in a file:

    <img src="https://mintcdn.com/claude-code/FVYz38sRY-VuoGHA/images/vs-code-send-prompt.png?fit=max&auto=format&n=FVYz38sRY-VuoGHA&q=85&s=ede3ed8d8d5f940e01c5de636d009cfd" alt="VS Code editor with lines 2-3 selected in a Python file, and the Claude Code panel showing a question about those lines with an @-mention reference" width="3288" height="1876" data-path="images/vs-code-send-prompt.png" />

    What you see depends on the [permission mode](https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in) shown at the bottom of the prompt box:

    * In Auto or Edit automatically mode, Claude edits most files in your workspace without asking.
    * In Manual mode, when Claude wants to edit a file, it shows a side-by-side comparison of the original and proposed changes, then asks for permission. You can accept, reject, or tell Claude what to do instead. If you edit the proposed content directly in the diff view before accepting, Claude is told that you modified it so it doesn't assume the file matches its original proposal.

          <img src="https://mintcdn.com/claude-code/FVYz38sRY-VuoGHA/images/vs-code-edits.png?fit=max&auto=format&n=FVYz38sRY-VuoGHA&q=85&s=e005f9b41c541c5c7c59c082f7c4841c" alt="VS Code showing a diff of Claude's proposed changes with a permission prompt asking whether to make the edit" width="3292" height="1876" data-path="images/vs-code-edits.png" />

For more ideas on what you can do with Claude Code, see [Common workflows](https://code.claude.com/docs/en/common-workflows).

  Run "Claude Code: Open Walkthrough" from the Command Palette for a guided tour of the basics.
