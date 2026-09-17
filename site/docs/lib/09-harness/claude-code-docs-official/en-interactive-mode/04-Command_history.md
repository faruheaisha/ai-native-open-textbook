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
pageSha256: "48f7478ea3821b46536f827a8120ed03356adf3390cddbd95b44eaba4d3be7bf"
contentMode: "local-full"
zh: ""
---

## Command history

Claude Code keeps a history of the prompts you type, and Up-arrow recall reaches prompts from past sessions of the same project:

* Input history is stored per working directory
* Running `/clear` starts a new session: recall then lists the new session's prompts first, with earlier sessions' prompts after them. The previous session's conversation is preserved and can be resumed.
* Submitting the same prompt twice in a row records one history entry, so pressing Up steps to the previous distinct prompt
* When you recall a prompt that included pasted text, Claude Code sends the full pasted content again when you resubmit. If the content has since been [cleaned up](https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically), Claude Code doesn't send the literal `[Pasted text #N]` string; see [Paste large content](https://code.claude.com/docs/en/terminal-config#paste-large-content) for what happens to the prompt
* History expansion with `!` is disabled by default

### Reverse search with Ctrl+R

Press `Ctrl+R` to interactively search through your command history. In [fullscreen rendering](https://code.claude.com/docs/en/fullscreen), `Ctrl+R` opens a search dialog instead: type to filter, press `Up` and `Down` to move through matches, and press `Ctrl+S` to cycle the scope through this session, this project, and all projects. Press `Enter` or `Tab` to place a match in the prompt input, or `Esc` to cancel. The steps below describe the classic renderer's inline search:

1. **Start search**: press `Ctrl+R` to activate reverse history search
2. **Type query**: enter text to search for in previous commands. The search term is highlighted in matching results
3. **Navigate matches**: press `Ctrl+R` again to cycle through older matches
4. **Search scope**: the inline search always searches prompts from all projects
5. **Accept match**:
   * Press `Tab` or `Esc` to accept the current match and continue editing
   * Press `Enter` to accept and execute the command immediately
6. **Cancel search**:
   * Press `Ctrl+C` to cancel and restore your original input
   * Press `Backspace` on empty search to cancel

The inline search scans your full prompt history, newest first, with duplicates collapsed to the newest occurrence. The fullscreen dialog searches your whole prompt history in the selected scope, newest first, with duplicates collapsed to the newest occurrence: the most recent prompts appear immediately, and matches from older prompts fill in as Claude Code loads the rest. Matching prompts display with the search term highlighted, so you can find and reuse previous inputs.

Accepting a match or canceling the search takes effect immediately, even while Claude Code is still loading the history.
