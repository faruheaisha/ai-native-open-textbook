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
pageSha256: "a5ce278dfd3b824852769948e3eb447027678fb3ac70e60da7cc48b072e107f3"
contentMode: "local-full"
zh: ""
---

## Side questions with /btw

Use `/btw` to ask a question about your current work without adding to the conversation history.

```
/btw what was the name of that config file again?
```

Claude answers a side question from what's already in the conversation: your messages, its replies, and the tool results it has gathered. You can ask about code Claude has already read, decisions it made earlier, or anything else from the session. A later side question also sees your earlier side questions: Claude Code replays the newest 20 exchanges with each ask, until you clear them. The question and answer never enter the conversation history. In the terminal, they appear in a dismissible overlay. The terminal keeps the thread in memory: press `x` to clear the earlier exchanges, and it's gone when you exit Claude Code.

In the [VS Code extension](https://code.claude.com/docs/en/vs-code#use-the-prompt-box)'s chat panel, `/btw` opens a panel rather than the overlay this section describes, and you ask follow-up questions right in the panel. The panel's thread survives window reloads, on the retention schedule that page describes. You need the extension at v2.1.227 or later. Earlier extension versions don't offer `/btw`.

* **Available while Claude is working**: you can run `/btw` even while Claude is processing a response. The side question runs independently and doesn't interrupt the main turn. It sees everything in the conversation so far, except the reply Claude is still writing.
* **No tool access**: side questions answer only from what is already in context. Claude can't read files, run commands, or search when answering a side question.
* **Single response**: there are no follow-up turns in the overlay. To continue the thread, ask another `/btw` question. To continue with full tool access in a local session, press `f` to fork this question and answer into a [background subagent](https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation).
* **Low cost**: while the conversation's [prompt cache](https://code.claude.com/docs/en/prompt-caching) is warm, a side question costs little beyond the answer itself.

Your five newest earlier side questions appear as a dimmed list above the current answer, with a count of any older ones. They stay out of the conversation history.

To return to the overlay after dismissing it, run `/btw` with no question. The overlay reopens on your most recent exchange. Before v2.1.212, `/btw` without a question printed a usage message instead.

Once the answer appears, the overlay accepts these keys.

| Key                          | Action                                                                                                                                                                                                                                                                                                                                                                                            |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Space`, `Enter`, `Escape`   | Dismiss the answer and return to the prompt                                                                                                                                                                                                                                                                                                                                                       |
| `Up` / `Down`                | Scroll the answer                                                                                                                                                                                                                                                                                                                                                                                 |
| `Shift+Left` / `Shift+Right` | Step between this answer and your earlier `/btw` answers. `Shift+Left` moves to older answers and `Shift+Right` returns toward the current one. `[` and `]` do the same, for terminals that don't report `Shift` with arrow keys. `Tab` / `Shift+Tab` cycle through the same answers. Requires Claude Code v2.1.257 or later. Between v2.1.187 and v2.1.256, the keys were plain `Left` / `Right` |
| `c`                          | Copy the answer to your clipboard as raw Markdown. Use this instead of mouse selection, which captures the hard-wrapped terminal rendering rather than the source text                                                                                                                                                                                                                            |
| `f`                          | Start a [forked subagent](https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation) that inherits the parent conversation plus this question and answer, so it can continue with full tool access. You stay in the current session and find the fork in the [panel below your prompt](https://code.claude.com/docs/en/sub-agents#observe-and-steer-running-forks). Available in local sessions only                                       |
| `x`                          | Clear the list of earlier `/btw` exchanges shown above the current answer                                                                                                                                                                                                                                                                                                                         |

In an attached [background session](https://code.claude.com/docs/en/agent-view#attach-to-a-session), `Left` detaches and returns you to agent view, even while the answer is still arriving. The side question keeps running while you're away. The next time you attach to the session, the overlay reopens with the side question, or with its answer. Before v2.1.257, `Left` didn't detach there.

`/btw` sees your full conversation but has no tools. A [subagent](https://code.claude.com/docs/en/sub-agents) has tools and starts from the prompt it receives, or, for a [fork](https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation), from a copy of this conversation. Use `/btw` to ask about what Claude already knows from this session; use a subagent to go find out something new.
