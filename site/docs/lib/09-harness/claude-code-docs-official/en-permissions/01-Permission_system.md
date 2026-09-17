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
sourceRel: "en/permissions.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permissions.md"
sourceSha256: "6cc02236c28e33b38f1977f95d5c1b3c8805c0ad97cb377866cd1de1c5cb8cbc"
pageSha256: "56b4b64682c75de802636b3e336aa26e7c32aa362ca4af4a506aa03ef74d353a"
contentMode: "local-full"
zh: ""
---

## Permission system

Claude Code uses a tiered permission system to balance power and safety. The table shows, for each tool type, whether Manual mode asks before the action runs. The other [permission modes](#permission-modes) change which of these ask you; in auto mode a classifier reviews actions instead of you, and [how the classifier evaluates actions](https://code.claude.com/docs/en/permission-modes#how-the-classifier-evaluates-actions) lists which ones it sees.

| Tool type         | Example          | Approval required                                                                                             | "Yes, and don't ask again" behavior    |
| :---------------- | :--------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------- |
| Read-only         | File reads, Grep | No, within the [working directory and additional directories](#working-directories)                           | N/A                                    |
| Bash commands     | Shell execution  | Yes, except a built-in set of [read-only commands](#read-only-commands)                                       | Permanently per repository and command |
| File modification | Edit/write files | Yes                                                                                                           | Until session end                      |
| Web fetch         | WebFetch         | Yes, except a built-in set of [preapproved documentation domains](https://code.claude.com/docs/en/tools-reference#webfetch-tool-behavior) | Permanently per repository and domain  |
| Web search        | WebSearch        | Yes                                                                                                           | Permanently per repository             |

When you choose "Yes, and don't ask again" and the approval saves permanently, such as for a Bash command or a WebFetch domain, Claude Code saves the rule to `.claude/settings.local.json` at the root of the git repository, resolved through [worktrees](https://code.claude.com/docs/en/worktrees) to the main checkout. The rule applies to future sessions anywhere in that repository, including sessions started in subdirectories and in worktrees. A file-modification approval isn't saved to the file: as the table shows, it lasts until the session ends. In some cases, such as outside a git repository or on Windows, Claude Code doesn't use the repository root; [Where Claude Code looks for each file](https://code.claude.com/docs/en/settings#where-claude-code-looks-for-each-file) lists those cases and where it saves the rule instead.

Before v2.1.211, Claude Code always saved the rule in the starting directory, so an approval granted in a worktree or subdirectory didn't apply to the rest of the repository. Rules that earlier versions saved in a subdirectory or worktree still apply to sessions started there.

Sometimes a permission prompt offers only a one-time approval, with no "don't ask again" option and no option to allow the action for the rest of the session. Claude Code offers those options only when the prompt can show you everything they would allow, so a rule you save from a prompt covers only what its option named.

When the directory you started Claude Code in is what makes the option's label too long, Claude Code shortens it in the label, replacing your home directory with `~` and then the end of the path with `…`, and keeps the option. You still save the same rule. Claude Code leaves the options out in three cases:

* **Command or edit:** too large to show in full.
* **Commands or paths the rule would cover:** the label can't fit them all.
* **Starting directory too long, not shortened:** it contains characters Claude Code can't display safely, or even its start doesn't fit.

Approve the action once, or add the rule yourself in [`/permissions`](#manage-permissions).

### Add a comment when you answer a permission prompt

You can attach a note to Claude when you approve or deny a single action. On most permission prompts, including Bash, PowerShell, file, and MCP tool prompts, move to **Yes** or **No** and press `Tab` to open a comment field on that option. WebFetch and browser prompts don't offer the field. The options that allow the action for the rest of the session or save a rule don't take one either.

With the field open, type the comment and then press one of these keys:

* `Enter`: submits your answer with the comment attached. If you leave the field empty, Claude Code submits the answer without a comment.
* `Tab`: closes the field without answering. Claude Code keeps the text you typed and still sends it if you answer with that option.
* `Shift+Tab`: on a file prompt, such as an Edit or Write prompt, closes the field the same as `Tab`. Before v2.1.235, pressing `Shift+Tab` inside the field instead selected the option that allows the action for the rest of the session, so Claude Code approved the action for the rest of the session and discarded the comment.

Claude Code delivers the comment differently depending on how you answered:

* **Yes**: Claude Code runs the action, then sends your comment to Claude after the result.
* **No**: Claude Code sends your comment to Claude as the reason for the denial, and Claude continues working. If you select **No** without a comment on a prompt from the main conversation, Claude Code stops the turn.
