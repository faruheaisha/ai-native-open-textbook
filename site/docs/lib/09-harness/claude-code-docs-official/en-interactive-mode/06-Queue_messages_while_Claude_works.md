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
pageSha256: "f9d76ddadc905f6b402d601e3c7c27f467a2b7969ad429f9609206da1ca3c0d6"
contentMode: "local-full"
zh: ""
---

## Queue messages while Claude works

Type a message and press `Enter` while Claude is working. Claude Code queues the message instead of interrupting the turn, and lists the queued entries above the input box until it sends them. You can queue `!` [shell commands](#shell-mode-with-prefix) and most [commands](https://code.claude.com/docs/en/commands) the same way, apart from the commands, such as `/status`, that Claude Code runs as soon as you send them.

### When Claude Code sends what you queued

When a queued entry reaches Claude depends on what you queued.

* Messages: if you queue a message while Claude is running tool calls, Claude Code passes it to Claude as soon as those tool calls finish, within the same turn. When the turn ends with messages still queued, Claude Code sends only the oldest as the next turn. The rest stay queued and follow the same rule: Claude Code passes them to Claude when that turn's tool calls finish, or sends the next oldest as the turn after
* Commands and shell commands: Claude Code holds them until the turn ends, then runs them one at a time

Press `Esc` to interrupt the turn instead. Claude Code keeps what you queued and sends it right away.

Claude Code runs some commands as soon as you send them instead of queueing them, among them `/model`, `/effort`, and `/fast`. Each of the three changes a setting: the model, the effort level, or fast mode. Whether Claude Code applies the new setting to the turn Claude is already working on, or only from your next turn, differs by command:

* [`/model`](https://code.claude.com/docs/en/model-config#setting-your-model): once you confirm the [cache warning](https://code.claude.com/docs/en/prompt-caching#switching-models), if Claude Code shows one, Claude Code applies your change to the next request it makes in that turn
* [`/effort`](https://code.claude.com/docs/en/model-config#adjust-effort-level): once you confirm the [cache warning](https://code.claude.com/docs/en/prompt-caching#changing-effort-level), if Claude Code shows one, Claude Code applies your change to the next request it makes in that turn
* [`/fast`](https://code.claude.com/docs/en/fast-mode#toggle-fast-mode): Claude Code keeps the fast mode setting that was active when the turn started, so your speed change applies from your next turn. If your current model doesn't support fast mode, turning it on also [switches your model](https://code.claude.com/docs/en/prompt-caching#turning-on-fast-mode), and Claude Code uses the new model from its next request in that turn

### Take back what you queued

Press `Up` from the first line of the input box to take back the queued messages and commands. Claude Code removes them from the queue and puts them in the input box, one per line, ahead of any text you had typed. Edit the text and press `Enter` to queue it again as one entry, or clear the input box to drop it.

Claude Code takes back queued shell commands only when the input box is empty and you have nothing else queued, and it switches the input box to shell mode when it does. Otherwise it leaves them in the queue, listed with their `!` prefix, and runs them after the turn ends.
