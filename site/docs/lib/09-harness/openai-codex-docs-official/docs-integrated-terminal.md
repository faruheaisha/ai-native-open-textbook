---
title: "Integrated terminal"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/integrated-terminal.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/integrated-terminal.md"
sourceSha256: "371520cf6755828dd41d15b9c086bbc64baab00314b54d1f33d3a2605f276217"
pageSha256: "371520cf6755828dd41d15b9c086bbc64baab00314b54d1f33d3a2605f276217"
contentMode: "local-full"
zh: ""
---

# Integrated terminal

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Each chat in the ChatGPT desktop app includes a terminal scoped to its current project or
worktree. Open it from the terminal icon in the top-right corner of the app, or
press <kbd>Ctrl</kbd>+<kbd>`</kbd>.

  

> Illustration: Integrated terminal drawer open beneath a ChatGPT chat

## Run and validate your project

Use the terminal to validate changes, run scripts, and perform Git operations
without switching apps. ChatGPT can read the current terminal output, so it can
check a running development server or refer to a failed build while it works
with you.

Common commands include:

- `git status`
- `git pull --rebase`
- `pnpm test` or `npm test`
- `pnpm run lint` or another project-specific check

## Create reusable actions

If you run a command regularly, define an action in your [local environment](https://learn.chatgpt.com/docs/environments/local-environment#actions).
Actions appear as shortcuts in the ChatGPT desktop app and run in the integrated
terminal.

<kbd>Cmd</kbd>+<kbd>K</kbd> opens the app command palette; it doesn't clear the
terminal. To clear the terminal, press <kbd>Ctrl</kbd>+<kbd>L</kbd>.
